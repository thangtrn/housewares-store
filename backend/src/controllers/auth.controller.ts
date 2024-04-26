import { Request, Response } from 'express';
import { Controller, Post } from '~/decorators';

@Controller('/auth')
class AuthController {
   @Post('/login')
   login(req: Request, res: Response) {
      res.send('/login');
   }
}

export default AuthController;
