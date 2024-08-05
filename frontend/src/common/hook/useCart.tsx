import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { IProduct } from "../types/product";

import { toast } from "react-toastify";

import { message } from "antd";
import instance from "@/configs/axios";

export const useCart = ({ userId }: any) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["ProductsCart_key"],
    queryFn: async () => {
      const res = await instance.get(`/v1/carts/${userId}`);
      return res.data;
    },
  });
  useMutation({
    mutationFn: async (data) => {
      console.log(data);
    },
  });
  return { data, isLoading, isError, error };
};

export const useCartMutate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      action: string;
      product: IProduct;

      userId: any;
      quantity?: number;
    }) => {
      const action = data.action;
      const userId = data.userId;
      const quantity = data.quantity;

      const productId = data?.product?._id || data?.product?.productId;
      // || data.product.productId;
      // console.log(data);
      if (action == "delete-product") {
        const res = await instance.delete(`/v1/carts/delete-product`, {
          data: { userId, productId },
        });
        toast.success(`Bạn gỡ sản phẩm khỏi cart`);
        return res.data;
      } else if (action === "descrease" || action === "inscrease") {
        const res = await instance.post(`/v1/carts/${action}`, {
          productId,
          userId,
          quantity,
        });

        return res.data;
      } else {
        const res = await instance.post(
          `/v1/carts/${action}`,
          quantity
            ? { productId, userId, quantity }
            : {
                productId,
                userId,
              }
        );
        // if (action == "add-to-cart") {
        //   // message.open({
        //   //   type: "success",
        //   //   content: `Bạn đã Thêm ${quantity} sản phẩm vào cart`,
        //   // });
        // }
        !quantity
          ? ""
          : quantity < 10
          ? toast.success(`Bạn đã Thêm  ${quantity} sản phẩm vào cart`)
          : toast.error(`Bạn chỉ được nhập tối đa 10 sản phẩm vào cart `);
        return res.data, quantity;
      }
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["ProductsCart_key"],
      });
    },
  });
};
