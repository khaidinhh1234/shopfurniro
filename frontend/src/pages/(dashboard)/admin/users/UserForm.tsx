import instance from "@/configs/axios";
import { AuthContext, AuthContextType } from "@/contexts/AuthContext";

import { User } from "@/interfaces/User";
import { userSchema } from "@/untils/validations";
import { zodResolver } from "@hookform/resolvers/zod";

import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

const UserForm = () => {
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
      console.log(res.data);
      alert("Sua thành công");
      nav("/");
    } catch (error: any) {
      console.log(error);
      alert(error.response?.data?.message || "Error!");
    }
  };
  return (
    <div className="mt-10 mx-20">
      <h1>Edit user</h1>
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
          <img src={user?.avatar} alt="" className="w-40" />

          <input
            className="form-control"
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
  );
};

export default UserForm;
