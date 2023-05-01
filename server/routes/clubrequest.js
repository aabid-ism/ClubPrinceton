import conn from "../db/conn.js";
import verifyToken from "../jwt.js";
import express from "express";
const router = express.Router();

// Post a club form to club creation collection
router.post("/submit", async (req, res) => {
    // assign variables to avoid repeated indexing?
    // Promise based error handling?
    // never used next?
    try {
        // is this acceptable?
        // console.log("Type of netid: " + typeof(req.body.applicantNetid));
        if (!req.body.applicantNetid) {
            throw new Error("Unauthorized submission. Please login to continue");
        }
        // most likely below stuff sent as empty strings
        // need to check below 2 if conditions later -> may be sent back as undefined instead of empty strings
        if (req.body.clubName.length === 0 || req.body.clubInfo.length === 0 ||
            req.body.clubEmail.length === 0 || req.body.clubPosition.length === 0) {
                throw new Error("One or more required fields are not filled. Please fill them to continue");
            }
        // regex pattern for validating clubs -> is try/catch fine for async?
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(req.body.clubEmail)) {
            throw new Error("invalid email address. Please follow the correct format.");
        }

        // console.log("past error handling");
        
        const db = conn.getDb();
        const clubCreation = await db.collection("clubCreation");

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
        // need to submit netid of use
        // along with empty admin array with netid of requestor in it

        clubCreation.insertOne(CLUB_CREATION_REQUEST);
        // console.log("Successfully inserted a club in the clubCreation collection");

        // successfully submitted the form
        res.sendStatus(200);
    }
    catch(error) {
        console.log("Error message: " + error.message);
        res.status(401).send(error);
    }
});

export default router;