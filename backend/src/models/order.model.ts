import mongoose from 'mongoose';
const { Schema } = mongoose;
import { OrderStatus } from '~/types/orderStatus';

const orderSchema = new Schema(
   {
      items: [
         {
            product: {
               type: Schema.ObjectId,
               ref: 'Product'
            },
            price: Number,
            quantity: Number
         }
      ],
      status: {
         type: String,
         enum: Object.values(OrderStatus),
         default: OrderStatus.PENDING
      },
      totalPrice: Number
   },
   {
      timestamps: true
   }
);

export default mongoose.model('Order', orderSchema);
