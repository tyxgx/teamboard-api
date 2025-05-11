import express from "express";
import {
  createBoard,
  getBoards,
  getBoardById,
} from "../controllers/board.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { checkRole } from "../middlewares/rbac.middleware";

const router = express.Router();

router.post("/", authenticate, checkRole(["ADMIN"]), createBoard);
router.get("/", authenticate, getBoards);
router.get("/:id", authenticate, getBoardById);

export default router;
