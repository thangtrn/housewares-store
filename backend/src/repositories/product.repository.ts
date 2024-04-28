import Product from '~/models/product.model';
import filterUndefinedOrNullFields from '~/utils/filterUndefineOrNull';
import { NotFoundException } from '~/utils/response';

class ProductRepository {
   async getAllProduct() {
      const products = await Product.find({});
      return products;
   }

   async createProduct({ name, images, category, price, quantity, detail, description }) {
      const product = await Product.create(
         filterUndefinedOrNullFields({
            name,
            images: images.map((item) => item?._id),
            category,
            price,
            quantity,
            detail,
            description
         })
      );
      const result = await Product.findById(product?._id)
         ?.populate({
            path: 'images',
            model: 'Image'
         })
         ?.populate({
            path: 'category',
            model: 'Category',
            populate: {
               path: 'image',
               model: 'Image'
            }
         });
      return result;
   }

   async updateProduct({ _id, name, images, category, price, quantity, detail, description }) {
      const product = await Product.findByIdAndUpdate(
         _id,
         filterUndefinedOrNullFields({
            name,
            images: images.map((item) => item?._id),
            category,
            price,
            quantity,
            detail,
            description
         })
      );
      if (!product) {
         throw new NotFoundException('Not found product with _id: ' + _id);
      }
      const result = await Product.findById(product?._id)
         ?.populate({
            path: 'images',
            model: 'Image'
         })
         ?.populate({
            path: 'category',
            model: 'Category',
            populate: {
               path: 'image',
               model: 'Image'
            }
         });
      return result;
   }

   async deleteProduct(_id) {
      return await Product.deleteOne({ _id });
   }
}

export default ProductRepository;
