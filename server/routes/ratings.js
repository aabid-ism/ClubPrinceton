import conn from "../db/conn.js";
import express from "express";

const router = express.Router();

// endpoint to get a rating from the database
router.get("/:name", async (req, res) => {
  const db = conn.getDb();
  const collection = await db.collection("clubs");
  const query = req.params.name;
  console.log(query);
  // search for a club by name and return the first ratings in
  //result with all attributes
  const agg = [
    {
      $match: { name: query } // match clubs with the given name
    },
    {
      $project: { _id: 0, rating: 1 } // return only the "rating" field
    }
  ];


  // run pipeline
  const result = await collection.aggregate(agg).toArray();
  // print results
  console.log(result[0]);

  res.send(result[0]).status(200);
});

// endpoint to add a rating to the database
router.post("/:name", async (req, res) => {
  const db = conn.getDb();
  const collection = await db.collection("ratings");
  // get data from request body
  const data = req.body;
  console.log(data);
  // add a timestamp to the data
  data["lastupdated"] = new Date();

  // add username
  data["username"] = "roy";

  // insert data into database
  const result = await collection.insertOne(data);

  // update the rating of the club
  const ag = [
    {
      $match: { club: req.params.name } // match clubs with the given name
    },
    {
      $group: {
        _id: null,
        Vibes: { $avg: "$Vibes" },
        Clout: { $avg: "$Clout" },
        Inclusivity: { $avg: "$Inclusivity" },
        Intensity: { $avg: "$Intensity" }
      }
    }
  ];

  const allRatings = await collection.aggregate(ag).toArray();

  if (allRatings.length === 0) {
    // no ratings found for the club
    return res.status(404).send({ message: "Club not found" });
  }

  const avgRating = allRatings[0];

  // update only the rating field of the club
  const clubCollection = await db.collection("clubs");
  console.log(avgRating)
  const clubResult = await clubCollection.updateOne({ name: req.params.name }, { $set: { rating: avgRating } });
  console.log(clubResult);

  res.status(200).send(clubResult);
});

router.get("/:club/:username", async (req, res) => {
  const db = conn.getDb();
  const collection = await db.collection("ratings");
  const query = req.params.club;
  const username = req.params.username;
  console.log(query);
  // search for a club by name and return the first ratings in
  //result with all attributes
  const agg = [
    {
      $match: { club: query, username: username } // match clubs with the given name
    },
    {
      $project: { _id: 0, rating: 1 } // return only the "rating" field
    }
  ];

  // run pipeline
  const result = await collection.aggregate(agg).toArray();
  // print results
  console.log(result[0]);

  res.send(result[0]).status(200);
});

export default router;