import express from "express";
import { findUser, insertUser } from "../controllers/signupControllers";
const router = express.Router();

router.get("/find_user", findUser);

router.post("/", insertUser);

export default router;
