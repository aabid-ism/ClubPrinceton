import conn from "../db/conn.js";
import express from "express";

const router = express.Router();

router.get("/get", async (req, res) => {
    console.log("I'm in the announcement endpoint");
    // let clubName = req.params.name;
    // console.log("clubName" + clubName);

    const db = conn.getDb();
    const clubsCollection = await db.collection("clubs");

    // grab the announcement for the particular club
    // need to make this more sophisticated
    // what returns if there is no announcement -> an empty string?
    const clubName = req.query.clubName;
    console.log("clubName from request: " + clubName);


    // need proper error messaging here!
    // can remove announcement: 1 before merging
    const clubDoc = await clubsCollection.findOne({name: clubName}, {announcement: 1});
    let announcement = clubDoc.announcement;

    // if club doesn't have announcement
    if (announcement === "") announcement = "Nothing to see here!";

    console.log("Club Data: " + clubDoc);
    console.log("announcement: " + announcement);
    console.log("type of data for announcement: " + typeof(announcement));

    // can be null/empty or with words
    // timestamp -> when was announcment last created
    res.send(announcement).status(200);
    console.log("Sent announcement to frontend!");
});




export default router;