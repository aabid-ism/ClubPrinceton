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
// currently will be called twice on the frontend -> can be done once with some react component
// refactoring
// need 2 requests if you want all computation done on the backend -> However -> just addition can simply
// be done on the frontend as a buffer in the browser
router.get("/breakdown", async (req, res) => {
    // try entire code and catch 404 error send 404 status
    // need try catch blocks everywhere!
    console.log("I'm in the ovr_rating/breakdown endpoint");
    const clubName = req.query.clubName;
    const ovrRatingRequest = req.query.ovrRatingReq;
    console.log("clubName to query: " + clubName);

    const db = conn.getDb();

    const ratingsCollection = await db.collection("ratings");
    // does this take up too much time?
    // return 1 or 0
    const hasUserRating = await ratingsCollection.countDocuments({club: clubName}, {limit: 1});
    console.log("Number of User Ratings for the Club: " + typeof(hasUserRating));
    console.log("Has A User Rating (1 if true, 0 false): " + JSON.stringify(hasUserRating));
    let clubRating = "NEW";

    // use better if Condition
    if (hasUserRating) {
        console.log("I have at least one user rating for this club");
        const clubsCollection = await db.collection("clubs");
        // send mongodb errors
        const clubDoc  = await clubsCollection.findOne({name: clubName});
        
        clubRating = {
            // overall Rating and rating breakdown rounded to the nearest hundreth
            vibesRating: roundHundreth(clubDoc.rating.Vibes),
            cloutRating: roundHundreth(clubDoc.rating.Clout),
            inclusRating: roundHundreth(clubDoc.rating.Inclusivity),
            intensityRating: roundHundreth(clubDoc.rating.Intensity),
        }
        console.log("club rating breakdown: " + JSON.stringify(clubRating));
    }

    if (ovrRatingRequest) {
        console.log("I'm in here requesting the overall Rating");
        let ovrRating = roundHundreth((clubRating.vibesRating + clubRating.cloutRating +
            clubRating.inclusRating + clubRating.intensityRating) / 4);
        res.send(ovrRating).status(200);
        console.log("Sent Club Overall Rating to the frontend");
    }
    else {
        res.send(clubRating).status(200);
        console.log("clubRating breakdown sent to the frontend! " + clubRating);
    }
});


export default router;