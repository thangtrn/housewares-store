import { Request, Response } from "express";
import Controller from "~/decorators/Controller";
import { Post } from "~/decorators/Methods";

@Controller('/users')
class UserController {
   @Post('/')
   getAllUsers(req: Request, res: Response) {
      res.send("/users")
   }
}

export default UserController