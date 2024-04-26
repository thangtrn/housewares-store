import Category from '~/models/category.model';

class CategoryRepository {
   async getAllCategory() {
      return await Category.find().populate('image');
   }

   async createCategory({ name, image }) {
      const category = await Category.create({ name, image });
      const result = await category.populate('image');
      return result;
   }

   async deleteCategory(_id) {
      return await Category.deleteOne({ _id });
   }
}

export default CategoryRepository;
