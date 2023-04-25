import("../loadEnvironment.js");
import express from 'express';
import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";
import conn from '../db/conn.js';
const router = express.Router();
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const client = new OAuth2Client(GOOGLE_CLIENT_ID);
import verifyToken from '../jwt.js';
// verify a client's uploaded token
async function verifyGoogleToken(token) {
    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: GOOGLE_CLIENT_ID,
        });
        return { payload: ticket.getPayload() };
    } catch (error) {
        return { error: "Invalid user detected. Please try again" };
    }
}


// post route
router.post("/signup", async (req, res) => {
    // getting secret from env variables
    const secret = process.env.JWT_SECRET || "huththak";
    console.log(secret);
    try {
        // console.log({ verified: verifyGoogleToken(req.body.credential) });
        if (req.body.credential) {
            // verify the google token using our google client
            const verificationResponse = await verifyGoogleToken(req.body.credential);

            if (verificationResponse.error) {
                return res.status(400).json({
                    message: verificationResponse.error,
                });
            }

            // obtained user google profile
            const profile = verificationResponse?.payload;
            const domain = profile.hd;

            if (domain == undefined) {
                return res.status(400).json({
                    message: "Please use a valid Princeton email address.",
                });
            }
            // add user profile to users database
            const db = conn.getDb();
            const users_collection = db.collection("users");

            // If user already exists, send the reference to that
            const query = { email: profile.email };
            let result = await users_collection.findOne(query);

            // console.log(result);
            if (result == null || undefined) {
                // If the user does not exist, register it

                // add an ampty admin_clubs field to new user
                profile.admin_clubs = [];
                const parts = profile?.email.split("@");

                // add a netid field for each new user
                profile.netid = parts[0];

                // insert new user to the users collection
                result = await users_collection.insertOne(profile);
            }

            const token = jwt.sign({ user: profile?.email }, secret, {
                expiresIn: "1d",
            });
            console.log(`token is: ${token}`);
            res.status(201).json({
                message: "Signup was successful",
                user: {
                    firstName: profile?.given_name,
                    lastName: profile?.family_name,
                    picture: profile?.picture,
                    email: profile?.email,
                    token: token,
                },
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "An error occurred. Registration failed.",
        });
    }
});


router.get("/verify", (req, res) => {
    console.log("everything ok boss!");
    return res.status(200);
})

export default router;