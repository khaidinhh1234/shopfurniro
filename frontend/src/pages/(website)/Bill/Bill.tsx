import useUserQuery from "@/common/hook/userQuery";
import { IProduct } from "@/common/types/product";
import instance from "@/configs/axios";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";

import { useParams, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

const BillPage = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const orderid = searchParams.get("orderId");

  const {
    data: bill,
    isLoading,
    isError,
    error,
  } = useUserQuery({
    action: `orders/${id}`,
    id,
  });

  const { mutate } = useMutation({
    mutationFn: async (data: any) => {
      try {
        const result = await instance.put(`/v1/orders/${data.id}`, {
          ...bill,
          status: "confirmed",
        });
        //   console.log(result.data);
        setTimeout(() => {
          toast.success("Đơn hàng của bạn đã hoàn tất ");
        }, 3000);

        return result.data;
      } catch (error) {
        toast.success("Đã có lỗi xảy ra");
      }
    },
  });

  const checktrangthai = async () => {
    try {
      const res = await instance.post("/v1/check-status-transaction", {
        orderId: orderid,
      });
      //   console.log(res.data);
      if (res.data.resultCode === 0) {
        mutate({ id });
        toast.success("Thanh toán thành công");
      } else {
        toast.error(res.data.resultCode);
      }
    } catch (error) {
      toast.success("Thanh toán khi Nhận hàng");
    }
  };

  useEffect(() => {
    checktrangthai();
  }, [orderid, bill]); // Thay đổi theo `orderid` và `bill`
  // if (bill.customerName.payment === "bank") {
  //     } else if (bill.customerName.payment === "palpay") {
  //       toast.success("Vui lòng thanh toán khi nhận hàng");
  //     } else {
  //       toast.error("Đặt hàng thất bại");
  //     }
  //   console.log(bill);
  //   console.log(id);
  const thoigianmua = bill?.createdAt; // Thời gian UTC
  const date = new Date(thoigianmua);

  // Chuyển đổi thời gian UTC sang múi giờ Việt Nam và định dạng
  const vietnamTime = date.toLocaleString("vi-VN", {
    timeZone: "Asia/Ho_Chi_Minh",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error: {error?.message}</div>;
  }
  return (
    <div>
      <div className="max-w-5xl mx-auto bg-gradient-to-r to-slate-100 from-black/40  p-6 rounded-lg shadow-2xl shadow-black my-5">
        <h1 className="text-3xl font-bold mb-4 mx-1">Hóa Đơn Chi Tiết</h1>
        <div className="flex justify-between mb-2 ">
          <span className="font-semibold text-xl">Mã hóa đơn:</span>
          <span className="text-xl font-medium"> #{bill.orderNumber}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="font-semibold text-xl">Ngày:</span>
          <span className="text-lg font-medium">{vietnamTime}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="font-semibold text-xl">Khách hàng:</span>
          <span className="text-lg font-medium">{bill.userId.name}</span>
        </div>
        <div className="border-t border-gray-200 mt-4 pt-4">
          <table className="w-full text-left">
            <thead>
              <tr>
                <th className="font-semibold text-gray-600">Sản phẩm</th>
                <th className="font-semibold text-gray-600">Số lượng</th>
                <th className="font-semibold text-gray-600">Đơn giá</th>
                <th className="font-semibold text-gray-600">Thành tiền</th>
              </tr>
            </thead>
            <tbody>
              {bill.items.map((item: any, index: number) => (
                <tr className="border-b" key={index}>
                  <td className="py-2 w-64 truncate">{item.name}</td>
                  <td className="py-2">{item.quantity}</td>
                  <td className="py-2">
                    {item.regular_price.toLocaleString("vn-VN")} VND
                  </td>
                  <td className="py-2">
                    {(item.regular_price * item.quantity).toLocaleString(
                      "vn-VN"
                    )}{" "}
                    VND
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4">
          <div className="flex justify-between font-semibold">
            <span>Tổng cộng:</span>
            <span>{(bill.totalPrice - 25000).toLocaleString("vn-VN")} VND</span>
          </div>
          <div className="flex justify-between mt-2">
            <span> Phí ship:</span>
            <span>25.000 VND</span>
          </div>
          <div className="flex justify-between mt-2 text-xl font-bold">
            <span>Tổng thanh toán:</span>
            <span>{bill.totalPrice.toLocaleString("vn-VN")} VND</span>
          </div>
        </div>
        <p className="text-gray-500 text-center mt-6">
          Cảm ơn bạn đã mua sắm với chúng tôi!
        </p>
      </div>
    </div>
  );
};

export default BillPage;
