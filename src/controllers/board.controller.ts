import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createBoard = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const board = await prisma.board.create({
      data: {
        name,
        adminId: req.user.id,
      },
    });

    res.status(201).json(board);
  } catch (error) {
    res.status(500).json({ message: "Error creating board" });
  }
};

export const getBoards = async (req: Request, res: Response) => {
  try {
    // Admins can see all boards, members can only see boards they've commented on
    let boards;
    if (req.user.role === "ADMIN") {
      boards = await prisma.board.findMany();
    } else {
      boards = await prisma.board.findMany({
        where: {
          comments: {
            some: {
              createdById: req.user.id,
            },
          },
        },
      });
    }

    res.json(boards);
  } catch (error) {
    res.status(500).json({ message: "Error fetching boards" });
  }
};

export const getBoardById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const board = await prisma.board.findUnique({
      where: { id },
      include: {
        comments: {
          where: {
            OR: [
              { visibility: "EVERYONE" },
              {
                AND: [
                  { visibility: "ADMIN_ONLY" },
                  { board: { adminId: req.user.id } },
                ],
              },
              { createdById: req.user.id },
            ],
          },
          include: {
            createdBy: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
      },
    });

    if (!board) {
      res.status(404).json({ message: "Board not found" });
      return;
    }

    res.json(board);
  } catch (error) {
    res.status(500).json({ message: "Error fetching board" });
  }
};