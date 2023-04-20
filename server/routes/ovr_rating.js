import conn from "../db/conn.js";
import express from "express";

const router = express.Router();

// round to nearest hundreth
function roundHundreth(specificRating) {
    const HUNDRED = 100;
    return Math.round(specificRating * HUNDRED) / HUNDRED;
}

// round hundreth function out here
// URL routing may be too less -> may need to add more based
// on router.use
// gets all overall rating and breakdown -> entire object
// wrap everything in try/catch block
router.get("/breakdown", async (req, res) => {
    // try entire code and catch 404 error send 404 status
    // need try catch blocks everywhere!
    console.log("I'm in the ovr_rating/breakdown endpoint");
    const clubName = req.query.clubName;
    console.log("clubName to query: " + clubName);

    const db = conn.getDb();

    const ratingsCollection = await db.collection("ratings");
    const numRatinsDocs = ratingsCollection.countDocuments({club: clubName}, {limit: 1});
    console.log("Number of User Ratings for the Club: " + numRatinsDocs);
    let ovrRating = "NEW";

    if (numRatinsDocs !== 0) {
        const clubsCollection = await db.collection("clubs");
        const ratings  = await clubsCollection.findOne({name: clubName}, {ratings: 1});
        console.log("ratings data type: " + typeof(ratings));
        const totalRating = ratings.Vibes + ratings.Clout + ratings.Inclusivity + ratings.Intensity;
        // 4 is the number of individual ratings factors
        ovrRating = roundHundreth(totalRating / 4);
    }

    res.send(ovrRating).status(200);
    console.log("OvrRating sent to the frontend! " + ovrRating);
});


export default router;