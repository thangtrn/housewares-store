import filterUndefinedOrNullFields from '~/utils/filterUndefineOrNull';
import { NotFoundException } from '~/utils/response';

class OrderRepository {
   async createOrder({ items, status, totalPrice, note }) {}

   async updateOrder({ items, status, totalPrice, note }) {}
}

export default OrderRepository;
