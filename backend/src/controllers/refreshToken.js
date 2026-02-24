import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { generateAccessToken, generateRefreshToken } from "../utils/generateToken.js";
import { parseId } from "../utils/parseId.js";
import { hashToken } from "../utils/hashToken.js";

const getRefreshCookieOptions = () => ({
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
});

const getRefreshCookieOptionsWithMaxAge = () => ({
    ...getRefreshCookieOptions(),
    maxAge: 7 * 24 * 60 * 60 * 1000,
});

export const refreshToken = async (req, res) => {
    try {
        const refreshSecret = process.env.JWT_REFRESH_SECRET;
        if (!refreshSecret) {
            return res.status(500).json({
                success: false,
                message: "JWT refresh secret is not set (JWT_REFRESH_SECRET env missing)",
            });
        }
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            return res.status(401).json({
                success: false,
                message: "Refresh token is required",
            });
        }

        const decoded = jwt.verify(refreshToken, refreshSecret);
        const userId = parseId(decoded?.id);
        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Invalid refresh token",
            });
        }

        const user = await User.getByIdWithRefreshTokenHash(userId);
        if (!user || !user.refreshTokenHash) {
            return res.status(401).json({
                success: false,
                message: "User not found",
            });
        }

        const refreshTokenHash = hashToken(refreshToken);
        if (refreshTokenHash !== user.refreshTokenHash) {
            return res.status(401).json({
                success: false,
                message: "Invalid refresh token",
            });
        }

        if (user.lastLogoutAt && decoded?.iat) {
            const issuedAtMs = decoded.iat * 1000;
            const lastLogoutMs = new Date(user.lastLogoutAt).getTime();
            if (Number.isFinite(lastLogoutMs) && issuedAtMs < lastLogoutMs) {
                return res.status(401).json({
                    success: false,
                    message: "Invalid refresh token",
                });
            }
        }

        const newAccessToken = generateAccessToken({
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        });

        const newRefreshToken = generateRefreshToken({
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        });
        const newRefreshTokenHash = hashToken(newRefreshToken);
        await User.updateRefreshTokenHash(user._id, newRefreshTokenHash);
        await User.setLastRefreshAt(user._id);

        res.cookie("refreshToken", newRefreshToken, getRefreshCookieOptionsWithMaxAge());
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
