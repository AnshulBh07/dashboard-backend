import express from "express";
import { getAllPosts } from "../controllers/posts";
const router = express.Router();

// all posts related actions
router.get("/", getAllPosts);

router.post("/add_post");

router.post("/add_comment");

export default router;
