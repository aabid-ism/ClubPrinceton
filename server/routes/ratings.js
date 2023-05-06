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
  // need to have zero ratings error handling here!
  const db = conn.getDb();
  const ratingsCollection = await db.collection("ratings");
  // get data from request body
  const currentUserRatings = req.body.currentUserRatings;
  const newClubRating = {
    _id: null,
    Vibes: req.body.updatedClubRating.Vibes,
    Clout: req.body.updatedClubRating.Clout,
    Inclusivity: req.body.updatedClubRating.Inclusivity,
    Intensity: req.body.updatedClubRating.Intensity,
  };
  // add a timestamp to the data
  currentUserRatings["lastupdated"] = new Date();

  // insert data into database if no previous rating for this club from this user
  const result = await ratingsCollection.findOne({
    club: req.params.name,
    user: req.params.username,
  });

  const clubCollection = await db.collection("clubs");
  if (!result) {
    // no previous rating found, insert new rating
    const insertResult = await ratingsCollection.insertOne(currentUserRatings);
    
    // if no previous rating found -> then we want to update the clubs collection's numUserRatings
    // parameter -> allows for easy average calculation on the frontend for automatic rendering
    await clubCollection.updateOne(
      {name: req.params.name},
      { $set: {numUserRatings: req.body.updatedClubRating.numUserRatings}}
    );

  } 
  else {
    // previous rating found, update rating
    await ratingsCollection.updateOne(
      { club: req.params.name, user: req.params.username },
      { $set: currentUserRatings }
    );
  }

  // update the overall rating of the club
  // const ag = [
  //   {
  //     $match: { club: req.params.name }, // match clubs with the given name
  //   },
  //   {
  //     $group: {
  //       _id: null,
  //       Vibes: { $avg: "$Vibes" },
  //       Clout: { $avg: "$Clout" },
  //       Inclusivity: { $avg: "$Inclusivity" },
  //       Intensity: { $avg: "$Intensity" },
  //     },
  //   },
  // ];

  // const allRatings = await ratingsCollection.aggregate(ag).toArray();

  // if (allRatings.length === 0) {
  //   // no ratings found for the club
  //   return res.status(404).send({ message: "Club not found" });
  // }

  // const avgRating = allRatings[0];

  // update only the rating field of the club
  // console.log(avgRating);
  try {
    const clubResult = await clubCollection.updateOne(
      { name: req.params.name },
      { $set: { rating: newClubRating } },
    );
    console.log(clubResult);
    res.status(200).send(clubResult);
  } 
  catch (err) {
    console.error(err);
    res.status(500).send({ message: "Error updating club rating" });
  }
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
      // changed to all zeroes? -> ask Roy
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
  // console.log(result);
  result = result[0];

  if (
    result == {} ||
    result == [] ||
    result == null ||
    result == undefined
  ) {
    result = { Vibes: 0, Clout: 0, Inclusivity: 0, Intensity: 0 };
  }

  // console.log(result);
  res.send(result).status(200);
});

export default router;
