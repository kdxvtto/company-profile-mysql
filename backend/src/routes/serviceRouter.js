import express from "express";
import  {createService, getAllServices, getServiceById, updateService, deleteService} from "../controllers/serviceController.js";
import { validate } from "../middlewares/validate.js";
import { createServicesSchema, updateServicesSchema } from "../validations/serviceValidation.js";
import verifyToken from "../middlewares/verifyToken.js";
import { uploadService } from "../config/cloudinary.js";
import { checkRole } from "../middlewares/checkRole.js";

const router = express.Router();

/**
 * @swagger
 * /api/service:
 *   get:
 *     summary: Get All Services
 *     tags: [Service]
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/service/{id}:
 *   get:
 *     summary: Get Service by ID
 *     tags: [Service]
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
 * /api/service:
 *   post:
 *     summary: Create Service
 *     tags: [Service]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/Service'
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
 * /api/service/{id}:
 *   put:
 *     summary: Update Service by ID
 *     tags: [Service]
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
 *             $ref: '#/components/schemas/Service'
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
 * /api/service/{id}:
 *   delete:
 *     summary: Delete Service by ID
 *     tags: [Service]
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

router.get("/", getAllServices);
router.get("/:id", getServiceById);
router.post("/", verifyToken, checkRole(["admin", "staff"]), uploadService.single("image"), validate(createServicesSchema), createService);
router.put("/:id", verifyToken, checkRole(["admin", "staff"]), uploadService.single("image"), validate(updateServicesSchema), updateService);
router.delete("/:id", verifyToken, checkRole(["admin", "staff"]), deleteService);

export default router;
