import express from "express";
// Wrong before: controller diekspor default tapi diimport sebagai named, membuat handler undefined.
import { login, register, logout } from "../controllers/authController.js";
import verifyToken from "../middlewares/verifyToken.js";
import { validate } from "../middlewares/validate.js";
import { loginSchema, registerSchema } from "../validations/authValidation.js";

const router = express.Router();

router.post("/login", validate(loginSchema), login);
router.post("/register", validate(registerSchema), register);
router.post("/logout", verifyToken, logout);

export default router;
