import User from '~/models/user.model';

class UserRepository {
   async getAllUser({ page, limit, filter }) {
      const filterEl = {
         fullname: {
            $regex: `.*${filter}.*`,
            $options: 'i'
         }
      };

      if (!page) {
         const result = await User.find(filterEl)
            .sort('createdAt')
            ?.populate({ path: 'account', select: { password: 0 } });
         return { result };
      }

      const result = await User.find(filterEl)
         .sort('createdAt')
         ?.populate({ path: 'account', select: { password: 0 } })
         ?.select('-account.password')
         ?.skip((page - 1) * limit)
         .limit(limit);
      const totalItem = await User.count(filterEl);

      return {
         result,
         pagination: {
            page: Number(page),
            limit: Number(limit),
            totalPage: Math.ceil(totalItem / limit)
         }
      };
   }
}

export default UserRepository;
