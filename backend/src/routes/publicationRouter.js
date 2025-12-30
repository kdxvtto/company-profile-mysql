import express from "express";
import { createPublication, getAllPublications, getPublicationById, updatePublication, deletePublication } from "../controllers/publicationController.js";
import { validate } from "../middlewares/validate.js";
import { createPublicationSchema, updatePublicationSchema } from "../validations/publicationValidation.js";
import verifyToken from "../middlewares/verifyToken.js";
import { uploadPublication } from "../config/cloudinary.js";

const router = express.Router();

router.get("/", getAllPublications);
router.get("/:id", getPublicationById);
router.post("/", verifyToken, uploadPublication.single("file"), validate(createPublicationSchema), createPublication);
router.put("/:id", verifyToken, uploadPublication.single("file"), validate(updatePublicationSchema), updatePublication);
router.delete("/:id", verifyToken, deletePublication);

export default router;

