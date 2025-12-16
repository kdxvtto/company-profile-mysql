import jwt from "jsonwebtoken";
import { isBlacklisted } from "../utils/blacklistToken.js";

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    try {
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        if (isBlacklisted(token)) {
            return res.status(401).json({ message: "Token has been revoked" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: "Unauthorized" });
    }
};

export default verifyToken;
