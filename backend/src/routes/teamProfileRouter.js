import express from "express";
import { createTeamProfile, getAllTeamProfiles, updateTeamProfile, deleteTeamProfile } from "../controllers/teamProfileController.js";
import { validate } from "../middlewares/validate.js";
import { createTeamProfileSchema, updateTeamProfileSchema } from "../validations/teamProfileValidation.js";
import verifyToken from "../middlewares/verifyToken.js";
import { uploadTeam } from "../config/cloudinary.js";
import { checkRole } from "../middlewares/checkRole.js";

const router = express.Router();

/**
 * @swagger
 * /api/team-profile:
 *   get:
 *     summary: Get All Team Profiles
 *     tags: [Team Profile]
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/team-profile:
 *   post:
 *     summary: Create Team Profile
 *     tags: [Team Profile]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/Team Profile'
 *     responses:
 *       201:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/team-profile/{id}:
 *   put:
 *     summary: Update Team Profile by ID
 *     tags: [Team Profile]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/Team Profile'
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/team-profile/{id}:
 *   delete:
 *     summary: Delete Team Profile by ID
 *     tags: [Team Profile]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */

router.get("/", getAllTeamProfiles);
router.post("/", verifyToken, checkRole(["admin", "staff"]), uploadTeam.single("image"), validate(createTeamProfileSchema), createTeamProfile);
router.put("/:id", verifyToken, checkRole(["admin", "staff"]), uploadTeam.single("image"), validate(updateTeamProfileSchema), updateTeamProfile);
router.delete("/:id", verifyToken, checkRole(["admin", "staff"]), deleteTeamProfile);

export default router;
