import conn from "../db/conn.js";
import verifyToken from "../jwt.js";
import express from "express";

const router = express.Router();

router.get("/verify/:netid", async (req, res) => {
    // connection and get collection
    const db = conn.getDb();
    const usersCollection = await db.collection("users");

    // get the user
    const netid = req.params.netid;

    // create a query to check the existence of a user
    const query = { netid: netid };

    // find a user that matches the user received from params
    const result = await usersCollection.findOne(query);

    // check whether the result is not empty
    if (result) {
        res.send("User exists").status(200);
    }
    else {
        res.sendStatus(401);
    }
});
export default router;