import express from "express";
import { loginUser } from "../controllers/loginContrllers";
const router = express.Router();

router.post("/", loginUser);

export default router;
