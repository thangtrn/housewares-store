import { Request, Response } from 'express';
import { Controller, Get, Post, Put } from '~/decorators';
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

   @Put('/')
   async updateUser(req: Request, res: Response) {
      const { _id, fullname, phone, address, image, role } = req.body;
      const result = await this.userRepo.updateUser({
         _id,
         fullname,
         phone,
         address,
         image,
         role
      });
      return OkResponse(res, { metadata: result });
   }
}

export default UserController;
