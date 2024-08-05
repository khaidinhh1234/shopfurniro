import useUserQuery from "@/common/hook/userQuery";
import { ICategory } from "@/common/types/category";

import { IProduct } from "@/common/types/product";
import instance from "@/configs/axios";

import { Loading3QuartersOutlined, PlusOutlined } from "@ant-design/icons";
import { useMutation } from "@tanstack/react-query";
import {
  Breadcrumb,
  Checkbox,
  Form,
  FormProps,
  Image,
  Input,
  InputNumber,
  message,
  Select,
  Upload,
  UploadFile,
  UploadProps,
} from "antd";

import TextArea from "antd/es/input/TextArea";
import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

const ProductsAdd = () => {
  const nav = useNavigate();
  const [form] = Form.useForm();
  const { data: category, isLoading } = useUserQuery({
    action: "category",
  });
  const { mutate, isPending } = useMutation({
    mutationFn: async (data) => {
      try {
        const res = await instance.post(`/v1/products`, data);

        return res.data;
      } catch (error) {
        return error;
      }
      // console.log(data);
    },
    onSuccess: () => {
      message.open({
        type: "success",
        content: "Thêm sản phẩm thành công",
      });
      form.resetFields();
      setTimeout(() => {
        nav("/admin/products");
      }, 1000);
    },
    onError: (error: any) => {
      message.open({
        type: "error",
        content: error?.response?.data?.message || "Có lỗi xảy ra",
      });
    },
  });
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  // console.log(fileList);
  const getBase64 = (file: any): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as any);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  const onFinish: FormProps<IProduct>["onFinish"] = (values: any) => {
    const feature_image = fileList
      .filter((file) => file.status === "done")
      .map((file) => file.response?.secure_url);
    mutate({ ...values, feature_image });
    // mutate(values);
  };

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <div>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Admin</Breadcrumb.Item>
          <Breadcrumb.Item>ProductsPage / Add New Product</Breadcrumb.Item>
        </Breadcrumb>
        <div
          style={{
            padding: 24,
            minHeight: 360,
          }}
        >
          <div className="flex justify-between">
            <h1 className="text-4xl font-semibold">Add New Product</h1>
            <button>
              <Link
                to={"/admin/products"}
                className="mr-5 hover:bg-black shadow-2xl  border border-black/40 px-3 py-2 font-medium text-[16px] rounded-[5px] hover:text-white"
              >
                Quay Lại
              </Link>
            </button>
          </div>
          <div className="bg-white  px-4 mt-5 rounded-xl py-5 shadow-lg max-w-6xl  mx-10">
            <Form
              form={form}
              name="basic"
              layout={"vertical"}
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 24 }}
              style={{ maxWidth: 1000 }}
              className="mx-10 my-5"
              // initialValues={{ remember: true }}
              onFinish={onFinish}
              autoComplete="off"
            >
              <div className="grid grid-cols-2 gap-5">
                <Form.Item
                  label="Tên sản phẩm"
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: "Tên sản phẩm bắt buộc phải nhập!",
                    },
                  ]}
                >
                  <Input placeholder="Nhập tên sản phẩm" />
                </Form.Item>
                <Form.Item label="Danh mục sản phẩm" name="category">
                  <Select
                    defaultValue="Vui long chon danh muc"
                    className="w-[490px]"
                    // onChange={handleChange}
                    options={
                      category?.map((item: ICategory) => ({
                        value: item._id,
                        label: item.name,
                      })) || []
                    }
                  />
                </Form.Item>
              </div>
              <div className="grid grid-cols-2 gap-5">
                <Form.Item
                  label="Giá gốc sản phẩm"
                  name="discount"
                  rules={[
                    {
                      required: true,

                      message: "Giá gốc sản phẩm bắt buộc phải nhập!",
                    },
                  ]}
                >
                  <InputNumber
                    placeholder="Nhập giá gốc sản phẩm"
                    className="w-[475px]"
                    min={0}
                  />
                </Form.Item>{" "}
                <Form.Item
                  label="Giá khuyến mãi"
                  name="regular_price"
                  rules={[
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || value < getFieldValue("discount")) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error("Giá khuyến mãi phải nhỏ hơn giá sản phẩm!")
                        );
                      },
                    }),
                  ]}
                >
                  <InputNumber
                    placeholder="Nhập giá gốc sản phẩm"
                    className="w-[490px]"
                  />
                </Form.Item>{" "}
              </div>
              <div className="grid grid-cols-2 gap-5">
                <Form.Item
                  label="Mô tả sản phẩm"
                  name="description"
                  rules={[
                    {
                      required: true,
                      message: "Tên sản phẩm bắt buộc phải nhập!",
                    },
                  ]}
                >
                  <TextArea rows={5} placeholder="Nhập mô tả sản phẩm" />
                </Form.Item>
                <div>
                  <Form.Item
                    className=""
                    label="Ảnh nổi bật "
                    name="feature_image"
                  >
                    <Upload
                      action="https://api.cloudinary.com/v1_1/dpypwbeis/image/upload"
                      data={{ upload_preset: "ml_default" }}
                      listType="picture-card"
                      fileList={fileList}
                      onPreview={handlePreview}
                      onChange={handleChange}
                    >
                      {fileList.length >= 1 ? null : uploadButton}
                    </Upload>
                    {previewImage && (
                      <Image
                        wrapperStyle={{ display: "none" }}
                        preview={{
                          visible: previewOpen,
                          onVisibleChange: (visible) => setPreviewOpen(visible),
                          afterOpenChange: (visible) =>
                            !visible && setPreviewImage(""),
                        }}
                        src={previewImage}
                      />
                    )}{" "}
                  </Form.Item>{" "}
                  <Form.Item
                    label="Sản phẩm nổi bật"
                    name="featured"
                    valuePropName="checked"
                    // initialValue={false}
                  >
                    <Checkbox />
                  </Form.Item>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-5">
                <Form.Item
                  className=""
                  label="số lượng sản phẩm"
                  name="countIn_stock"
                  rules={[
                    {
                      required: true,
                      message: "Số lượng sản phẩm bắt buộc phải nhập!",
                    },
                  ]}
                >
                  <Input placeholder="Nhập số lượng sản phẩm" />
                </Form.Item>{" "}
              </div>
              <Form.Item>
                <button
                  type="submit"
                  className="px-3 py-2 bg-black text-white rounded-lg"
                >
                  {isPending ? (
                    <>
                      <Loading3QuartersOutlined className="animate-spin" />{" "}
                      Submit
                    </>
                  ) : (
                    "Submit"
                  )}
                </button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsAdd;
