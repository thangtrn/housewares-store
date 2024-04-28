import { Request, Response } from 'express';
import { Controller, Delete, Get, Post, Put } from '~/decorators';
import uploader from '~/middlewares/uploader';
import CategoryRepository from '~/repositories/category.repository';
import ImageRepository from '~/repositories/image.repository';
import { CloudImage } from '~/types/image';
import OkResponse from '~/utils/response/response';

@Controller('/category')
class CategoryController {
   private categoryRepo = new CategoryRepository();
   private imageRepo = new ImageRepository();

   @Get('/')
   async getAllCategory(req: Request, res: Response) {
      const result = await this.categoryRepo.getAllCategory();
      return OkResponse(res, { metadata: result });
   }

   @Post('/', uploader.single('image'))
   async createCagetory(req: Request, res: Response) {
      const name = req.body.name;
      const image: CloudImage = req.file;

      const imageResult = await this.imageRepo.createImage(image);

      const categoryResult = await this.categoryRepo.createCategory({
         name,
         image: imageResult?._id
      });

      return OkResponse(res, { metadata: categoryResult });
   }

   @Put('/', uploader.single('image'))
   async updateCategory(req: Request, res: Response) {
      const { _id, name } = req.body;
      const image: CloudImage = req.file;

      const imageResult = await this.imageRepo.createImage(image);

      const categoryResult = await this.categoryRepo.updateCategory({
         _id,
         name,
         image: imageResult?._id
      });

      return OkResponse(res, { metadata: categoryResult });
   }

   @Delete('/:id')
   async deleteCategory(req: Request, res: Response) {
      const _id = req.params.id;

      const result = await this.categoryRepo.deleteCategory(_id);
      return OkResponse(res, { metadata: result });
   }
}

export default CategoryController;
