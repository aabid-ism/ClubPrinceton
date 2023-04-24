import conn from '../db/conn.js';
import {ObjectId} from 'mongodb';
import express from 'express';

const router = express.Router();

router.get('/:commentId', async(req, res) => {
    console.log("Received comment request!");
    console.log(req.params.commentId);
    res.send("Successful!");
})

router.post('/', async(req, res) => {
    const { netId, commentId } = req.body;
    res.send("Hello! Received").status(200);
})


export default router;