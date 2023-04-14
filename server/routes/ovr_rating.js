import conn from "../db/conn.js";
import express from "express";

const router = express.Router();
// URL routing may be too less -> may need to add more based
// on router.use
router.get("/ovrrtg", async (req, res) => {
    console.log("I'm in the server!");
    let clubName = req.params.name;
    console.log("clubName" + clubName);

    const db = conn.getDb();

    const clubsCollection = await db.collection("clubs");

    // grab the announcement for the particular club
    // need to make this more sophisticated
    let clubAnnouncment = clubsCollection.find({name: clubName}, {ratings: 1});

    // can be null/empty or with words
    // timestamp -> when was announcment last created
    res.send(annoucement).status(200);
});




export default router;