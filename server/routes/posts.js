import conn from "../db/conn.js";
import express from "express";
import { ObjectId } from "mongodb";
import verifyToken from "../jwt.js";

const router = express.Router();

/* 
    @route POST /posts/create
    @desc create a post
    @access with verification token
    @returns 200 if post is created, 404 if post is not created
*/

router.post("/create", verifyToken, async (req, res) => {
  try {
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
    };

    if (
      Object.values(post_document_to_insert).includes("") ||
      Object.values(post_document_to_insert).includes(null)
    ) {
      console.log("null or empty property detected in form!");
      return res.status(404).send("null property detected in form!");
    }

    post_document_to_insert.comments = [];
    post_document_to_insert.image_url = image_url;

    const result = await posts_collection.insertOne(
      post_document_to_insert
    );

    // get the club that the post is coming from
    const clubdocument = await club_collection.findOne(
      { $expr: { $eq: ["$name", club] } },
      { _id: 0, name: 1 }
    );

    const club_post_property = clubdocument.posts || "";

    // pop the last post from the posts property of the club document if it already has 5
    if (club_post_property.length >= 5) {
      club_post_property.sort((a, b) => -(a.created_at - b.created_at));
      club_post_property.pop();
    }

    club_post_property.unshift(post_document_to_insert);

    // push the post to the posts property of the club document
    club_collection.updateOne({ name: clubdocument.name }, [
      { $set: { posts: club_post_property } },
    ]);

    res.send(post_document_to_insert).status(200);
  } catch (error) {
    console.log(`error is: ${error}`);
  }
});

/* 
    @route GET /posts/:name
    @desc get a club's posts, subset of 5
    @access with verification token
    @returns 200 with posts array if club exists, 404 if club
    does not exist
*/
router.get("/:name", verifyToken, async (req, res) => {
  // no posts in the subset or dynamic? this might be buggy
  if (req.query.oldestTime === "") {
    res.send([]);
    return;
  }

  const floorTime = new Date(req.query.oldestTime);
  console.log(floorTime);
  const db = conn.getDb();
  const collection = await db.collection("posts");

  const result = await collection
    .aggregate([
      {
        $match: {
          club: req.params.name,
          created_at: { $lt: floorTime },
        },
      },
      {
        $sort: { created_at: -1 },
      },
      {
        $limit: 5,
      },
    ])
    .toArray();
  console.log(result);
  res.send(result).status(200);
});

/* 
    @route GET /posts/allposts/:club
    @desc get all posts of a club
    @access with verification token
    @returns 200 with posts array if club exists, 404 if club
    does not exist
*/
router.get("/allposts/:club", verifyToken, async (req, res) => {
  // establish connection
  const db = conn.getDb();

  // get the posts collection
  const post_collection = await db.collection("posts");
  // const result = await collection.find({}).limit(50).toArray();

  const listOfPosts = await post_collection
    .aggregate([
      {
        $match: {
          club: req.params.club,
        },
      },
      {
        $sort: { created_at: -1 },
      },
    ])
    .toArray();

  console.log(req.params.club);

  res.send(listOfPosts).status(200);
});

/* 
    @route POST /delete/:clubName/:objectid
    @desc delete a post
    @access with verification token
    @returns 200 if post is deleted, 404 if post is not deleted
*/
router.post(
  "/delete/:clubName/:objectid",
  verifyToken,
  async (req, res) => {
    try {
      // establish connection
      const db = await conn.getDb();

      // get the posts and clubs collection
      const post_collection = await db.collection("posts");
      const clubs_collection = await db.collection("clubs");
      const clubName = req.params.clubName;
      // get the club document
      let club_document_copy = await clubs_collection.findOne(
        { name: clubName },
        { _id: 0 }
      );
      if (club_document_copy == null) {
        return res.send("Club Not Found.").status(404);
      }
      // get the object_id of post to delete
      let object_id = new ObjectId(req.params.objectid);

      // check whether the post is in subset
      let possible_subset_post_index;
      // getting the index of subset post if that exists
      for (let i = 0; i < club_document_copy.posts.length; i++) {
        if (club_document_copy.posts[i]._id.equals(object_id)) {
          possible_subset_post_index = i;
          break;
        }
      }

      // delete post from posts_collection
      const deletedPost = await post_collection.deleteOne({
        _id: object_id,
      });
      console.log(deletedPost);
      if (deletedPost.deletedCount == 0) {
        return res.status(404).send("Post Not Found.");
      }
      // if there is no subset, return
      if (possible_subset_post_index == undefined) {
        return res.send().status(200);
      }

      // if the post was in subset, delete that post from subset
      club_document_copy.posts.splice(possible_subset_post_index, 1);

      // create a new object which is the clubs' posts object
      let club_document_new_posts_object = [
        ...club_document_copy.posts,
      ];
      console.log(club_document_new_posts_object);

      // add the next most recent post to the club document's posts subset
      const query = { club: clubName };
      const options = {
        // sort returned documents in the order of recent post to oldest post
        sort: { created_at: -1 },
      };
      const posts_of_club = await post_collection
        .find(query, options)
        .toArray();

      if ((await post_collection.countDocuments(query)) === 0) {
        console.log("No documents found!");
      }

      // get the fifth recent post (after deletion),
      // which is the one we need to add to the subset

      // This is the case where we don't have posts other than the ones in
      // the subset
      if (posts_of_club.length < 5) {
        try {
          clubs_collection.updateOne({ name: clubName }, [
            { $set: { posts: club_document_new_posts_object } },
          ]);
        } catch (e) {
          console.log("error!");
          console.log(e);
        }
        return res.send().status(200);
      }

      // This is the case where we have more than 5 posts for the club
      let next_recent_post_of_club = posts_of_club[4];
      club_document_new_posts_object.push(next_recent_post_of_club);

      // update the posts property of the club to the new post
      try {
        clubs_collection.updateOne({ name: clubName }, [
          { $set: { posts: club_document_new_posts_object } },
        ]);
      } catch (e) {
        console.log("error!");
        console.log(e);
      }

      return res.send().status(200);
    } catch (err) {
      console.log(err);
      return res.send().status(500);
    }
  }
);

export default router;
