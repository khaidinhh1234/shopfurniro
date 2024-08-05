import { ICategory } from "@/common/types/category";
import { Button } from "@/components/ui/button";
import instance from "@/configs/axios";

import { BackwardFilled } from "@ant-design/icons";
import { useMutation } from "@tanstack/react-query";
import { Form, FormProps, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";

const CategoryAdd = () => {
  const nav = useNavigate();
  const [form] = Form.useForm();
  const { mutate, isPending } = useMutation({
    mutationFn: async (formdata: ICategory) => {
      try {
        const response = await instance.post(`/v1/category`, formdata);
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
        content: "thêm danh mục thành công",
      });
      form.resetFields();
    },
    onError: (error) => {
      message.open({
        type: "error",
        content: error.message,
      });
    },
  });
  const onFinish: FormProps<ICategory>["onFinish"] = (values) => {
    mutate(values);
  };

  return (
    <div>
      <div>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <div className="flex items-center  justify-between">
            <h1 className="text-lg font-semibold md:text-2xl mr-5 ">
              {" "}
              Add new category
            </h1>

            <Link to={"/admin/category"}>
              <Button className=" bg-black  text-white hover:bg-slate-200 hover:text-black hover:shadow-lg  shadow-slate-600/50 text-[16px] mx-4">
                <BackwardFilled className="mr-1" /> Quay lại
              </Button>
            </Link>
          </div>
          <div className="max-w-3xl   border px-10 mt-5 py-10 bg-white rounded-[10px]">
            {" "}
            <Form
              name="basic"
              layout="vertical"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              style={{ maxWidth: 600 }}
              disabled={isPending}
              onFinish={onFinish}
            >
              <Form.Item<ICategory>
                label="Danh mục "
                name="name"
                rules={[
                  { required: true, message: "Vui lòng nhập tên danh mục!" },
                ]}
              >
                <Input placeholder="Nhập tên danh mục" />
              </Form.Item>
              <Form.Item<ICategory>>
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

export default CategoryAdd;
