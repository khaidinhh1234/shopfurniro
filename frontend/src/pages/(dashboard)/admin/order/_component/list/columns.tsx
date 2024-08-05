"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog.tsx";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";

import { IProduct } from "@/common/types/product";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { message } from "antd";
import { Link } from "react-router-dom";

import instance from "@/configs/axios";

export const columns: ColumnDef<IProduct>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <div>{row.index + 1}</div>,
  },

  {
    accessorKey: "name",
    header: "Tên khách hàng",
    cell: ({ row }: any) => (
      // console.log(row),
      <div className=" font-semibold truncate w-40">
        {row.original?.customerName?.name}
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Thời gian order",
    cell: ({ row }: any) => (
      // console.log(row),
      <div className=" font-semibold ">{row?.original?.createdAtVN}</div>
    ),
  },

  {
    accessorKey: "phone",
    header: () => {
      return <div className=""> Số điện thoại</div>;
    },
    cell: ({ row }: any) => (
      <div className="capitalize truncate ">
        +84{row.original.customerName.phone}
      </div>
    ),
  },
  {
    accessorKey: "city",
    header: "Địa chỉ",

    cell: ({ row }: any) => (
      <div className="capitalize truncate ml-3">
        {row.original?.customerName?.city}
      </div>
    ),
  },
  {
    accessorKey: "products ",
    header: "Sản phẩm",
    cell: ({ row }: any) =>
      row?.original?.items?.map((product: any, index: number) => (
        <div key={index} className="flex items-center space-x-2">
          <AlertDialog>
            <AlertDialogTrigger>
              {" "}
              <div className="font-semibold truncate w-26  border border-gray-950 hover:text-white hover:bg-black rounded-md my-1 px-2 py-1">
                {`sản phẩm  ${index + 1}`}
              </div>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                {" "}
                <AlertDialogFooter>
                  <AlertDialogAction className="w-10 bg-red-600">
                    X
                  </AlertDialogAction>
                </AlertDialogFooter>
                <AlertDialogTitle className="">{product.name}</AlertDialogTitle>
                <AlertDialogDescription className="text-xl">
                  Số lượng {product.quantity} , Giá sản phẩm{" "}
                  {product.regular_price.toLocaleString()} VND
                </AlertDialogDescription>
              </AlertDialogHeader>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      )),
  },
  {
    accessorKey: "email",
    header: "Thanh toán ",
    cell: ({ row }: any) => (
      <div className=" font-semibold truncate w-40">
        {row.original?.customerName?.payment == "bank"
          ? "Chuyển khoản"
          : "Thanh toán khi nhận hàng"}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return <div> Trạng thái DH</div>;
    },
    cell: ({ row }: any) => (
      <div
        className={` ${
          row.original.status == "pending"
            ? "text-white font-medium  border  bg-blue-700 rounded-full text-center py-1"
            : row.original.status == "confirmed"
            ? "text-white font-medium  border  bg-green-700 rounded-xl text-center py-1"
            : row.original.status == "shipped"
            ? "text-white font-medium  border  bg-yellow-700 rounded-xl text-center py-1"
            : row.original.status == "delivered"
            ? "text-white font-medium  border  bg-orange-700  rounded-xl text-center py-1"
            : "text-white font-medium  border  bg-red-700 rounded-xl text-center py-1"
        }`}
      >
        {row.original.status == "pending"
          ? "Chờ thanh toán"
          : row.original.status == "confirmed"
          ? "đã thanh toán "
          : row.original.status == "shipped"
          ? "Đang giao hàng"
          : row.original.status == "delivered"
          ? "Đã giao hàng"
          : "Đã hủy"}
      </div>
    ),
  },

  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }: any) => {
      const id = row.original._id;
      const queryClient = useQueryClient();
      const { mutate } = useMutation({
        mutationFn: async (id: string | any) => {
          const res = await instance.delete("/v1/products/" + id);
          return res.data;
          // console.log(id);
        },
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["Products_Key"],
          });
          message.open({
            type: "success",
            content: "Xóa sản phẩm  thành công",
          });
        },
      });

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <DotsHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Quản trị</DropdownMenuLabel>
            {row?.original?.customerName?.payment == "bank" &&
            row.original?.status == "pending" ? (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <div className="relative flex cursor-default select-none items-center  hover:text-white hover:bg-red-500 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors  data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
                    Huỷ
                  </div>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Bạn có chắc chắn nuốn hủy không{" "}
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Hành động này không thể hoàn tác.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="hover:bg-white bg-black hover:text-black text-white rounded-md shadow-sm shadow-black">
                      Hủy
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => mutate(id!)}
                      className="hover:bg-white bg-red-500 hover:text-black text-white rounded-md shadow-sm shadow-black"
                    >
                      Xác nhận
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            ) : (
              <div>
                {" "}
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <div className="relative flex cursor-default select-none items-center  hover:text-white hover:bg-red-500 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors  data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
                      Huỷ
                    </div>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Bạn có chắc chắn nuốn hủy không{" "}
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        Hành động này không thể hoàn tác.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="hover:bg-white bg-black hover:text-black text-white rounded-md shadow-sm shadow-black">
                        Hủy
                      </AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => mutate(id!)}
                        className="hover:bg-white bg-red-500 hover:text-black text-white rounded-md shadow-sm shadow-black"
                      >
                        Xác nhận
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
                <DropdownMenuItem className="">
                  <Link
                    to={`edit/${id}`}
                    className="no-underline hover:text-white"
                  >
                    Xác Nhận
                  </Link>
                </DropdownMenuItem>
              </div>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
