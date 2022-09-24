import mongoose from 'mongoose';
import { Request, Response, NextFunction } from 'express';
import AppError from '@src/utils/appError';

const handleCastError = (err:mongoose.Error.CastError) => {
  return new AppError(`id ${err.value} is invalid`, 400);
}

const handleValidationError = (err:mongoose.Error.ValidationError) => {
  return new AppError(err.message, 400)
}

const sendErrorDev = (err:AppError, res:Response) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack
  });
}

const sendErrorProd = (err:AppError, res:Response) => {
  // operational, trusted error: send message to client
  if (err.isOperationalError) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  // programming or other unknown error: don't leak error details
  } else {
    // log the error
    console.error('error', err)

    // send the a generic message to the client
    res.status(500).json({
      status: 'error',
      message: 'Something went worng! please contact the developer'
    });
  }
}

const globalErrorHandler = (err:any, req:Request, res:Response, next:NextFunction) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = err;

    if (err.name === 'CastError') error = handleCastError(err)
    if (err.name === 'ValidationError') error = handleValidationError(err)
    sendErrorProd(error, res);
  }
}

export default globalErrorHandler;