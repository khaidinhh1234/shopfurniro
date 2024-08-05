import { Button } from "@/components/ui/button";
import instance from "@/configs/axios";

import { BackwardFilled } from "@ant-design/icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Form, FormProps, Input, message } from "antd";
import { Link, useNavigate, useParams } from "react-router-dom";

type FieldType = {
  name: string;
};

const CategoryEdit = () => {
  const { id } = useParams();
  const nav = useNavigate();
  const {
    data: category,
    isError,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["PRODUCTSID_KEY", id],
    queryFn: async () => {
      const res = await instance.get(`/v1/category/${id}`);
      return res.data;
    },
  });
  // console.log(category?.category);
  const { mutate, isPending } = useMutation({
    mutationFn: async (formdata: FieldType) => {
      try {
        const response = await instance.put(`/v1/category/${id}`, formdata);
        // console.log(response.data);
        nav("/admin/category");
        return response.data;
      } catch (error: any) {
        throw new Error(error.response.data.message);
      }
    },
    onSuccess: () => {
      message.open({
        type: "success",
        content: "Cập nhật danh mục thành công",
      });
    },
    onError: (error) => {
      message.open({
        type: "error",
        content: error.message,
      });
    },
  });
  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    mutate(values);
  };
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>{error.message}</div>;
  return (
    <div>
      <div>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <div className="flex items-center  justify-between">
            <h1 className="text-lg font-semibold md:text-2xl mr-5 ">
              {" "}
              Edit : {category?.category?.name}
            </h1>

            <Link to={"/admin/category"}>
              <Button className=" bg-black  text-white hover:bg-slate-200 hover:text-black hover:shadow-lg  shadow-slate-600/50 text-[16px] mx-4">
                <BackwardFilled className="mr-1" /> Quay lại
              </Button>
            </Link>
          </div>
          <div className="max-w-3xl   border px-10 mt-5 py-10 bg-white rounded-[10px] shadow-2xl">
            {" "}
            <Form
              name="basic"
              layout="vertical"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              style={{ maxWidth: 600 }}
              disabled={isPending}
              onFinish={onFinish}
              initialValues={{ ...category?.category }}
            >
              <Form.Item<FieldType>
                label="Danh mục "
                name="name"
                rules={[
                  { required: true, message: "Vui lòng nhập tên danh mục!" },
                ]}
              >
                <Input placeholder="Nhập tên danh mục" />
              </Form.Item>
              <Form.Item<FieldType>>
                <button className="bg-black text-white px-4 py-3 rounded-[5px] hover:bg-white hover:text-black font-semibold border shadow-2xl">
                  Submit
                </button>{" "}
              </Form.Item>
            </Form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CategoryEdit;
