import conn from "../db/conn.js";
import express from "express";

const router = express.Router();

// round hundreth function out here
// URL routing may be too less -> may need to add more based
// on router.use
// gets all overall rating and breakdown -> entire object
router.get("/", async (req, res) => {
    // try entire code and catch 404 error send 404 status
    // need try catch blocks everywhere!
    console.log("I'm in the server!");
    const clubName = req.query.clubName;
    console.log("clubName" + clubName);

    const db = conn.getDb();

    const clubsCollection = await db.collection("clubs");

    // grab the announcement for the particular club
    // need to make this more sophisticated
    // this will grab me the ratings object
    const ratingBreakdown = {};
    const ratings  = await clubsCollection.findOne({name: clubName}, {ratings: 1});

    // no course can ever be rated below a 1.0
    // automatically gets defaulted to a 1.0

    // throw an error if we encounter an average rating less than 1.0 -> shift to N/A
    // throw a server log error

    // rounding all of the breakdown to the nearest hundreth
    let vibesRating = ratings.Vibes;
    let cloutRating = ratings.Clout;
    let inclusRating = ratings.Inclusivity;
    let intensityRating = ratings.Intensity;

    const totalRating = vibesRating + cloutRating + inclusRating + intensityRating;
    // 100 is magic number for rounding to nearest hundreth
    // overall Rating to the nearest hundreth
    const ovrRating = Math.round(totalRating * 100) / 100;
    // round individual rating breakdowns to nearest hundreth
    vibesRating = Math.round(vibesRating * 100) / 100;





    // let's build a new object in the backend 

    // can be null/empty or with words
    // timestamp -> when was announcment last created
    res.send(annoucement).status(200);
});




export default router;