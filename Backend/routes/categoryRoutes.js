const express = require('express');
const categoryControllers = require('./../controllers/categoryControllers')

const router = express.Router();

router.route('/').get(categoryControllers.getAllCategory).post(categoryControllers.createCategory).delete(categoryControllers.deleteCategory);

module.exports = router;