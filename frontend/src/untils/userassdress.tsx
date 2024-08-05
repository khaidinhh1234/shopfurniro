import * as z from "zod";
const useraddresssSchema = z.object({
  name: z.string().min(3, { message: "Vui lòng nhập tên của người nhận hàng" }),
  address: z
    .string()
    .min(6, { message: "Vui lòng nhập địa chỉ giao hàng của bạn" }),
  phone: z
    .number()
    .min(10 - 11, { message: "Vui lòng nhập số điện thoại của bạn" }),
  city: z.string().min(3, { message: "Vui lòng chọn thành phố của bạn" }),
  payment: z.string().min(3, { message: "Vui lòng chọn hình thức thanh toán" }),
});

export default useraddresssSchema;
