import { Request, Response } from "express";
import Controller from "~/decorators/Controller";
import { Post } from "~/decorators/Methods";

@Controller('/auth')
class AuthController {
   @Post('/login')
   login(req: Request, res: Response) {
      res.send("/login")
   }
}

export default AuthController