const conn = require('../db/conn.js');
const ObjectId = require('mongodb').ObjectId;
const express = require('express');

const router = express.Router();

router.post('/create', async (req, res) => {
    // TODO: include user as info
    const {data, postId} = req.body;
    const post_comment_to_insert = {
        postId: new ObjectId(postId),
        data,
        likes: 0,
        commenter_netId: 'cspeed',
        created_at: new Date()
    };
    
    console.log(post_comment_to_insert);
    
    const db = conn.getDb();
    const comment_collection = await db.collection("comments");
    const result = await comment_collection.insertOne(post_comment_to_insert);
    
    res.send("Successfully Received!");
});

// Get a single post's comments
router.get("/:post", async (req, res) => {
    console.log(req.params.postId);
    const db = conn.getDb();
    const collection = await db.collection("comments");
    const result = await collection.find({ postId: { $eq: [req.params.post] } }).limit(50).toArray();
    console.log(result);
    res.send(result).status(200);
});  

module.exports = router;