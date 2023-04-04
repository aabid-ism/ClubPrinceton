const conn = require('../db/conn.js');
const ObjectId = require('mongodb').ObjectId;
const express = require('express');


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
    image_url,
    created_at: new Date(),
    comments: []
  };

  if ((Object.values(post_document_to_insert).includes("")) || (Object.values(post_document_to_insert).includes(null))) {
    console.log("null or empty property detected in form!");
    return res.status(404).send("null property detected in form!");
  }
  // TODO: ADD currentdatetime to the post property

  // add to the posts collection
  const result = await posts_collection.insertOne(post_document_to_insert);

  // get the club that the post is coming from
  const clubdocument = await club_collection.findOne(
    { $expr: { $eq: ["$name", club] } },
    { _id: 0, name: 1 },
  )

  club_post_property = clubdocument.posts || "empty";
  // console.log(type(clubdocument));
  console.log(club_post_property);
  // TODO: pop the last post from the posts property of the club document if it already has 5
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

// Get a single club's posts
// TODO: Don't double-load the duplicate data from the subset
router.get("/:name", async (req, res) => {
  const db = conn.getDb();
  const collection = await db.collection("posts");
  const result = await collection.find({ club: { $eq: req.params.name} }).limit(10).toArray();
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
module.exports = router;