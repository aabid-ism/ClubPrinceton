import jwt from 'jsonwebtoken';


const secret = process.env.JWT_SECRET; // replace with your own secret key

const verifyToken = async (req, res, next) => {
    const bearerHeader = req.headers["authorization"];

    if (typeof bearerHeader !== "undefined") {

        // get the token from frontend headers
        const bearerToken = bearerHeader.split(" ")[1];
        // console.log(`token found: ${bearerToken}`);

        if (bearerToken == "null") {
            console.log("token is null!")
        }
        // verify the token and get the user
        await jwt.verify(bearerToken, secret, (err, decoded) => {
            if (err) {
                console.log(`ERROR verifying JWT token, ${bearerToken}: ${err.message}`);
                if (err.name == 'TokenExpiredError') {
                    console.log("Token Expired bro");
                    res.status(403);
                    return res.send(err.name);
                    return res.sendStatus(403);
                }
                return res.sendStatus(403);
            }
            if (!decoded) {
                console.log(`Invalid JWT token: decoded value is undefined or null`);
                return res.sendStatus(403);
            }
            // console.log(`JWT token successfully verified. Decoded payload: ${JSON.stringify(decoded)}`);
            req.email = decoded.email;
            next();
        });
    }
    else {
        res.status(404).send("jwt is undefined!");
    }
}

export default verifyToken;