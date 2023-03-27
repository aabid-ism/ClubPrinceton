const conn = require("../db/conn.js");
const ObjectId = require("mongodb").ObjectId;
const express = require("express");

const router = express.Router();

// Get a list of all clubs
router.get("/", async (req, res) => {
  const db = conn.getDb();
  const collection = await db.collection("clubs");
  const results = await collection.find({}).limit(50).toArray();
  res.send(results).status(200);
});

// get club information of a single club
router.get("/a/:name", async (req, res) => {
  const db = conn.getDb();
  const collection = await db.collection("clubs");
  const query = req.params.name;
  console.log(query);
  // search for a club by name and return the first result with all attributes

  const agg = [
    { $search: { autocomplete: { query: query, path: "name" } } },
  ];

  // run pipeline
  const result = await collection.aggregate(agg).toArray();
  // print results
  console.log(result);

  res.send(result).status(200);
});
// Get a single club
router.get("/:name", async (req, res) => {
  const db = conn.getDb();
  const collection = await db.collection("clubs");
  const query = req.params.name;
  console.log(query);
  // const result = await collection.findOne(query);

  const agg = [
    { $search: { autocomplete: { query: query, path: "name" } } },
    { $limit: 20 },
    { $project: { _id: 0, name: 1 } },
  ];
  // run pipeline
  const result = await collection.aggregate(agg).toArray();
  // print results
  // await result.forEach((doc) => console.log(doc));

  console.log(result);

  res.send(result).status(200);
});

// Get the existence of a  single club
router.get("/check/:name", async (req, res) => {
  const collection = await db.collection("clubs");
  const query = { name: req.params.name };
  const result = await collection.findOne(query);

  if (result)
    res.send("A club with that name already exists").status(200);
});

// Post a club
router.post("/create", async (req, res) => {
  // checking for a club with this name needs to be done
  //before accessing this endpoint

  // reference for database and collection in mongodb
  const db = conn.getDb();
  const collection = db.collection("clubs");

  // TODO: validation of data

  // destructuring form data submitted by admin page
  const { name, categories, email, description, announcement } =
    req.body;

  // starting rating and stats for clubs is a zero.
  const rating = {
    "Good vibes": 0,
    Diversity: 0,
    Intensity: 0,
    Selectivity: 0,
  };

  const stats = {
    Followers: 0,
    Likes: 0,
    Posts: 0,
  };

  const document = {
    name,
    categories,
    email,
    description,
    announcement,
    rating,
    stats,
  };
  // _id property is automatically assigned by mongodb.
  const result = await collection.insertOne(document);

  console.log(result);
  res.send("Club Added").status(200);
});

module.exports = router;
