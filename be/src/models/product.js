import { boolean } from "joi";
import mongoose, { Schema } from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    regular_price: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
    },
    countIn_stock: {
      type: Number,
      required: true,
    },
    feature_image: [
      {
        type: String,
        required: true,
      },
    ],
    gallery_images: {
      type: Array,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },

    deletool: {
      type: Boolean,
    },
    description: {
      type: String,
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, versionKey: false }
);
export default mongoose.model("Product", ProductSchema);
