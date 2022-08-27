const mongoose = require('mongoose')

const categorySchema = mongoose.Schema({
  name: {
    type: String,
    require: [true, 'A category must have a name'],
    unique: true,
  }
});

const Category = mongoose.model('category', categorySchema);

module.exports = Category;