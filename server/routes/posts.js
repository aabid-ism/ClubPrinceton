import conn from '../db/conn.js';
import express from 'express';


const router = express.Router();

// endpoint to create a post from the admin page
router.post("/create", async (req, res) => {
  const db = conn.getDb();
  const club_collection = db.collection("clubs");
  const posts_collection = db.collection("posts");

  // get data from req.body
  const { netId, club, caption, image_url, title } = req.body;

  // create javascript object with the destructured data
  const post_document_to_insert = {
    netId,
    club,
    title,
    caption,
    created_at: new Date(),
    // image_url
    // comments: []
  };

  if ((Object.values(post_document_to_insert).includes("")) || (Object.values(post_document_to_insert).includes(null))) {
    console.log("null or empty property detected in form!");
    return res.status(404).send("null property detected in form!");
  }

  post_document_to_insert.comments = [];
  post_document_to_insert.image_url = image_url;
  console.log(post_document_to_insert);
  // add to the posts collection
  const result = await posts_collection.insertOne(post_document_to_insert);

  // get the club that the post is coming from
  const clubdocument = await club_collection.findOne(
    { $expr: { $eq: ["$name", club] } },
    { _id: 0, name: 1 },
  )

  const club_post_property = clubdocument.posts || "";
  // console.log(type(clubdocument));
  // console.log(club_post_property);

  // pop the last post from the posts property of the club document if it already has 5
  if (club_post_property.length >= 5) {
    club_post_property.sort((a, b) => -(a.created_at - b.created_at));
    club_post_property.pop();
  }

  club_post_property.unshift(post_document_to_insert);

  // push the post to the posts property of the club document
  club_collection.updateOne(
    { name: clubdocument.name },
    // [{ $set: { posts: { $concatArrays: ["$posts", [post_document_to_insert]] } } }]
    [{ $set: { posts: club_post_property } }]
  )

  res.send(clubdocument).status(200);
})

// Get more NEW posts for a club
router.get("/:name", async (req, res) => {
  // no posts in the subset or dynamic? this might be buggy
  if (req.query.oldestTime === '') {
    res.send([]);
    return;
  }

  const floorTime = new Date(req.query.oldestTime);
  console.log(floorTime);
  const db = conn.getDb();
  const collection = await db.collection("posts");

  const result = await collection.aggregate([
    {
      $match: {
        club: req.params.name,
        created_at: { $lt: floorTime }
      }
    },
    {
      $sort: { created_at: -1 }
    },
    {
      $limit: 5
    }
  ]).toArray();
  console.log(result);
  res.send(result).status(200);
});

// Get all clubs' posts
router.get("/", async (req, res) => {
  const db = conn.getDb();
  const collection = await db.collection("posts");
  const result = await collection.find({}).limit(50).toArray();
  console.log(result);
  res.send(result).status(200);
});
export default router;