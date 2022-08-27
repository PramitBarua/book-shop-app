const catchAsync = require('./../utils/catchAsync');
const Category = require('./../models/categoryModels');

exports.getAllCategory = catchAsync(async (req, res, next) => {
  const category = await Category.find();
  res.status(200).json({
    status: 'success',
    data: category
  });
});

exports.createCategory = catchAsync(async (req, res, next) => {
  const category = await Category.create({
    name: req.body.name,
    order: req.body.order,
  });
  res.status(200).json({
    status: 'success',
    data: category
  });
});

exports.deleteCategory = catchAsync(async (req, res, next) => {
  const category = await Category.findByIdAndDelete(req.body.id)
  res.status(204).json({
    status: 'success',
    data: null
  });
});