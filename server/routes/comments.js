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
    // console.log(`Attempting to get post ${formattedPostId}`);
    // const post_document = await post_collection.find({_id: {$eq: post_comment_to_insert.postId}}).toArray();
    // post_comment_property = post_document.comments || "empty";

    // if (post_comment_property.length >= 5) {
    //     post_comment_property.sort((a, b) => -(a.created_at - b.created_at));
    //     post_comment_property.pop();
    //   }
    
    //   post_comment_property.unshift(post_comment_to_insert);
    // // TODO: This doesn't currently work?
    // // push the comment to the comments property of the club document
    // post_collection.updateOne(
    // { _id: post_comment_to_insert.postId },
    // [{ $set: { comments: post_comment_property } }]
    // )
    // console.log(post_document);
    
    
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