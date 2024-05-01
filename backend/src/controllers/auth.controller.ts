import { Request, Response } from 'express';
import { Controller, Post } from '~/decorators';
import AuthRepository from '~/repositories/auth.repository';
import OkResponse from '~/utils/response/response';

@Controller('/auth')
class AuthController {
   authRepo = new AuthRepository();
   @Post('/login')
   login(req: Request, res: Response) {
      const { username, password, fullname, phone, address } = req.body;
      res.send('/login');
   }

   @Post('/register')
   async register(req: Request, res: Response) {
      const { username, password, fullname, phone, address } = req.body;
      const result = await this.authRepo.register({ username, password, fullname, phone, address });
      return OkResponse(res, { metadata: result });
   }

   @Post('/change-password')
   async changePassword(req: Request, res: Response) {
      const { username, password } = req.body;
      const result = await this.authRepo.changePassword({ username, password });
      return OkResponse(res, { metadata: result });
   }
}

export default AuthController;
