const conn = require('../db/conn.js');
const ObjectId = require('mongodb').ObjectId;
const express = require('express');

const router = express.Router();

router.post('/create', async (req, res) => {
    // TODO: include user as info
    const {data, postId} = req.body;
    const formattedPostId = new ObjectId(postId);
    const post_comment_to_insert = {
        postId: formattedPostId,
        data,
        likes: 0,
        commenter_netId: 'cspeed',
        created_at: new Date()
    };
    
    console.log(post_comment_to_insert);

    const db = conn.getDb();
    const comment_collection = await db.collection("comments");
    const post_collection = await db.collection("posts");
    const result = await comment_collection.insertOne(post_comment_to_insert);

    
    // after creating the comment document in the comments collection,
    // check the post whose id matches the postId, and get its comments field
    console.log(`Attempting to get post ${formattedPostId}`);
    const post_document = await post_collection.find(
        { $expr: { $eq: ["$_id", formattedPostId] } },
        { _id: 0, name: 1 },
    );
    post_comment_property = post_document.comments || "empty";

    console.log(post_comment_property);
    
    
    res.send("Successfully Received!");
});

// Get a single post's comments
router.get("/load/:post", async (req, res) => {
    console.log("Received Request");
    const post = new ObjectId(req.params.post);
    console.log(post);
    const db = conn.getDb();
    const collection = await db.collection("comments");
    const result = await collection.find({postId: { $eq: post}}).toArray();
    console.log(result);
    res.send(result).status(200);
});  

module.exports = router;