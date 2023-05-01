import jwt from 'jsonwebtoken';


const REFRESH_SECRET = process.env.REFRESH_TOKEN; // replace with your own secret key
const ACCESS_SECRET = process.env.ACCESS_TOKEN;


const getNewAccessToken = async (req, res, next) => {

    // Get Refresh Token
    REFRESH_TOKEN = req.cookies.refresh_token;
    // Verify the token
    jwt.verify(REFRESH_TOKEN, REFRESH_SECRET, (err, decoded) => {
        if (err) {
            console.log(`ERROR verifying JWT token: ${err.message}`);
            return res.sendStatus(403);
        }
        if (!decoded) {
            console.log(`Invalid JWT token: decoded value is undefined or null`);
            return res.sendStatus(403);
        }
        // get a new access token
        let new_access_token = jwt.sign(req.body.email, ACCESS_SECRET, {
            expiresIn: "15m",
        });

        // return the new Access Token
        return new_access_token
    });
}

export default getNewAccessToken;