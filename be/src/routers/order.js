import { Router } from "express";
import { get } from "lodash";
import {
  createOrder,
  getAllOrder,
  getOrderById,
  updateOrder,
} from "../controllers/order";

const OrderRoute = Router();

OrderRoute.get("/", getAllOrder);
OrderRoute.get("/:orderId", getOrderById);
OrderRoute.post("/", createOrder);
OrderRoute.put("/:orderId", updateOrder);
export default OrderRoute;
