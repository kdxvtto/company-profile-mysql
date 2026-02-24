import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { parseId } from "../utils/parseId.js";
import { isBlacklisted } from "../utils/blacklistToken.js";

const verifyToken = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    try {
        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            return res.status(500).json({
                success: false,
                message: "JWT secret is not set (JWT_SECRET env missing)",
            });
        }
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        if (isBlacklisted(token)) {
            return res.status(401).json({ message: "Token has been revoked" });
        }

        const decoded = jwt.verify(token, jwtSecret);
        const userId = parseId(decoded?.id);
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const user = await User.getByIdForAuth(userId);
        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        if (user.lastLogoutAt && decoded?.iat) {
            const issuedAtMs = decoded.iat * 1000;
            const lastLogoutMs = new Date(user.lastLogoutAt).getTime();
            if (Number.isFinite(lastLogoutMs) && issuedAtMs < lastLogoutMs) {
                return res.status(401).json({ message: "Token has been revoked" });
            }
        }

        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: "Unauthorized" });
    }
};

export default verifyToken;
