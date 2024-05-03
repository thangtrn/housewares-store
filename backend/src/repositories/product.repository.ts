import Order from '~/models/order.model';
import Product from '~/models/product.model';
import { OrderStatus } from '~/types/orderStatus';
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

      const result = await Product.find(filterEl)
         .sort({ createdAt: -1 })
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

      return {
         result,
         pagination: {
            page: Number(page),
            limit: Number(limit),
            totalPage: Math.ceil(totalItem / limit)
         }
      };
   }

   async getProductById(_id) {
      const result = await Product.findById(_id)
         .sort({ createdAt: -1 })
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

      if (!result) {
         throw new NotFoundException('Not found product with _id: ' + _id);
      }

      return result;
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

   async updateProduct({ _id, name, category, price, quantity, detail, description }) {
      const product = await Product.findByIdAndUpdate(
         _id,
         filterUndefinedOrNullFields({
            name,
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

   async deleteProduct(_id): Promise<any> {
      if (!_id) {
         throw new BadRequestException('Product _id must be required.');
      }
      return await Product.deleteOne({ _id });
   }

   async searchProduct({
      page = 1,
      limit = 10,
      name = '',
      fromPrice,
      toPrice,
      sort = 'createdAt'
   }: {
      page?: number;
      limit?: number;
      name?: string;
      fromPrice?: number;
      toPrice?: number;
      sort?: string;
   }): Promise<{
      result: any;
      pagination: { page: number; limit: number; totalPage: number; totalItem?: number };
   }> {
      const filterEl: any = {
         name: {
            $regex: `.*${name || ''}.*`,
            $options: 'i'
         }
      };

      if (fromPrice !== undefined) {
         filterEl.price = { $gte: fromPrice };
      }

      if (toPrice !== undefined) {
         filterEl.price = { ...filterEl.price, $lte: toPrice };
      }

      let query = Product.find(filterEl);

      if (sort === 'price-desc') {
         query = query.sort({ price: -1 });
      } else if (sort === 'price-asc') {
         query = query.sort({ price: 1 });
      } else if (sort === 'createdAt') {
         query = query.sort({ createdAt: -1 });
      }

      const orders = await Order.find({
         status: {
            $nin: [OrderStatus.PENDING, OrderStatus.CANCELLED]
         }
      }).populate('items.product');

      const productSoldMap = new Map();
      orders.forEach((order) => {
         order.items.forEach((item) => {
            const productId = item.product._id.toString();
            const quantity = item.quantity;
            if (productSoldMap.has(productId)) {
               productSoldMap.set(productId, productSoldMap.get(productId) + quantity);
            } else {
               productSoldMap.set(productId, quantity);
            }
         });
      });

      const result = await query
         .populate({
            path: 'images',
            model: 'Image'
         })
         .populate({
            path: 'category',
            model: 'Category',
            populate: {
               path: 'image',
               model: 'Image'
            }
         })
         .skip((page - 1) * limit)
         .limit(limit);

      if (sort === 'populate') {
         result.sort((a: any, b: any) => {
            const totalQuantityA = productSoldMap.get(a._id.toString()) || 0;
            const totalQuantityB = productSoldMap.get(b._id.toString()) || 0;
            return totalQuantityB - totalQuantityA;
         });
      }

      return {
         result,
         pagination: {
            page: Number(page),
            limit: Number(limit),
            totalPage: Math.ceil(result.length / limit),
            totalItem: result.length
         }
      };
   }

   // async getSuggestionProduct() {
   //    return randomProducts;
   // }
}

export default ProductRepository;
