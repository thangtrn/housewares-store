import mongoose from 'mongoose';
const { Schema } = mongoose;

const imageSchema = new Schema(
   {
      imageUrl: String,
      cloudinaryId: String,
      default: {
         type: Boolean,
         default: false
      }
   },
   {
      timestamps: true
   }
);

export default mongoose.model('Image', imageSchema);
