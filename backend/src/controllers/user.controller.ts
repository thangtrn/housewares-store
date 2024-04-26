import { Request, Response } from 'express';
import { Controller, Post } from '~/decorators';

@Controller('/users')
class UserController {
   @Post('/')
   getAllUsers(req: Request, res: Response) {
      res.send('/users');
   }
}

export default UserController;
