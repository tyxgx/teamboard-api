import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs';
import { swaggerUi, swaggerSpec } from './swagger';

dotenv.config();

console.log('✅ JWT_SECRET loaded:', process.env.JWT_SECRET || '[undefined]');

if (fs.existsSync('.env')) {
  console.log('📄 Raw .env contents:\n', fs.readFileSync('.env', 'utf8'));
} else {
  console.log('⚠️ .env file not found – likely running in production.');
}

if (!process.env.JWT_SECRET) {
  console.warn('⚠️ JWT_SECRET is not defined in .env file! Authentication will fail.');
}

import authRoutes from './routes/auth.routes';
import boardRoutes from './routes/board.routes';
import commentRoutes from './routes/comment.routes';

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Health check
app.get('/', (req: Request, res: Response) => {
  res.send('TeamBoard API is running');
});

// ✅ Route registrations
app.use('/api/auth', authRoutes);
app.use('/api/boards', boardRoutes);
app.use('/api/comments', commentRoutes);

// ✅ Swagger API docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// 🛑 Global error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('💥 Server Error:', err.stack);
  res.status(500).json({ message: 'Something broke!' });
});

import userRoutes from './routes/user.routes';
app.use('/api/user', userRoutes); // 👈 ye line add karo

// ✅ Server start moved to server.ts for testing purposes
export default app;
