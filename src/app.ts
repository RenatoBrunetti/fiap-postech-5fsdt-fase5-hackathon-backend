import 'reflect-metadata';
import cors from 'cors';
import express, { Application, Request, Response } from 'express';

// Routes Imports
import authRoutes from './http/controllers/auth/auth.routes.js';
import gradeRoutes from './http/controllers/grade/grade.routes.js';
import roleRoutes from './http/controllers/role/role.routes.js';
import schoolRoutes from './http/controllers/school/school.routes.js';
import userRoutes from './http/controllers/user/user.routes.js';

// Middlewares
import { errorHandler } from './http/middlewares/errorHandler.middleware.js';

const app: Application = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.get('/status', (req: Request, res: Response) => {
  res.send('ok!');
});
app.use('/auth', authRoutes);
app.use('/grades', gradeRoutes);
app.use('/roles', roleRoutes);
app.use('/schools', schoolRoutes);
app.use('/users', userRoutes);

// Error Handler (Should be the last middleware)
app.use(errorHandler);

export default app;
