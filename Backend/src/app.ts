import express from 'express';
import helmet from 'helmet';
import expressMongoSanitize from 'express-mongo-sanitize';
import AppError from '@src/utils/appError';
import globalErrorHandler from '@src/controllers/errorController';
import categoryRoutes from '@src/routes/categoryRoutes'
import productRoutes from '@src/routes/productRoutes'

const app = express();

app.use(helmet());

app.use(express.json());

app.use(expressMongoSanitize());

app.use('/api/v1/category', categoryRoutes);
app.use('/api/v1/product', productRoutes);
app.use('*', (req, res, next) => { // for unhandle route
  const err = new AppError(`Can't find ${req.originalUrl} on this server`, 400);
  next(err);
});

app.use(globalErrorHandler);

export default app;