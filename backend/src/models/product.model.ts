import mongoose from 'mongoose';
const { Schema } = mongoose;
import slug from 'mongoose-slug-generator';

mongoose.plugin(slug);

const productSchema = new Schema(
   {
      name: {
         type: String,
         require: [true, 'Product name must be required.']
      },
      slug: {
         type: String,
         slug: 'name',
         index: true,
         unique: true
      },
      images: [
         {
            type: Schema.ObjectId,
            ref: 'Image'
         }
      ],
      price: {
         type: Number,
         require: [true, 'Product price must be required.']
      },
      inventoryQuantity: {
         type: Number,
         require: [true, 'Product quantity must be required.']
      },
      detail: {
         size: String,
         color: String,
         brand: String,
         origin: String
      },
      description: {
         type: String
      }
   },
   {
      timestamps: true
   }
);

export default mongoose.model('Product', productSchema);
