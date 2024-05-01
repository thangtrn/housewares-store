import Product from '~/models/product.model';
import filterUndefinedOrNullFields from '~/utils/filterUndefineOrNull';
import { BadRequestException, NotFoundException } from '~/utils/response';

class ProductRepository {
   async getAllProduct({ page, limit, filter }) {
      const filterEl = {
         name: {
            $regex: `.*${filter}.*`,
            $options: 'i'
         }
      };

      const result = await Product.find({})
         .sort('createdAt')
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
         })
         ?.skip((page - 1) * limit)
         .limit(limit);
      const totalItem = await Product.count(filterEl);
      return { result, totalPage: Math.ceil(totalItem / limit) };
   }

   async createProduct({ name, images, category, price, quantity, detail, description }) {
      const product = await Product.create(
         filterUndefinedOrNullFields({
            name,
            images: images.map((item) => item?._id),
            category,
            price,
            quantity,
            detail: JSON.parse(detail),
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
      if (!_id) {
         throw new BadRequestException('Product _id must be required.');
      }
      return await Product.deleteOne({ _id });
   }
}

export default ProductRepository;
