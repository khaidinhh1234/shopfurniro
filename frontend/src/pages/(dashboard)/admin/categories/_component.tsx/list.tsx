import useUserQuery from "@/common/hook/userQuery";
import { ICategory } from "@/common/types/category";
import instance from "@/configs/axios";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Breadcrumb, message, Table, TableColumnsType } from "antd";

import { Link } from "react-router-dom";

const List = () => {
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useUserQuery({ action: "category" });

  const category = data?.map((item: ICategory, index: number) => ({
    ...item,
    key: index + 1,
  }));
  const { mutate } = useMutation({
    mutationFn: async (id: string) => {
      const res = await instance.delete(`/v1/category/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["Categories_Key"],
      });
      message.open({
        type: "success",
        content: "Xoá danh mục thành công",
      });
    },
    onError: (error) => {
      message.open({
        type: "error",
        content: error.message,
      });
    },
  });
  const createFilters = (categoris: ICategory[]) => {
    return categoris
      .map((category: ICategory) => category.name)
      .filter(
        (value: string, index: number, self: string[]) =>
          self.indexOf(value) === index
      )
      .map((name: string) => ({ text: name, value: name }));
  };
  const columns: TableColumnsType<ICategory> = [
    {
      title: "ID",
      dataIndex: "key",
      key: "key",
      width: "10%",
    },
    {
      key: "name",
      dataIndex: "name",
      title: "Tên sản phẩm",
      filterSearch: true,
      filters: category ? createFilters(category) : [],
      onFilter: (value: Boolean | any, category: ICategory) => {
        return category.name.includes(value);
      },
      sorter: (a: ICategory, b: ICategory) => a.name.localeCompare(b.name),
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div>
          {" "}
          <button
            className="bg-black text-white px-4 py-1 font-medium rounded-[5px] mr-1"
            onClick={() => mutate(record._id!)}
          >
            Xoá
          </button>
          <button className="bg-black text-white px-4 py-1 font-medium rounded-[5px]">
            <Link to={`edit/${record._id}`}>Edit</Link>
          </button>
        </div>
      ),
    },
  ];
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error: {isError?.toString()}</div>;
  }
  return (
    <div>
      <div>
        <Breadcrumb style={{ margin: "0px 30px" }}>
          <Breadcrumb.Item>Admin</Breadcrumb.Item>
          <Breadcrumb.Item>CategoryPage</Breadcrumb.Item>
        </Breadcrumb>
        <div
          style={{
            padding: 24,
            minHeight: 360,
          }}
        >
          <div className="flex justify-between">
            <h1 className="text-4xl font-semibold">CategoryPage</h1>
            <button>
              <Link
                to={"/admin/category/add"}
                className="mr-20 hover:bg-black px-3 py-2 font-medium text-[16px] rounded-[5px] hover:text-white border border-black"
              >
                Add New Category
              </Link>
            </button>
          </div>
          <div className="bg-white  px-6 mt-10 rounded-xl py-5 shadow-lg max-w-4xl">
            <Table
              columns={columns}
              dataSource={category}
              //   onChange={onChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
