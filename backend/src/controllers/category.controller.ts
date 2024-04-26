import { Request, Response } from 'express';
import { Controller, Delete, Get, Post, Put } from '~/decorators';

@Controller('/category')
class CategoryController {
   @Get('/')
   getAllCategory(req: Request, res: Response) {
      res.send('/');
   }

   @Post('/')
   createCagetory(req: Request, res: Response) {
      res.send('/');
   }

   @Put('/')
   updateCategory(req: Request, res: Response) {
      res.send('/');
   }

   @Delete('/')
   deleteCategory(req: Request, res: Response) {
      res.send('/');
   }
}

export default CategoryController;
