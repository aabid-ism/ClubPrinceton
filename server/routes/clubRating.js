// endpoint for checking whether a particular has any user ratings

import conn from "../db/conn.js";
import verifyToken from "../jwt.js";
import express from "express";

const router = express.Router();

router.get("/check", verifyToken, async (req, res) => {
    // try entire code and catch 404 error -> send 404 status
    // need try catch blocks everywhere!
    console.log("I'm in the clubRating/check endpoint");

    const clubName = req.query.clubName;
    console.log("clubName to query: " + clubName);

    const db = await conn.getDb();

    // probably need mongodb error handling

    const ratingsCollection = await db.collection("ratings");
    // does club have at least one user rating to have a genuine rating breakdown?
    const hasUserRating = await ratingsCollection.countDocuments({club: clubName}, {limit: 1});
    console.log("Type of User Rating Data for the Club: " + typeof(hasUserRating));
    console.log("Has a User Rating (1 if true, 0 false): " + JSON.stringify(hasUserRating));

    // we need to send back an object
    const clubUserRatings = {hasUserRating: hasUserRating};

    res.send(clubUserRatings).status(200);
    console.log("Sent hasUserRating for Requested Club to Client!");
});


export default router;