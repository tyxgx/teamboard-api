import express, { Request, Response, NextFunction } from "express"; // ✅ added express type imports
import cors from "cors";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

console.log("✅ JWT_SECRET loaded:", process.env.JWT_SECRET || "[undefined]");
console.log("📄 Raw .env contents:\n", fs.readFileSync(".env", "utf8"));

if (!process.env.JWT_SECRET) {
  console.warn("⚠️ JWT_SECRET is not defined in .env file! Authentication will fail.");
}

import authRoutes from "./routes/auth.routes";
import boardRoutes from "./routes/board.routes";
import commentRoutes from "./routes/comment.routes";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("TeamBoard API is running");
});

app.use("/api/auth", authRoutes);
app.use("/api/boards", boardRoutes);
app.use("/api/comments", commentRoutes);

// 🛑 Error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error("💥 Server Error:", err.stack);
  res.status(500).json({ message: "Something broke!" });
});

// ✅ MOVED this into a separate file like server.ts for tests
// const PORT = process.env.PORT || 5001;
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on http://localhost:${PORT}`);
// });

export default app; // ✅ Needed for Supertest