import conn from "../db/conn.js";
import express from "express";
const router = express.Router();

// Post a club form to club creation collection
router.post("/submit", async (req, res) => {
    console.log("I'm in the clubform endpoint");
    console.log(typeof(req.params.clubName));
    console.log(req.params.clubName);
    // need to submit netid of user
    // along with empty admin array with netid of requestor in it
});

router.get("/submit", async (req, res) => {
  console.log("I'm in the clubform endpoint for getting requests");
});

export default router;