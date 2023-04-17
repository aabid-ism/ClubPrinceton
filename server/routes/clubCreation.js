import conn from "../db/conn.js";

import express from "express";

const router = express.Router();

router.get("/", async (req, res) => {
  const db = conn.getDb();
  const collection = await db.collection("clubCreation");
  const results = await collection.find({}).toArray();
  res.send(results).status(200);
});

router.post("/a/:name", async (req, res) => {
  const db = conn.getDb();
  const collection = await db.collection("clubCreation");
  const result = await collection.findOne({ name: req.params.name });
  if (result) {
    await collection.updateOne(
      { name: req.params.name },
      { $set: { status: "accepted" } }
    );
    const collection2 = await db.collection("clubs");
    const club = result;
    delete club._id;
    delete club.status;
    delete club.requesterID;
    delete club.certificateLink;
    club["rating"] = {
      Vibes: 1,
      Clout: 1,
      Inclusivity: 1,
      Intensity: 1,
    };
    club["stats"] = {
      Followers: 0,
      Likes: 0,
      Posts: 0,
    };
    club["categories"] = [];
    club["announcement"] = "";
    club["description"] = "";
    console.log(club);
    const results2 = await collection2.insertOne(club);
    res.send("club accepted").status(200);
  } else {
    res.send("club not accepted").status(404);
  }
});

router.post("/d/:name", async (req, res) => {
  const db = conn.getDb();
  const collection = await db.collection("clubCreation");
  const results = await collection.findOne({ name: req.params.name });
  if (results) {
    await collection.updateOne(
      { name: req.params.name },
      { $set: { status: "declined" } }
    );
    res.send("club declined").status(200);
  } else {
    res.send("club not declined").status(404);
  }
});

export default router;
