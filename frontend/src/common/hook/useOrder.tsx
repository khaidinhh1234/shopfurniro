import instance from "@/configs/axios";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

type Order = {
  userId: any;
  customerName: any;
  totalPrice: number;
  items: Array<{ productId: string; quantity: number }>;
};

export const useOrder = () => {
  const nav = useNavigate();
  return useMutation({
    mutationFn: async (data: Order) => {
      if (data.customerName.payment === "bank") {
        const order = await instance.post("/v1/orders", {
          userId: data.userId,
          items: data.items,
          customerName: data.customerName,
          totalPrice: data.totalPrice,
        });
        const orders = {
          orderId: order.data._id,
          amounts: order.data.totalPrice,
        };

        const response = await instance.post("/v1/payment", orders);
        {
          response.data.payUrl
            ? (window.location.href = response.data.payUrl)
            : toast.error("Thanh toán thất bại");
        }
      } else {
        const order = await instance.post("/v1/orders", {
          userId: data.userId,
          items: data.items,
          customerName: data.customerName,
          totalPrice: data.totalPrice,
        });
        toast.success("Đặt hàng thành công");
        nav("/bill/" + order.data._id);
        return order.data;
      }
    },
  });
};
