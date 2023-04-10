import conn from '../db/conn.js';
import {ObjectId} from 'mongodb';
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
    post_collection.updateOne(
        { _id: formattedPostId },
        [{ $set: { comments: post_comments } }]
    );

    // update the duplicate within the subset comments in the post
    const club_collection = await db.collection("clubs")
    const club = await club_collection.findOne({
        posts: {$elemMatch: {_id: formattedPostId}}
    });
    // console.log("This is the subset version")
    const target_post = club.posts.find(post => post._id.toString() === formattedPostId.toString())
    // console.log("Line break")
    // console.log(target_post)
    const target_post_comments = target_post.comments !== undefined ? target_post.comments : [];
    // console.log(target_post_comments);
    // console.log("Test")
    if (target_post_comments.length >= 5) {
        target_post_comments.pop();
    }

    target_post_comments.unshift(post_comment_to_insert);
    // console.log("Comments updated")
    // console.log(club.posts)

    club_collection.updateOne(
        { posts: {$elemMatch: {_id: formattedPostId}} },
        [{ $set: { posts: club.posts } }]
    );
    res.send(post_comment_to_insert).status(200);
});

// Get more NEW comments for a post
router.get("/load/:post", async (req, res) => {
    console.log("Received Request for more comments");
    const post = new ObjectId(req.params.post);
    console.log(post);
    const floorTime = new Date(req.query.oldestTime);
    console.log(floorTime)
    const db = conn.getDb();
    const collection = await db.collection("comments");
    const result = await collection.aggregate([
        {
          $match: {
            postId: post,
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
    // const result = await collection.find({ postId: { $eq: post } }).toArray();
    //console.log(result);
    res.send(result).status(200);
});

export default router;