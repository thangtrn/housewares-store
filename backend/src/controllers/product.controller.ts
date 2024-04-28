import { Request, Response } from 'express';
import { Controller, Delete, Post, Put } from '~/decorators';
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

   @Post('/', uploader.array('image'))
   async createProduct(req: Request, res: Response) {
      const { name, category, price, quantity, detail, description } = req.body;
      const images = await this.imageRepo.createMultipleImage(req.files as CloudImage[]);

      if (!images || images.length <= 0) {
         throw new BadRequestException('Product images can not null or undefine');
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
   deleteProduct(req: Request, res: Response) {
      return OkResponse(res);
   }
}

export default ProductController;
