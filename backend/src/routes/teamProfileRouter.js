import express from "express";
import { createTeamProfile, getAllTeamProfiles, updateTeamProfile, deleteTeamProfile } from "../controllers/teamProfileController.js";
import { validate } from "../middlewares/validate.js";
import { createTeamProfileSchema, updateTeamProfileSchema } from "../validations/teamProfileValidation.js";
import verifyToken from "../middlewares/verifyToken.js";
import upload from "../middlewares/upload.js";

const router = express.Router();

router.get("/", getAllTeamProfiles);
router.post("/", verifyToken, upload.single("image"), validate(createTeamProfileSchema), createTeamProfile);
router.put("/:id", verifyToken, upload.single("image"), validate(updateTeamProfileSchema), updateTeamProfile);
router.delete("/:id", verifyToken, deleteTeamProfile);

export default router;