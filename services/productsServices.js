import { model, Schema } from "mongoose";

const productsSchema = new Schema({
        name: String,
        images: [
            {
                color: String,
                url: String,
                have: Boolean
            }
        ],
        subtitle: String,
        sale: Number,
        saleprice: Number,
        price: Number,
        sizes: [
            {
                size: String,
                have: Boolean
            }
        ],
        description: String,
        new: Boolean
    });
  
  export const Product = model('Product', productsSchema);