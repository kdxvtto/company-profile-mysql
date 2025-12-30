import express from "express";
// Wrong before: controller diekspor default tapi diimport sebagai named, membuat handler undefined.
import { login, register, logout, getProfile, updateProfile, changePassword } from "../controllers/authController.js";
import verifyToken from "../middlewares/verifyToken.js";
import { validate } from "../middlewares/validate.js";
import { loginSchema, registerSchema } from "../validations/authValidation.js";
import { loginRateLimiter, registerRateLimiter } from "../middlewares/rateLimiter.js";

const router = express.Router();

router.post("/login", loginRateLimiter, validate(loginSchema), login);
router.post("/register", registerRateLimiter, validate(registerSchema), register);
router.post("/logout", verifyToken, logout);
router.get("/profile", verifyToken, getProfile);
router.put("/profile", verifyToken, updateProfile);
router.put("/change-password", verifyToken, changePassword);

export default router;
