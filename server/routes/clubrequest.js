import conn from "../db/conn.js";
import verifyToken from "../jwt.js";
import express from "express";
const router = express.Router();

// Post a club form to club creation collection
router.post("/submit", async (req, res) => {
    const db = conn.getDb();
    const clubCreation = await db.collection("clubCreation");
    // console.log("I'm here in the clubrequest/submit endpoint");
    // console.log('new change');
    // console.log(req.body.clubName);
    // console.log(typeof(req.body.clubName));

    // testing local storage data
    // console.log("Netid of club applicant: " + req.body.applicantNetid);
    // console.log("Club Applicant's name: " + req.body.applicantName);

    // fields to be inserted as a club creation document
    // // need to subsitute with actual user id
    const status = "pending";
    let clubAdmin = [req.body.applicantNetid];
    // // clubEmail, clubPosition, clubCert, clubAddInfo
    // // admin array with dummy netid, dummy netid email addr, pending status
    const CLUB_CREATION_REQUEST = {
        admins: clubAdmin,
        certificateLink: req.body.clubCert,
        description: req.body.clubInfo,
        email: req.body.clubEmail,
        name: req.body.clubName,
        requesterID: req.body.applicantNetid,
        applicantName: req.body.applicantName,
        status: status,
        positionInClub: req.body.clubPosition,
        addInfo: req.body.clubAddInfo
    };
    // console.log(typeof(req.params.clubName));
    // console.log(req.params.clubName);
    // need to submit netid of use
    // along with empty admin array with netid of requestor in it

    clubCreation.insertOne(CLUB_CREATION_REQUEST);
    console.log("Successfully inserted a club in the clubCreation collection");

    // successfully submitted the form
    res.sendStatus(200);
});

export default router;