import { Request, Response } from 'express';
import { Controller, Post, Put } from '~/decorators';
import uploader, { destroy } from '~/middlewares/uploader';

@Controller('/products')
class ProductController {
   @Post('/', uploader.single('image'))
   createProduct(req: Request, res: Response) {
      res.json(req.file);
   }

   @Put('/')
   updateProduct(req: Request, res: Response) {
      res.send('hello');
   }

   @Post('/delete')
   async deleteProduct(req: Request, res: Response) {
      const result = await destroy('housewares/yzxqivladoya243qnxdb2');
      res.send(result);
   }
}

export default ProductController;
