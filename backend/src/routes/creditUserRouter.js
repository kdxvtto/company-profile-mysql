import express from "express"; 
import { createCreditUser, getAllCreditUsers, getCreditUserById, updateCreditUser, deleteCreditUser } from "../controllers/creditUser.js";
import { validate } from "../middlewares/validate.js";
import { createCreditUserSchema, updateCreditUserSchema } from "../validations/creditUserValidation.js";
import verifyToken from "../middlewares/verifyToken.js";

const router = express.Router();

router.get("/", verifyToken, getAllCreditUsers);
router.get("/:id", verifyToken, getCreditUserById);
router.post("/", verifyToken, validate(createCreditUserSchema), createCreditUser);
router.put("/:id", verifyToken, validate(updateCreditUserSchema), updateCreditUser);
router.delete("/:id", verifyToken, deleteCreditUser);

export default router;
