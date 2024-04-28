import Category from '~/models/category.model';
import filterUndefinedOrNullFields from '~/utils/filterUndefineOrNull';
import { NotFoundException } from '~/utils/response';

class CategoryRepository {
   async getAllCategory() {
      return await Category.find()?.populate('image');
   }

   async createCategory({ name, image }) {
      const category = await Category.create(filterUndefinedOrNullFields({ name, image }));
      const result = await category?.populate('image');
      return result;
   }

   async updateCategory({ _id, name, image }) {
      const updateFields = filterUndefinedOrNullFields({ name, image });
      const category = await Category.findByIdAndUpdate(_id, updateFields, { new: true });
      if (!category) {
         throw new NotFoundException('Not found category with _id: ' + _id);
      }
      const result = await category?.populate('image');
      return result;
   }

   async deleteCategory(_id) {
      return await Category.deleteOne({ _id });
   }
}

export default CategoryRepository;
