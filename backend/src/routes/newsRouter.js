import express from "express";  
import { createNews, getAllNews, getNewsById, updateNews, deleteNews } from "../controllers/newsController.js";
import { validate } from "../middlewares/validate.js";
import { createNewsSchema, updateNewsSchema } from "../validations/newsValidation.js";
import verifyToken from "../middlewares/verifyToken.js";
import { uploadNews } from "../config/cloudinary.js";
import { checkRole } from "../middlewares/checkRole.js";

const router = express.Router();

/**
 * @swagger
 * /api/news:
 *   get:
 *     summary: Get All News
 *     tags: [News]
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/news/{id}:
 *   get:
 *     summary: Get News by ID
 *     tags: [News]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/news:
 *   post:
 *     summary: Create News
 *     tags: [News]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/News'
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
 * /api/news/{id}:
 *   put:
 *     summary: Update News by ID
 *     tags: [News]
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
 *             $ref: '#/components/schemas/News'
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
 * /api/news/{id}:
 *   delete:
 *     summary: Delete News by ID
 *     tags: [News]
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

router.get("/", getAllNews);
router.get("/:id", getNewsById);
router.post("/", verifyToken, checkRole(["admin", "staff"]), uploadNews.single("image"), validate(createNewsSchema), createNews);
router.put("/:id", verifyToken, checkRole(["admin", "staff"]), uploadNews.single("image"), validate(updateNewsSchema), updateNews);
router.delete("/:id", verifyToken, checkRole(["admin", "staff"]), deleteNews);

export default router;
