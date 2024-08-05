import Category from "../models/category";
import product from "../models/product";
import Products from "../models/product";
import slugify from "slugify";

export const createCategory = async (req, res) => {
  try {
    const category = await Category.create({
      name: req.body.name,
      slug: slugify(req.body.name),
    });
    return res.status(201).json(category);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    if (categories.length === 0) {
      return res.status(200).json([]);
    }
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getCategory = async (req, res) => {
  try {
    const products = await Products.find({ category: req.params.id });
    const category = await Category.findById(req.params.id);
    res.status(200).json({ category, products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    return res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const updateCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
