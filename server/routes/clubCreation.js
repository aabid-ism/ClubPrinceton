import conn from "../db/conn.js";
import express from "express";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const db = conn.getDb();
    const collection = db.collection("clubCreation");
    const results = await collection.find({}).toArray();
    res.send(results).status(200);
  } catch (err) {
    res.status(500).send("Error fetching clubCreation data");
  }
});

router.post("/a/:name", async (req, res) => {
  try {
    const db = conn.getDb();
    const collection = db.collection("clubCreation");
    const club = await collection.findOne({ name: req.params.name });
    if (!club) {
      return res.status(404).send("Club not found");
    }
    await collection.updateOne(
      { name: req.params.name },
      { $set: { status: "accepted" } }
    );
    const clubData = getClubData(club);
    const collection2 = db.collection("clubs");
    const result = await collection2.insertOne(clubData);
    res.send("Club accepted").status(200);
  } catch (err) {
    res.status(500).send("Error accepting club");
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
    res.send("Club declined").status(200);
  } catch (err) {
    res.status(500).send("Error declining club");
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
        name: applicantName,
        position: positionInClub,
        netid: requesterID,
      },
    ],
    posts: [],
  };
  return clubData;
}

export default router;
