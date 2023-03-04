const conn = require('../db/conn.js');
const ObjectId = require('mongodb').ObjectId;
const express = require('express');

const router = express.Router();


// Get a list of all clubs
router.get("/", async (req, res) => {
    db = conn.getDb();
    const collection = await db.collection("clubs");
    const results = await collection.find({})
      .limit(50)
      .toArray();
    res.send(results).status(200);
  });

// Get a single club
router.get("/:id", async (req, res) => {
    let collection = await db.collection("clubs");
    let query = {_id: ObjectId(req.params.id)};
    let result = await collection.findOne(query);
  
    if (!result) res.send("Not found").status(404);
    else res.send(result).status(200);
  });

  module.exports = router;