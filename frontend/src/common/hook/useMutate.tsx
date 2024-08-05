import instance from "@/configs/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";

const useMutate = ({ action, id }: { action: string; id: string | any }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data) => {
      console.log(data);
      if (!id) {
        const res = await instance.post(`/${action}`);
        console.log(res.data);
        return res.data;
      } else {
        const res = await instance.put(`/${action}/${id}`, data);
        console.log(res.data);
        return res.data;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [action === action ? action : "", id ? id : ""],
      });
      action === "products"
        ? message.open({
            type: "success",
            content: "Cập  sản phẩm nổi bật thành công",
          })
        : message.open({
            type: "success",
            content: "Thêm danh mục thành công",
          });
    },
  });
};

export default useMutate;
