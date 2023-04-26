import conn from "../db/conn.js";
import express from "express";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const db = conn.getDb();
    const collection = db.collection("clubCreation");
    const results = await collection
      .find({})
      .sort({ status: -1 })
      .toArray();
    res.status(200).send(results);
  } catch (err) {
    console.error("Error fetching clubCreation data:", err);
    res.status(500).send("Internal server error");
  }
});
router.post("/a/:name/:netid", async (req, res) => {
  try {
    const db = conn.getDb();
    const collection = db.collection("clubCreation");
    const club = await collection.findOne({ name: req.params.name });
    if (!club) {
      return res.status(404).send("Club not found");
    }

    // Set status to accepted for the club
    await collection.updateOne(
      { name: req.params.name },
      { $set: { status: "accepted" } }
    );

    // Add club under admins_clubs for the specified user
    const collection1 = db.collection("users");
    const user = await collection1.findOne({ netid: req.params.netid });
    if (!user) {
      return res.status(404).send("User not found");
    }
    await collection1.updateOne(
      { netid: req.params.netid },
      { $push: { admins_clubs: req.params.name } }
    );

    res
      .status(200)
      .send("Club accepted and added to user's admins_clubs");
  } catch (err) {
    console.error(
      "Error accepting club and adding to user's admins_clubs:",
      err
    );
    res.status(500).send("Internal server error");
  }
});

router.post("/d/:name", async (req, res) => {
  try {
    const db = conn.getDb();
    const collection = db.collection("clubCreation");
    const club = await collection.findOne({ name: req.params.name });
    if (!club) {
      return res.status(404).send("Club not found");
    }
    await collection.updateOne(
      { name: req.params.name },
      { $set: { status: "declined" } }
    );
    res.status(200).send("Club declined");
  } catch (err) {
    console.error("Error declining club:", err);
    res.status(500).send("Internal server error");
  }
});

function getClubData(club) {
  const { applicantName, positionInClub, requesterID, ...rest } = club;
  const clubData = {
    ...rest,
    rating: {
      Vibes: 1,
      Clout: 1,
      Inclusivity: 1,
      Intensity: 1,
    },
    stats: {
      Followers: 0,
      Likes: 0,
      Posts: 0,
    },
    categories: [],
    announcement: "",
    officers: [
      {
        title: positionInClub,
        netid: requesterID,
      },
    ],
    posts: [],
  };
  return clubData;
}

export default router;
