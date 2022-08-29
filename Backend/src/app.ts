import express from 'express';
import AppError from './utils/appError';
import globalErrorHandler from './controllers/errorController';
import categoryRoutes from './routes/categoryRoutes'

const app = express();
app.use(express.json());

app.use('/api/v1/category', categoryRoutes);
app.use('*', (req, res, next) => { // for unhandle route
  const err = new AppError(`Can't find ${req.originalUrl} on this server`, 400);
  next(err);
});

app.use(globalErrorHandler);

export default app;