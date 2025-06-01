import express from "express";
import {
  createBoard,
  getBoards,
  getBoardById,
} from "../controllers/board.controller";
import { validate } from "../middlewares/validate";
import { boardSchema } from "../validators/board.schema";
import { authenticate } from "../middlewares/auth.middleware";
import { checkRole } from "../middlewares/rbac.middleware";

const router = express.Router();

/**
 * @swagger
 * /api/boards:
 *   post:
 *     summary: Create a new board
 *     tags: [Boards]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: Project Alpha
 *     responses:
 *       201:
 *         description: Board created
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (RBAC)
 */
router.post("/", authenticate, checkRole(["ADMIN"]), validate(boardSchema), createBoard);

/**
 * @swagger
 * /api/boards:
 *   get:
 *     summary: Get all boards (Admin sees all)
 *     tags: [Boards]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of boards
 *         content:
 *           application/json:
 *             example:
 *               - id: 1
 *                 name: Project Alpha
 *                 adminId: abc-123
 *       401:
 *         description: Unauthorized
 */
router.get("/", authenticate, getBoards);

/**
 * @swagger
 * /api/boards/{id}:
 *   get:
 *     summary: Get a specific board with comments
 *     tags: [Boards]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Board UUID
 *     responses:
 *       200:
 *         description: Board with comments
 *         content:
 *           application/json:
 *             example:
 *               id: abc-123
 *               name: Project Alpha
 *               comments:
 *                 - id: cmt-001
 *                   content: Great work!
 *                   visibility: EVERYONE
 *       404:
 *         description: Board not found
 */
router.get("/:id", authenticate, getBoardById);

export default router;