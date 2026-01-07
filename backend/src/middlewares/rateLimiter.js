import rateLimit from "express-rate-limit";

export const globalRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 1000 requests per windowMs (increased for development)
    standardHeaders : true,
    legacyHeaders : false,
    handler : (req, res) => {
        res.status(429).json({
            success: false,
            message: "Too many requests from this IP, please try again after 15 minutes",
        })
    }
});

export const loginRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 15, // limit each IP to 5 login attempts per windowMs
    standardHeaders : true,
    legacyHeaders : false,
    handler : (req, res) => {
        res.status(429).json({
            success: false,
            message: "Too many requests from this IP, please try again after 15 minutes",
        })
    }
});

export const registerRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // limit each IP to 5 register attempts per windowMs
    standardHeaders : true,
    legacyHeaders : false,
    handler : (req, res) => {
        res.status(429).json({
            success: false,
            message: "Too many requests from this IP, please try again after 15 minutes",
        })
    }
});

export const resetPasswordRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // limit each IP to 5 reset password attempts per windowMs
    standardHeaders : true,
    legacyHeaders : false,
    handler : (req, res) => {
        res.status(429).json({
            success: false,
            message: "Too many requests from this IP, please try again after 15 minutes",
        })
    }
});

export const verifyEmailRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // limit each IP to 5 verify email attempts per windowMs
    standardHeaders : true,
    legacyHeaders : false,
    handler : (req, res) => {
        res.status(429).json({
            success: false,
            message: "Too many requests from this IP, please try again after 15 minutes",
        })
    }
});

export const forgotPasswordRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // limit each IP to 5 forgot password attempts per windowMs
    standardHeaders : true,
    legacyHeaders : false,
    handler : (req, res) => {
        res.status(429).json({
            success: false,
            message: "Too many requests from this IP, please try again after 15 minutes",
        })
    }
});

export const changePasswordRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // limit each IP to 5 change password attempts per windowMs
    standardHeaders : true,
    legacyHeaders : false,
    handler : (req, res) => {
        res.status(429).json({
            success: false,
            message: "Too many requests from this IP, please try again after 15 minutes",
        })
    }
});