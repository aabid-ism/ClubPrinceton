import conn from "../db/conn.js";
import express from "express";

const router = express.Router();

// endpoint to get a rating from the database
router.get("/:name", async (req, res) => {
  const db = conn.getDb();
  const collection = await db.collection("clubs");
  const query = req.params.name;
  // search for a club by name and return the first ratings in
  //result with all attributes
  const agg = [
    {
      $match: { name: query }, // match clubs with the given name
    },
    {
      $project: { _id: 0, rating: 1 }, // return only the "rating" field
    },
  ];

  // run pipeline
  const result = await collection.aggregate(agg).toArray();
  // print results
  if (result.length === 0) {
    // no ratings found for the club
    res.status(404).send({ message: "Club not found" });
  } else {
    res.status(200).send(result[0]["rating"]);
  }
});

// endpoint to add a rating to the database
router.post("/:name/:username", async (req, res) => {
  const db = conn.getDb();
  const collection = await db.collection("ratings");
  // get data from request body
  const data = req.body;
  // add a timestamp to the data
  data["lastupdated"] = new Date();

  // insert data into database
  const result = await collection.insertOne(data);

  // update the rating of the club
  const ag = [
    {
      $match: { club: req.params.name
                
      }, // match clubs with the given name
    },
    {
      $group: {
        _id: null,
        Vibes: { $avg: "$Vibes" },
        Clout: { $avg: "$Clout" },
        Inclusivity: { $avg: "$Inclusivity" },
        Intensity: { $avg: "$Intensity" },
      },
    },
  ];

  const allRatings = await collection.aggregate(ag).toArray();

  if (allRatings.length === 0) {
    // no ratings found for the club
    return res.status(404).send({ message: "Club not found" });
  }

  const avgRating = allRatings[0];

  // update only the rating field of the club
  const clubCollection = await db.collection("clubs");
  console.log(avgRating);
  const clubResult = await clubCollection.updateOne(
    { name: req.params.name },
    { $set: { rating: avgRating } }
  );
  console.log(clubResult);

  res.status(200).send(clubResult);
});

router.get("/:club/:user", async (req, res) => {
  const db = conn.getDb();
  const collection = await db.collection("ratings");
  const query = req.params.club;
  const user = req.params.user;
  // search for a club by name and return the first ratings in
  //result with all attributes
  const agg = [
    {
      $match: { club: query, user: user }, // match clubs with the given name
    },
    {
      $project: {
        _id: 0,
        Vibes: 1,
        Clout: 1,
        Inclusivity: 1,
        Intensity: 1,
      }, // return only the "rating" field
    },
  ];

  // run pipeline
  var result = await collection.aggregate(agg).toArray();
  // print results
  console.log(result);
  result = result[0];

  if (
    result == {} ||
    result == [] ||
    result == null ||
    result == undefined
  ) {
    result = { Vibes: 0, Clout: 0, Inclusivity: 0, Intensity: 0 };
  }

  console.log(result);
  res.send(result).status(200);
});

export default router;
