const conn = require('../db/conn.js');
const ObjectId = require('mongodb').ObjectId;
const express = require('express');

const router = express.Router();

router.post(async (req,res) => {

    const db = conn.getDb();
    const club_collection = db.collection("clubs");
    const posts_collection = db.collection("posts");

    // get data from req.body
    const {netId, club, caption, image_url} = req.body;
    const document = {
        netId, 
        club, 
        caption, 
        image_url
      };  
    // add to the posts collection
    const result = await posts_collection.insertOne(document);

    // add to the posts property in clubs collection and drop last post
    

})