import useUserQuery from "@/common/hook/userQuery";
import { DataTable } from "./list/data-table";
import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";
import { columns } from "./list/columns";

const List = () => {
  const { data, isLoading, isError, error } = useUserQuery({
    action: "orders",
  });
  console.log(data);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  return (
    <div>
      <Breadcrumb style={{ margin: "0px 30px" }}>
        <Breadcrumb.Item>Admin</Breadcrumb.Item>
        <Breadcrumb.Item>OrderPage</Breadcrumb.Item>
      </Breadcrumb>
      <div
        style={{
          padding: 24,
          minHeight: 360,
        }}
      >
        <div className="flex justify-between">
          <h1 className="text-4xl font-semibold">OrderPage</h1>
          {/* <button>
            <Link
              to={"/admin/products/add"}
              className="mr-5 hover:bg-black px-3 py-2 font-medium text-[16px] rounded-[5px] hover:text-white border border-black"
            >
              Add New Product
            </Link>
          </button> */}
        </div>
        <div className="bg-white  px-4 mt-5 rounded-xl py-5 shadow-lg">
          <DataTable columns={columns as any} data={data} />
        </div>
      </div>
    </div>
  );
};

export default List;
