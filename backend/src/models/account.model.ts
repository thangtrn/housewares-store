import mongoose from 'mongoose';
import { Accounts } from '~/types/account';
const { Schema } = mongoose;

const accountSchema = new Schema(
   {
      username: {
         type: String,
         unique: true
      },
      password: {
         type: String
      },
      provider: {
         type: String,
         enum: Object.values(Accounts),
         default: Accounts.LOCAL
      },
      providerId: String
   },
   {
      timestamps: true
   }
);

export default mongoose.model('User', accountSchema);
