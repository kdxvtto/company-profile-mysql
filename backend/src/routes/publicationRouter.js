import express from "express";
import { createPublication, getAllPublications, getPublicationById, updatePublication, deletePublication } from "../controllers/publicationController.js";
import { validate } from "../middlewares/validate.js";
import { createPublicationSchema, updatePublicationSchema } from "../validations/publicationValidation.js";
import verifyToken from "../middlewares/verifyToken.js";
import { uploadPublication } from "../config/cloudinary.js";
import { checkRole } from "../middlewares/checkRole.js";

const router = express.Router();

/**
 * @swagger
 * /api/publication:
 *   get:
 *     summary: Get All Publications
 *     tags: [Publication]
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/publication/{id}:
 *   get:
 *     summary: Get Publication by ID
 *     tags: [Publication]
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
 * /api/publication:
 *   post:
 *     summary: Create Publication
 *     tags: [Publication]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/Publication'
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
 * /api/publication/{id}:
 *   put:
 *     summary: Update Publication by ID
 *     tags: [Publication]
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
 *             $ref: '#/components/schemas/Publication'
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
 * /api/publication/{id}:
 *   delete:
 *     summary: Delete Publication by ID
 *     tags: [Publication]
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

router.get("/", getAllPublications);
router.get("/:id", getPublicationById);
router.post("/", verifyToken, checkRole(["admin", "staff"]), uploadPublication.single("file"), validate(createPublicationSchema), createPublication);
router.put("/:id", verifyToken, checkRole(["admin", "staff"]), uploadPublication.single("file"), validate(updatePublicationSchema), updatePublication);
router.delete("/:id", verifyToken, checkRole(["admin", "staff"]), deletePublication);

export default router;
