import conn from "../db/conn.js";
import verifyToken from "../jwt.js";
import express from "express";
const router = express.Router();

// Post a club form to club creation collection
router.post("/submit", verifyToken, async (req, res) => {
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

        if (req.body.clubName !== req.body.clubName.trim()) {
            throw new Error("Remove leading and/or trailing whitespace in club name");
        }

        const db = conn.getDb();

        const clubsCollection = await db.collection("clubs");
        const clubFound = await clubsCollection.countDocuments({ name: req.body.clubName }, { limit: 1 });

        if (clubFound) {
            throw new Error("Sorry, club page already exists on ClubPrinceton. If you think there has been an error," +
                "please contact an officer from the club and/or system administrator for ClubPrinceton.");
        }

        // console.log("past error handling");
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
    catch (error) {
        console.log("Error message: " + error.message);
        // this is how we override the message
        res.status(401).send({ message: error.message });
    }
});

// checks to see if the club name is already in the clubs collection of the database
// remove later -> not needed
router.get("/find", verifyToken, async (req, res) => {
    try {
        const db = await conn.getDb();

        const checkDuplicate = { foundDuplicate: clubDuplicate };

        res.send(checkDuplicate).status(200);
    }
    catch (error) {
        console.error("Error in clubrequest/find endpoint: " + JSON.stringify(error));
    }
});

export default router;