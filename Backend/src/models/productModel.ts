import { Schema, Types, model } from "mongoose";
import ENUM from '@src/enums';


const ProductSchema = new Schema({
  title: {
    type: String,
    required: [true, 'A book must have a title'],
  },
  description:  {
    type: String,
  },
  author: {
    type: String,
    required: [true, 'A book must have an author'],
  },
  image:{
    type: String,
  },
  isbn: {
    type: String,
    required: [true, 'A book must have a ISBN'],
  },
  listPrice: {
    type: Number,
    min: 0,
    required: [true, 'A book must have a price'],
  },
  priceSmall: {
    type: Number,
    min: 0,
    default: function(){
      return this.priceSmall || this.listPrice;
    },
  },
  priceMedium: {
    type: Number,
    min: 0,
    default: function(){
      return this.priceMedium || this.listPrice;
    },
  },
  priceBig: {
    type: Number,
    min: 0,
    default: function(){
      return this.priceBig || this.listPrice;
    },
  },
  category: {
    type: Types.ObjectId,
    ref: 'Category',
  },
  coverType: {
    type: String,
    enum: ENUM.BOOK_COVER_TYPE,
  }
});

const Product = model('Product', ProductSchema);

export default Product;
