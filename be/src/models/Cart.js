import { mongoose, Schema } from "mongoose";

const productId = new Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
  discount: {
    type: Number,
    default: 0,
  },
});
const Cart = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    products: [productId],
    totalPrice: {
      type: Number,
      required: true,
      default: 0,
    },
    totalQuantity: {
      type: Number,
      required: true,
      default: 0,
    },
    totalDiscount: {
      type: Number,
      required: true,
      default: 0,
    },
    finalTotalPrice: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true, versionKey: false }
);
export default mongoose.model("Cart", Cart);
