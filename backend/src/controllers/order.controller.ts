import { Request, Response } from 'express';
import { Controller, Post } from '~/decorators';

@Controller('/auth')
class OrderController {
   @Post('/login')
   createOrder(req: Request, res: Response) {
      res.send('/login');
   }

   updateOrder(req: Request, res: Response) {
      res.send('/login');
   }
}

export default OrderController;
