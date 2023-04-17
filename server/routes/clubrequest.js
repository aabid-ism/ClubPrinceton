import conn from "../db/conn.js";
import express from "express";
const router = express.Router();

// Post a club form to club creation collection
router.post("/submit", async (req, res) => {
    console.log("I'm here in the clubrequest/submit endpoint");
    console.log(req.params.Name);
    console.log(typeof(req.params.Name));
    // console.log(typeof(req.params.clubName));
    // console.log(req.params.clubName);
    // need to submit netid of use
    // along with empty admin array with netid of requestor in it

    // successfully submitted the form
    res.sendStatus(200);
});

export default router;