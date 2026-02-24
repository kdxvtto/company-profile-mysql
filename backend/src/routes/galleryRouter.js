import express from "express";
import { createGallerySchema, updateGallerySchema } from "../validations/galleryValidation.js";
import { createGallery, deleteGallery, getGallery, updateGallery } from "../controllers/galleryController.js";
import { validate } from "../middlewares/validate.js";
import { uploadGallery } from "../config/cloudinary.js";
import verifyToken from "../middlewares/verifyToken.js";
import { checkRole } from "../middlewares/checkRole.js";

const router = express.Router();
/**
 * @swagger
 * /api/gallery:
 *   post:
 *     summary: Create Gallery
 *     tags: [Gallery]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/Gallery'
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
 * /api/gallery:
 *   get:
 *     summary: Get Gallery
 *     tags: [Gallery]
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/gallery/{id}:
 *   put:
 *     summary: Update Gallery
 *     tags: [Gallery]
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
 *             $ref: '#/components/schemas/Gallery'
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
 * /api/gallery/{id}:
 *   delete:
 *     summary: Delete Gallery
 *     tags: [Gallery]
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

router.post("/", verifyToken, checkRole(["admin", "staff"]), uploadGallery.single("image"), validate(createGallerySchema), createGallery);
router.get("/", getGallery);
router.put("/:id", verifyToken, checkRole(["admin", "staff"]), uploadGallery.single("image"), validate(updateGallerySchema), updateGallery);
router.delete("/:id", verifyToken, checkRole(["admin", "staff"]), deleteGallery);

export default router;  
