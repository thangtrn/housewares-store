import { Request, Response } from 'express';
import { Controller, Get, Post } from '~/decorators';
import UserRepository from '~/repositories/user.repository';
import OkResponse from '~/utils/response/response';

@Controller('/users')
class UserController {
   userRepo = new UserRepository();

   @Get('/')
   async getAllUsers(req: Request, res: Response) {
      const { page, limit = 20, filter = '' } = req.query;
      const { result, pagination } = await this.userRepo.getAllUser({ page, limit, filter });
      return OkResponse(res, { metadata: result, pagination });
   }
}

export default UserController;
