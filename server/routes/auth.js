import express from 'express';
import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";
import conn from '../db/conn.js';
const router = express.Router();
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const client = new OAuth2Client(GOOGLE_CLIENT_ID);

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
            console.log("here is the profile: ");
            console.log(profile);
            // add user profile to users database
            const db = conn.getDb();
            const users_collection = db.collection("users");

            // TODO: send the entire profile or parts of the object we want
            const result = await users_collection.insertOne(profile);
            console.log(result);

            res.status(201).json({
                message: "Signup was successful",
                user: {
                    firstName: profile?.given_name,
                    lastName: profile?.family_name,
                    picture: profile?.picture,
                    email: profile?.email,
                    token: jwt.sign({ email: profile?.email }, process.env.JWT_SECRET, {
                        expiresIn: "1d",
                    }),
                },
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "An error occurred. Registration failed.",
        });
    }
});

export default router;