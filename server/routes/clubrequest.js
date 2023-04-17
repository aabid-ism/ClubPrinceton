import conn from "../db/conn.js";
import express from "express";
const router = express.Router();

// Post a club form to club creation collection
router.post("/submit", async (req, res) => {
    const db = conn.getDb();
    const clubCreation = await db.collection("clubCreation");
    console.log("I'm here in the clubrequest/submit endpoint");
    console.log('new change');
    console.log(req.body.clubName);
    console.log(typeof(req.body.clubName));

    // fields to be inserted as a club creation document
    // // need to subsitute with actual user id
    const dummyID = "ap7232";
    const status = "pending";
    let clubAdmin = ["ap7232"];
    // // clubEmail, clubPosition, clubCert, clubAddInfo
    // // admin array with dummy netid, dummy netid email addr, pending status
    const CLUB_CREATION_REQUEST = {
        admins: clubAdmin,
        certificateLink: req.body.clubCert,
        description: req.body.clubInfo,
        email: req.body.clubEmail,
        name: req.body.clubName,
        requesterID: dummyID,
        status: status,
        positionInClub: req.body.clubPosition,
        addInfo: req.body.clubAddInfo
    };
    // console.log(typeof(req.params.clubName));
    // console.log(req.params.clubName);
    // need to submit netid of use
    // along with empty admin array with netid of requestor in it

    clubCreation.insertOne(CLUB_CREATION_REQUEST);
    console.log("Successfully inserted a club in the clubCreation database")

    // successfully submitted the form
    res.sendStatus(200);
});

export default router;