import productController from "@src/controllers/productController";
import { Router } from "express";

const router = Router();

router.route('/')
  .get(productController.getAllProduct)
  .post(productController.validate('productDetail'), productController.createProduct);

router.route('/:id')
  .get(productController.validate('productId'), productController.getOneProduct)
  .put(productController.validate('productId'), productController.validate('productDetail'), productController.updateOneProduct)
  .delete(productController.validate('productId'), productController.deleteProduct);

export default router;