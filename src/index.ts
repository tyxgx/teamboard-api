import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes";
import boardRoutes from "./routes/board.routes";
import commentRoutes from "./routes/comment.routes";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// 👇 Root route (yahi add karna hai)
app.get("/", (req: Request, res: Response) => {
  res.send("TeamBoard API is running");
});

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/boards", boardRoutes);
app.use("/api/comments", commentRoutes);

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something broke!' });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});