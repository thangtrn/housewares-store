import { Request, Response } from 'express';
import { Controller, Post } from '~/decorators';

@Controller('/')
class bController {
   @Post('/')
   login(req: Request, res: Response) {
      res.send('/');
   }
}

export default bController;
