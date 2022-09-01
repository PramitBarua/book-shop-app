import { Request, Response, NextFunction } from 'express';
import catchAsync from '@src/utils/catchAsync';
import Category from '@src/models/categoryModels';

const getAllCategory = catchAsync(async (req:Request, res:Response, next:NextFunction) => {
  const category = await Category.find();
  res.status(200).json({
    status: 'success',
    data: category
  });
});

const createCategory = catchAsync(async (req:Request, res:Response, next:NextFunction) => {
  const category = await Category.create({
    name: req.body.name,
    order: req.body.order,
  });
  res.status(200).json({
    status: 'success',
    data: category
  });
});

const deleteCategory = catchAsync(async (req:Request, res:Response, next:NextFunction) => {
  await Category.findByIdAndDelete(req.body.id)
  res.status(204).json({
    status: 'success',
    data: null
  });
});

export default {
  getAllCategory,
  createCategory,
  deleteCategory,
}