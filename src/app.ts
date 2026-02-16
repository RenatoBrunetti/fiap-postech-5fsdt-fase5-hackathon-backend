import 'reflect-metadata';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import helmet from 'helmet';

// Routes Imports
import authRoutes from './http/controllers/auth/auth.routes.js';
import classRoutes from './http/controllers/class/class.routes.js';
import classUserRoutes from './http/controllers/classUser/classUser.routes.js';
import feedbackRoutes from './http/controllers/feedback/feedback.routes.js';
import gradeRoutes from './http/controllers/grade/grade.routes.js';
import roleRoutes from './http/controllers/role/role.routes.js';
import schoolRoutes from './http/controllers/school/school.routes.js';
import userRoutes from './http/controllers/user/user.routes.js';

// Middlewares
import { errorHandler } from './http/middlewares/errorHandler.middleware.js';

const app: Application = express();

// Middlewares
app.use(helmet());
app.use(cors({ origin: '*', credentials: true }));
app.use(express.json());
app.use(cookieParser());

// Routes
app.get('/status', (req: Request, res: Response) => {
  res.json({ message: 'API is running' });
});
app.use('/auth', authRoutes);
app.use('/classes', classRoutes);
app.use('/classUsers', classUserRoutes);
app.use('/feedbacks', feedbackRoutes);
app.use('/grades', gradeRoutes);
app.use('/roles', roleRoutes);
app.use('/schools', schoolRoutes);
app.use('/users', userRoutes);

// Error Handler (Should be the last middleware)
app.use(errorHandler);

export default app;
