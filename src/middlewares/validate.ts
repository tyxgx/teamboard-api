import { Request, Response, NextFunction } from "express";
import { ZodTypeAny } from "zod";

export const validate = (schema: ZodTypeAny) =>
  (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      res.status(400).json({ error: result.error.errors });
      return;
    }

    next(); // ✅ only move forward if valid
  };