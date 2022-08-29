import { Request, Response, NextFunction } from 'express';
import AppError from './appError';

export default (fn:Function) => {
  return (req:Request, res:Response, next:NextFunction) => {
    fn(req, res, next).catch((err:AppError) => next(err));
  }
}