import { Request, Response, NextFunction } from 'express';
import { body, param, validationResult } from 'express-validator';
import Product from "@src/models/productModel";
import catchAsync from '@src/utils/catchAsync';
import AppError from '@src/utils/appError';
import enums from '@src/enums';

// ------- validator --------
const validate = (validationName:String) => {
  switch(validationName) {
    case 'productDetail':
      return [
        body('title').escape(),
        body('description').escape(),
        body('author').escape(),
        body('image').escape(),
        body('isbn').escape().isISBN().withMessage('isbn'),
        body('listPrice').escape().isNumeric().withMessage('listPrice must be a valid number').isFloat().withMessage('must be a float'),
        body('priceSmall').escape().optional({ nullable: true }).isNumeric().withMessage('priceSmall must be null or a valid number'),
        body('priceMedium').escape().optional({ nullable: true }).isNumeric().withMessage('priceMedium must be null or a valid number'),
        body('priceBig').escape().optional({ nullable: true }).isNumeric().withMessage('priceBig must be null or a valid number'),
        body('category').escape().isMongoId().withMessage('category id is incorrect'),
        body('coverType').escape().isIn(enums.BOOK_COVER_TYPE).withMessage(`coverType must be one of ${enums.BOOK_COVER_TYPE.join(', ')}`),
      ];
    case 'productId':
      return [
        param('id').exists().isMongoId().withMessage('Id is invalid or not provided')
      ]
  };
};

// -------- helpers ----------
const getProductObj = (req: Request) => {
  return {
    title: req.body.title,
    description: req.body.description,
    author: req.body.author,
    image: req.body.image,
    isbn: req.body.isbn,
    listPrice: req.body.listPrice,
    priceSmall: req.body.priceSmall === null ? undefined : req.body.priceSmall,
    priceMedium: req.body.priceMedium === null ? undefined : req.body.priceMedium,
    priceBig: req.body.priceBig === null ? undefined : req.body.priceBig,
    category: req.body.category,
    coverType: req.body.coverType,
  };
};

// ---------- handlers ---------
const createProduct = catchAsync(async (req:Request, res:Response, next:NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return next(new AppError(errors.array()[0].msg, 400))
  
  const product = await Product.create(getProductObj(req));

  res.status(201).json({
    status: 'success',
    data: product
  });
});

const getAllProduct = catchAsync(async (req:Request, res:Response, next:NextFunction) => {
  const product = await Product.find();

  res.status(200).json({
    status: 'success',
    data: product
  });
});

const getOneProduct = catchAsync(async (req:Request, res:Response, next:NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return next(new AppError(errors.array()[0].msg, 400));

  const product = await Product.findById(req.params.id);

  if (!product) return next(new AppError('There is no product with this id', 400))

  res.status(200).json({
    status: 'success',
    data: product
  });
});

const updateOneProduct = catchAsync(async (req:Request, res:Response, next:NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return next(new AppError(errors.array()[0].msg, 400));

  const product = await Product.findByIdAndUpdate(req.params.id, getProductObj(req), {
    new: true,
    runValidators: true,
  });

  if (!product) return next(new AppError('There is no product with this id', 404))

  res.status(200).json({
    status: 'success',
    data: product
  });
});

const deleteProduct = catchAsync(async (req:Request, res:Response, next:NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return next(new AppError(errors.array()[0].msg, 400));

  const product = await Product.findByIdAndDelete(req.params.id)
  if (!product) return next(new AppError('There is no product with this id', 404))

  res.status(204).json({
    status: 'success',
    data: null
  });
});

export default {
  validate,
  createProduct,
  getAllProduct,
  getOneProduct,
  updateOneProduct,
  deleteProduct,
}