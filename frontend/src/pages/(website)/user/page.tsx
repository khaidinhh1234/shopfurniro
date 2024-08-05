import instance from "@/configs/axios";
import { AuthContext, AuthContextType } from "@/contexts/AuthContext";

import { User } from "@/interfaces/User";
import { userSchema } from "@/untils/validations";
import { zodResolver } from "@hookform/resolvers/zod";

import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const UserPage = () => {
  const [avatar, setAvatar] = useState<string>("");
  const { user } = useContext(AuthContext) as AuthContextType;
  const { id } = useParams();
  const nav = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<User>({
    resolver: zodResolver(userSchema),
  });

  if (id) {
    useEffect(() => {
      (async () => {
        const { data } = await instance.get(`/v1/auth/users/${id}`);
        setAvatar(data.avatar);
        reset(data);
      })();
    }, [id]);
  }

  const onSubmit = async (data: User) => {
    try {
      const res = await instance.put(`/v1/auth/users/${id}`, {
        name: data.name,
        email: data.email,
        password: data.password,
        avatar: data.avatar,
      });
      //   console.log(res.data);
      toast.success("Sua thành công");
      nav("/");
    } catch (error: any) {
      //   console.log(error);
      toast.error(error.response?.data?.message || "Error!");
    }
  };
  return (
    <div className="mt-10 mx-auto max-w-7xl flex">
      <div className="w-[50%]">
        <h1 className="text-4xl">Thông tin cá nhân</h1>
        <div>
          {user && user.name ? (
            <div className="flex items-center mt-5">
              <img
                src={avatar}
                alt=""
                className="w-28 h-28 rounded-full border border-gray-300"
              />
              <div className="ml-5">
                <h3 className="text-2xl font-semibold">{user.name}</h3>
                <p className="text-gray-500 text-xl">{user.email}</p>
              </div>{" "}
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="w-[50%]">
        <h2>Cập nhật tài khoản </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className=" bg-white py-5 px-8 shadow-2xl shadow-black mt-4 mb-10 rounded-xl"
        >
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              className="form-control"
              type="text"
              {...register("name", { required: true })}
            />
            {errors.name && (
              <span className="text-danger">{errors.name.message}</span>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              className="form-control"
              type="email"
              readOnly
              {...register("email", { required: true })}
            />
            {errors.email && (
              <span className="text-danger">{errors.email.message}</span>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              className="form-control"
              type="password"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <span className="text-danger">{errors.password.message}</span>
            )}
          </div>
          <div className="mb-3">
            <span className="w-40 h-40 my-2">
              <img src={avatar} alt="" className="w-40 h-40" />
            </span>
            <input
              className="form-control my-2"
              type="text"
              {...register("avatar", { required: true })}
            />
            {errors.avatar && (
              <span className="text-danger">{errors.avatar.message}</span>
            )}
          </div>

          <div className="mb-3">
            <button className="btn btn-primary w-40">Cập nhập</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserPage;
