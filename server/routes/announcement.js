import conn from "../db/conn.js";
import verifyToken from "../jwt.js";
import express from "express";

const router = express.Router();

router.get("/get", verifyToken, async (req, res) => {
    // maybe some inefficency -> is post route calling get route in admin interface?
    // check later if have time
    const db = conn.getDb();
    const clubsCollection = await db.collection("clubs");

    const clubName = req.query.clubName;

    const clubDoc = await clubsCollection.findOne({ name: clubName });
    let announcement = clubDoc.announcement;

    // if club doesn't have announcement
    if (announcement === "") announcement = "Nothing to see here!";

    res.send(announcement).status(200);
    // console.log("Sent announcement to frontend!");
});


// posting an announcement from admin interface to club collection for specific club
router.post("/change/:clubName", verifyToken, async (req, res) => {

    // connection and get collection
    const db = conn.getDb();
    const clubsCollection = await db.collection("clubs");

    // get the announcement from request body
    // clubDoc.announcement = req.body;
    console.log(`New Announcement is... ${req.body}`);
    const updatedClubDoc = await clubsCollection.updateOne(
        { name: req.params.clubName },
        // [{ $set: { posts: { $concatArrays: ["$posts", [post_document_to_insert]] } } }]
        [{ $set: { announcement: req.body.announcement } }]
    )

    res.send(updatedClubDoc).status(200);

});


export default router;