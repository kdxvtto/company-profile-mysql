import express from "express";
import { submitPPID } from "../controllers/ppidController.js";
import { validate } from "../middlewares/validate.js";
import { ppidSchema } from "../validations/ppidValidation.js";

const router = express.Router();

/**
 * @swagger
 * /api/ppid/submit:
 *   post:
 *     summary: Submit permohonan informasi PPID
 *     tags: [PPID]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [nama, nomorIdentitas, informasiDiminta, tujuan, kontak]
 *             properties:
 *               nama:
 *                 type: string
 *               nomorIdentitas:
 *                 type: string
 *               informasiDiminta:
 *                 type: string
 *               tujuan:
 *                 type: string
 *               kontak:
 *                 type: string
 *     responses:
 *       200:
 *         description: Permohonan berhasil dikirim
 *       422:
 *         description: Validation error
 *       500:
 *         description: Internal Server Error
 */
router.post("/submit", validate(ppidSchema), submitPPID);

export default router;
