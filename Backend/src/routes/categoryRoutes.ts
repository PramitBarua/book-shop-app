import express from 'express'
import categoryControllers from './../controllers/categoryControllers';

const router = express.Router();

router.route('/')
  .get(categoryControllers.getAllCategory)
  .post(categoryControllers.createCategory)
  .delete(categoryControllers.deleteCategory);

export default router;
