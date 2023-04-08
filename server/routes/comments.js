import conn from '../db/conn.js';
import ObjectId from 'mongodb';
import express from 'express';

const router = express.Router();

router.post('/create', async (req, res) => {
    // TODO: include user as info
    const { data, postId } = req.body;
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
    console.log(formattedPostId)

    const post = await post_collection.findOne({ _id: { $eq: formattedPostId } });
    const post_comments = post.comments !== undefined ? post.comments : [];
    //console.log(post_comments);
    // does this need to sort again?
    if (post_comments.length >= 5) {
        post_comments.pop();
    }

    post_comments.unshift(post_comment_to_insert);
    //console.log(post_comments);
    post_collection.updateOne(
        { _id: formattedPostId },
        [{ $set: { comments: post_comments } }]
    );


    res.send(post_comment_to_insert).status(200);
});

// Get a single post's comments
router.get("/load/:post", async (req, res) => {
    console.log("Received Request");
    const post = new ObjectId(req.params.post);
    console.log(post);
    console.log(req.query.oldestTime)
    const db = conn.getDb();
    const collection = await db.collection("comments");
    const result = await collection.find({ postId: { $eq: post } }).toArray();
    console.log(result);
    res.send(result).status(200);
});

export default router;