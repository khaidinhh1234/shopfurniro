import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProduct,
  updateProduct,
} from "../controllers/product";

const ProductRoute = Router();

ProductRoute.get("/", getAllProducts);
ProductRoute.get("/:id", getProduct);
ProductRoute.post("/", createProduct);
ProductRoute.put("/:id", updateProduct);
ProductRoute.delete("/:id", deleteProduct);

export default ProductRoute;
