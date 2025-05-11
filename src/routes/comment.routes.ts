import express from "express";
import {
  createComment,
  getComments,
} from "../controllers/comment.controller";
import { authenticate } from "../middlewares/auth.middleware";

const router = express.Router();

router.post("/", authenticate, createComment);
router.get("/:boardId", authenticate, getComments);

export default router;