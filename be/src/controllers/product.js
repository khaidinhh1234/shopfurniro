import Products from "../models/product";
import { StatusCodes } from "http-status-codes";
export const createProduct = async (req, res) => {
  try {
    const Product = await Products.create(req.body);
    return res.status(201).json(Product);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const getAllProducts = async (req, res) => {
  try {
    const products = await Products.find().populate({
      path: "category",
      select: "name",
    });
    if (products.length === 0) {
      return res.status(200).json([]);
    }
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// export const getAllProducts = async (req, res) => {
//   const {
//     _page = 1,
//     _limit = 10,
//     _sort = "createdAt",
//     _order = "asc",
//     _expand,
//   } = req.query;
//   const options = {
//     page: _page,
//     limit: _limit,
//     sort: { [_sort]: _order === "desc" ? -1 : 1 },
//   };
//   const populateOptions = _expand ? [{ path: "category", select: "name" }] : [];
//   try {
//     const result = await Products.paginate(
//       { categoryId: null },
//       { ...options, populate: populateOptions }
//     );
//     if (result.docs.length === 0)
//       return res.status(StatusCodes.OK).json({ data: [] });
//     const response = {
//       data: result.docs,
//       pagination: {
//         currentPage: result.page,
//         totalPages: result.totalPages,
//         totalItems: result.totalDocs,
//       },
//     };
//     return res.status(StatusCodes.OK).json(response);
//   } catch (error) {
//     return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
//   }
// };
export const getProduct = async (req, res) => {
  try {
    const Product = await Products.findById(req.params.id);
    res.status(200).json(Product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const deleteProduct = async (req, res) => {
  try {
    const Product = await Products.findByIdAndDelete(req.params.id);
    res.status(200).json(Product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const updateProduct = async (req, res) => {
  try {
    const Product = await Products.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(Product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
