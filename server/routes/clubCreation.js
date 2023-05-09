import conn from "../db/conn.js";
import express from "express";
import verifyToken from "../jwt.js";
const router = express.Router();

// fetches pending/accepted/declined clubs in the clubCreation database
// for the superadmin interface
router.get("/", verifyToken, async (req, res) => {
  try {
    const db = conn.getDb();
    const collection = db.collection("clubCreation");
    const results = await collection
      .find({})
      .sort({ status: -1 })
      .toArray();
    res.send(results).status(200);
  } catch (err) {
    res.status(500).send("Error fetching clubCreation data");
  }
});

// posts an accepted club to the clubCreation database
// makes club requester an admin member in users collection
// adds accepted club to the clubs database
router.post("/a/:name", async (req, res) => {
  try {
    const db = conn.getDb();
    const collection = await db.collection("clubCreation");
    const club = await collection.findOne({ name: req.params.name });
    if (!club) {
      return res.status(404).send("Club not found");
    }
    applicantNetid = club.requesterID;
    await collection.updateOne(
      { name: req.params.name },
      { $set: { status: "accepted" } }
    );

    // add club under admin_clubs field in users collection
    const usersCollection = db.collection("users");
    const user = await usersCollection.findOne({ netid: applicantNetid });
    if (!user) {
      return res.status(404).send("User not found");
    }
    await usersCollection.updateOne(
      { netid: applicantNetid },
      { $push: { admin_clubs: req.params.name } }
    );

    // add club to clubs collection
    const clubData = getClubData(club);
    // new club data in clubs collection is now accepted
    clubData.status = "accepted";
    const clubsCollection = db.collection("clubs");
    const result = await clubsCollection.insertOne(clubData);
    res.send("Club accepted").status(200);
  }
  catch (err) {
    res.status(500).send("Error accepting club");
  }
});

// declining a club in club creation collection
router.post("/d/:name", async (req, res) => {
  try {
    const db = conn.getDb();
    const collection = await db.collection("clubCreation");
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
    numUserRatings: 0,
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
