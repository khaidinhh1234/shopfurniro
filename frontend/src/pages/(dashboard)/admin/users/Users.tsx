import { useQuery } from "@tanstack/react-query";
import { Breadcrumb } from "antd";
import axios from "axios";
import { Link } from "react-router-dom";
const Users = () => {
  const {
    data: users,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:8080/api/v1/auth/users");
      // console.log(res);
      return res.data;
    },
  });

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
        <Breadcrumb.Item>UsersPage</Breadcrumb.Item>
      </Breadcrumb>
      <div
        style={{
          padding: 24,
          minHeight: 360,
        }}
      >
        <div className="flex justify-between">
          <h1 className="text-4xl font-semibold">UsersPage</h1>
        </div>
        <div className="bg-white  px-4 mt-5 rounded-xl py-5 shadow-lg">
          <table className="table table-bodered table-striped ">
            <thead>
              <tr className="*:text-base text-center ">
                <th>ID</th>
                <th>
                  <p className="ml-3">Avatar</p>
                </th>
                <th>Username</th>
                <th>Email</th>

                <th>Vai trò</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="">
              {users.map((item: any, index: number) => (
                <tr key={item._id} className="text-center">
                  <td>
                    <p className="mt-10 ">{index + 1}</p>
                  </td>

                  <td>
                    <h3 className="mt-2   text-lg w-20   ">
                      {" "}
                      <img
                        src={item.avatar}
                        alt=""
                        className="w-20 mx-20 border p-1 bg-black/10"
                      />
                    </h3>
                  </td>
                  <td>
                    <h3 className="mt-8 text-lg ">{item.name}</h3>
                  </td>
                  <td>
                    <p className="mt-8 ">{item.email}</p>
                  </td>

                  <td>
                    <p
                      className={`px-1 mx-auto w-16 text-white mt-8 rounded-xl font-bold ${
                        item.role == "admin"
                          ? "bg-green-800  py-[2px]"
                          : "bg-blue-800 text-[15px]  py-[1px]"
                      }`}
                    >
                      {item.role}
                    </p>
                  </td>
                  <td>
                    <div className="mt-8">
                      <Link
                        to={`/admin/users/usersEdit/${item._id}`}
                        className="bg-black text-white px-3 py-2  rounded-md no-underline font-semibold"
                      >
                        Edit
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Users;
