const conn = require('../db/conn.js');
const ObjectId = require('mongodb').ObjectId;
const express = require('express');


const router = express.Router();

// endpoint to create a post from the admin page
router.post("/create", async (req,res) => {
    const db = conn.getDb();
    const club_collection = db.collection("clubs");
    const posts_collection = db.collection("posts");

    // get data from req.body
    const {netId, club, caption, image_url} = req.body;

    // create javascript object with the destructured data
    const post_document_to_insert = {
        netId, 
        club, 
        caption, 
        image_url
      };  
 
    // TODO: ADD currentdatetime to the post property

    // add to the posts collection
    const result = await posts_collection.insertOne(post_document_to_insert);

    // get the club that the post is coming from
    const clubdocument = await club_collection.findOne(
      {$expr : {$eq: ["$name", club]}},
      {_id: 0, name: 1},
    )
    // push the post to the posts property of the club document
    club_collection.updateOne(
      { name: clubdocument.name}, [ { $set: { posts: { $concatArrays: [ "$posts", [ post_document_to_insert]  ] } } } ]
    )

    // TODO: pop the 5th post from the posts property of the club document, if 5 posts exist
    
    res.send(clubdocument).status(200);
})
module.exports = router;