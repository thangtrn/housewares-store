import Category from '~/models/category.model';

class CategoryRepository {
   category = Category;

   getAllCategory() {
      this.category.find();
   }
}

export default CategoryRepository;
