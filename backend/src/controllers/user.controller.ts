import Controller from "~/decorators/Controller"
import { Get } from "~/decorators/Methods"
import { BadRequestException } from "~/utils/response"

const log = (req, res, next) => {
   console.log(!req.query.id)
   if(!req.query.id)
      throw new BadRequestException('Vui long cung cap id')
   next()
}

@Controller('/api')
class UserController {
   @Get('/user', log)
   getAllUser(req, res) {
      return res.status(200).send('hello')
   }
}

export default UserController