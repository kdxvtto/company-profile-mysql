import express from "express";
import { getActivityLogs } from "../controllers/activityLogController.js";
import verifyToken from "../middlewares/verifyToken.js";
import { checkRole } from "../middlewares/checkRole.js";

const router = express.Router();
/**
 * @swagger
 * /api/activity:
 *   get:
 *     summary: Get Activity Logs
 *     tags: [Activity]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */

// Get recent activity logs (protected, admin only)
router.get("/", verifyToken, checkRole("admin"), getActivityLogs);

export default router;

