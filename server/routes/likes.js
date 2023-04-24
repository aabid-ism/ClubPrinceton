import conn from '../db/conn.js';
import {ObjectId} from 'mongodb';
import express from 'express';

const router = express.Router();

router.get('/load/', async (req, res) => {
    console.log("Received comment request!");
    // console.log(req.params.commentId);
    // console.log(req.params.netId);
    res.send("Successful!").status(200);
});

router.post('/', async(req, res) => {
    const { netId, commentId } = req.body;
    res.send("Hello! Received").status(200);
});


export default router;