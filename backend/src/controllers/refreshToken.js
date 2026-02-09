import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { generateAccessToken } from "../utils/generateToken.js";

export const refreshToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            return res.status(401).json({
                success: false,
                message: "Refresh token is required",
            });
        }
        const refreshSecret = process.env.JWT_REFRESH_SECRET;
        if (!refreshSecret) {
            return res.status(500).json({
                success: false,
                message: "JWT refresh secret is not set (JWT_REFRESH_SECRET env missing)",
            });
        }

        const user = await User.findByRefreshToken(refreshToken);
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found",
            });
        }
        const decoded = jwt.verify(refreshToken, refreshSecret);
        const decodedId = Number.parseInt(String(decoded?.id), 10);
        if (!Number.isFinite(decodedId) || decodedId !== user._id) {
            return res.status(401).json({
                success: false,
                message: "Invalid refresh token",
            });
        }

        const newAccessToken = generateAccessToken({
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        });
        return res.status(200).json({
            success: true,
            data: {
                accessToken: newAccessToken,
            },
        });
    } catch (error) {
        if (error?.name === "JsonWebTokenError" || error?.name === "TokenExpiredError") {
            return res.status(401).json({
                success: false,
                message: "Invalid refresh token",
            });
        }
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}
