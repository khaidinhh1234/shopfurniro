import { Router } from "express";

import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategory,
  updateCategory,
} from "../controllers/category";

const CategoryRouter = Router();

CategoryRouter.get("/", getAllCategories);
CategoryRouter.get("/:id", getCategory);

CategoryRouter.post("/", createCategory);
CategoryRouter.put("/:id", updateCategory);
CategoryRouter.delete("/:id", deleteCategory);

export default CategoryRouter;
