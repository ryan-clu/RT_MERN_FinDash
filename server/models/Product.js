import mongoose from 'mongoose';
import { loadType } from 'mongoose-currency';

const Schema = mongoose.Schema;
loadType(mongoose);

// Product Schema
const ProductSchema = new Schema(
  {
    price: {
      type: mongoose.Types.Currency,
      currency: 'USD',
      get: (v) => v / 100,
    },
    expense: {
      type: mongoose.Types.Currency,
      currency: 'USD',
      get: (v) => v / 100,
    },
    transactions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Transaction',
      },
    ],
  },
  { timestamps: true, toJSON: { getters: true } }
);

const Product = mongoose.model('Product', ProductSchema);

export default Product;

/* Notes
    transactions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Transaction',
      },
    ],
- this references the 'Transaction' object, 
its for the Transaction scheme object, so we have
references to each transaction that's relevant to 
a specific given Product. 
- Products can have multiple Transactions... i.e.
someone or multiple people buy multiples of this 
product. 
- Transactions can also have multiple products. 
*/