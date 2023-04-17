import conn from "../db/conn.js";
import express from "express";

const router = express.Router();

router.get("/announcement", async (req, res) => {
    console.log("I'm in the server!");
    // let clubName = req.params.name;
    // console.log("clubName" + clubName);

    const db = conn.getDb();

    const clubsCollection = await db.collection("clubs");

    // grab the announcement for the particular club
    // need to make this more sophisticated
    let clubName = "Test Elephant Club";
    let clubAnnouncment = clubsCollection.find({name: clubName}, {annoucement: 1});

    // can be null/empty or with words
    // timestamp -> when was announcment last created
    res.send(annoucement).status(200);
});




export default router;