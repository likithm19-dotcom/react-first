const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {

    console.log("Middleware Executed");

    const authHeader = req.headers.authorization;

    console.log("Authorization Header:", authHeader);

    if (!authHeader) {
        console.log("No Token Found");

        return res.status(401).json({
            message: "Access Denied"
        });
    }

    const token = authHeader.split(" ")[1];

    console.log("Token:", token);

    const secret = process.env.JWT_SECRET || "restaurant_secret_key";

    try {
        const decoded = jwt.verify(token, secret);

        console.log("Decoded User:", decoded);

        req.user = decoded;

        next();
    } catch (err) {
        console.log("Invalid Token", err.message);

        return res.status(401).json({
            message: "Invalid Token"
        });
    }

};

module.exports = authMiddleware;