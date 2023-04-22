import jwt from 'jsonwebtoken';


const secret = process.env.JWT_SECRET; // replace with your own secret key

const verifyToken = async (req, res, next) => {
    const bearerHeader = req.headers["authorization"];

    if (typeof bearerHeader !== "undefined") {
        const bearerToken = bearerHeader.split(" ")[1];
        console.log(`token found: ${bearerToken}`);

        if (bearerToken == "null") {
            console.log("token is null!")
            return res.redirect(401, '/signup');
        }
        // verify the token and get the user
        jwt.verify(bearerToken, secret, (err, decoded) => {
            if (err) {
                console.log(`ERROR verifying JWT token: ${err.message}`);
                return res.sendStatus(403);
            }
            if (!decoded) {
                console.log(`Invalid JWT token: decoded value is undefined or null`);
                return res.sendStatus(403);
            }
            console.log(`JWT token successfully verified. Decoded payload: ${JSON.stringify(decoded)}`);
            req.email = decoded.email;
            next();
        });
    }
    else {
        res.status(404).send("jwt undefined!");
    }
}


export default verifyToken;