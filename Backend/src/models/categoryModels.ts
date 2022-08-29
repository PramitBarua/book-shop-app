import {Schema, model} from 'mongoose';

interface ICategory  {
  name: string
}
const categorySchema = new Schema<ICategory>({
  name: {
    type: String,
    require: [true, 'A category must have a name'],
    unique: true,
  }
});

const Category = model('category', categorySchema);

export default Category;