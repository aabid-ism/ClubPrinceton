import conn from '../db/conn.js';
import {ObjectId} from 'mongodb';
import express from 'express';

const router = express.Router();

router.get("/:commentId", async (req, res) => {
    const commentId = req.params.commentId;
    const user = req.query.user;

    // result is an object with the number of likes, and whether that user has liked the comment
    const result = {
        numLikes: 10,
        user_has_liked: true
    }
    const db = conn.getDb();
    const likes_collection = await db.collection("likes");

    res.send(result).status(200);
});

export default router;