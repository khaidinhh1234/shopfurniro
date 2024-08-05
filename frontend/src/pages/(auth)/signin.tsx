import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useAuth } from "@/contexts/AuthContext";
import { User } from "@/interfaces/User";
import { loginSchema } from "@/untils/validations";
import { Link } from "react-router-dom";
import instance from "@/configs/axios";

const Signin = () => {
  const { login: contextLogin } = useAuth();
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<User>({
    resolver: zodResolver(loginSchema),
  });
  const onSubmit = async (data: User) => {
    try {
      const res = await instance.post(`/v1/auth/signin`, data);
      contextLogin(res.data.accessToken, res.data.user);
    } catch (error: any) {
      console.log(error);
      alert(error.response?.data?.message || "Error!");
    }
  };
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src="../src/assets/images/logo.svg"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Đăng nhập
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            action="#"
            method="POST"
            className="space-y-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Địa chỉ email
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  type="email"
                  placeholder="email@gmail.com"
                  required
                  autoComplete="email"
                  className="block w-full rounded-md border py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <span className="text-danger">{errors.email.message}</span>
                )}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Mật khẩu
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  type="password"
                  placeholder="**********"
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md border py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  {...register("password", { required: true })}
                />
                {errors.password && (
                  <span className="text-danger">{errors.password.message}</span>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Đăng nhập
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Chưa là thành viên?{" "}
            <Link
              to="/signup"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Tôi chưa có tài khoản
            </Link>
          </p>
          <p className="mt-10 text-center text-sm text-gray-500">
            Tôi đã quên mật khẩu?{" "}
            <Link
              to="/forgotPassword"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Quên mật khẩu
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Signin;
