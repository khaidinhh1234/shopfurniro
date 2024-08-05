import { Router } from "express";

import { callblack, Payment, transaction } from "../controllers/momo";

const PaymentRouter = Router();

PaymentRouter.post("/payment", Payment);
PaymentRouter.post("/callblack", callblack);

PaymentRouter.post("/check-status-transaction", transaction);

export default PaymentRouter;
