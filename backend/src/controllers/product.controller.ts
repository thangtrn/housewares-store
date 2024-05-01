import { Request, Response } from 'express';
import { Controller, Delete, Get, Post, Put } from '~/decorators';
import { CloudImage } from '~/types/image';
import uploader from '~/middlewares/uploader';
import ImageRepository from '~/repositories/image.repository';
import OkResponse from '~/utils/response/response';
import ProductRepository from '~/repositories/product.repository';
import { BadRequestException } from '~/utils/response';

@Controller('/products')
class ProductController {
   private imageRepo = new ImageRepository();
   private productRepo = new ProductRepository();

   @Get('/')
   async getAllProduct(req: Request, res: Response) {
      const { page = 1, limit = 20, filter = '' } = req.query;
      const { result, totalPage } = await this.productRepo.getAllProduct({ page, limit, filter });
      return OkResponse(res, {
         metadata: result,
         pagination: {
            page: Number(page),
            limit: Number(limit),
            totalPage
         }
      });
   }

   @Post('/', uploader.array('image'))
   async createProduct(req: Request, res: Response) {
      const { name, category, price, quantity, detail, description } = req.body;
      const file = req.files as CloudImage[];
      const images = await this.imageRepo.createMultipleImage(file);

      if (!images || images.length <= 0) {
         throw new BadRequestException('Product images not be empty.');
      }

      const product = await this.productRepo.createProduct({
         name,
         images,
         category,
         price,
         quantity,
         detail,
         description
      });

      return OkResponse(res, { metadata: product });
   }

   @Put('/', uploader.single('images'))
   updateProduct(req: Request, res: Response) {
      const data = req.body;
      return OkResponse(res);
   }

   @Delete('/:id')
   async deleteProduct(req: Request, res: Response) {
      const _id = req.params.id;
      const result = await this.productRepo.deleteProduct(_id);
      return OkResponse(res, { metadata: result });
   }
}

export default ProductController;
