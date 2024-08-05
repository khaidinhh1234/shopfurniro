import RouterAuth from "./auth";
import CartRoute from "./cart";
import CategoryRouter from "./category";
import PaymentRouter from "./momo";
import OrderRoute from "./order";
import ProductRoute from "./product";

export function Router(app) {
  app.use("/api/v1/products", ProductRoute);
  app.use("/api/v1/category", CategoryRouter);
  app.use("/api/v1/auth", RouterAuth);
  app.use("/api/v1/carts", CartRoute);
  app.use("/api/v1/orders", OrderRoute);
  app.use("/api/v1/", PaymentRouter);
}
