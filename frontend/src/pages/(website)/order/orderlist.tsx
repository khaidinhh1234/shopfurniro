import { useCart } from "@/common/hook/useCart";
import { useOrder } from "@/common/hook/useOrder";

import { useLocalStorage } from "@/common/hook/useStoratge";
import { IProduct } from "@/common/types/product";
import useraddresssSchema from "@/untils/userassdress";
import { zodResolver } from "@hookform/resolvers/zod";

import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Orderlist = () => {
  const [user] = useLocalStorage("user", {});

  const userId = user?._id;
  const { data: cart, isLoading, isError, error } = useCart({ userId });
  const nav = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(useraddresssSchema),
  });
  const { mutate } = useOrder();
  const onsubmit = async (data: any) => {
    if (data.payment === "bank") {
      return mutate({
        userId,
        customerName: data,
        totalPrice: cart?.finalTotalPrice + 25000,
        items: cart?.products,
      });
    } else {
      return mutate({
        userId,
        customerName: data,
        totalPrice: cart?.finalTotalPrice + 25000,
        items: cart?.products,
      });
      nav("/");
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error: {error?.message}</div>;
  }
  return (
    <>
      {" "}
      <div className="container-fluid">
        <section className="bill">
          {" "}
          <form onSubmit={handleSubmit(onsubmit) as SubmitHandler<any>}>
            <div className="container">
              <div className="bill-info">
                <div className="bill-details">
                  <div className="bill-title">
                    <h1 className="bill-title-h1">Chi tiết thanh toán</h1>
                  </div>

                  <div className="bill-form">
                    <label htmlFor="firtname" className="bill-formlable">
                      Họ và Tên của bạn
                    </label>
                    <br />
                    <input
                      type="text"
                      className={`bill-forminput mb-0 ${
                        errors?.name?.message ? "border-red-500 " : ""
                      }`}
                      placeholder=" Tên của bạn "
                      {...register("name", { required: true })}
                    />
                    <br />
                    {errors.name && (
                      <span className="text-danger">
                        {String(errors.name.message)}
                      </span>
                    )}
                  </div>

                  <div className="bill-form">
                    <label htmlFor="comparyname" className="bill-formlable">
                      Địa chỉ đường phố
                    </label>
                    <br />
                    <input
                      type="text"
                      {...register("address", { required: true })}
                      className={`bill-forminput mb-0 ${
                        errors?.address?.message ? "border-red-500 " : ""
                      }`}
                      placeholder="Địa chỉ của bạn "
                    />
                    <br />
                    {errors.address && (
                      <span className="text-red-500">
                        {String(errors.address.message)}
                      </span>
                    )}
                  </div>
                  <div className="bill-form">
                    <label htmlFor="comparyname" className="bill-formlable">
                      Thị trấn / Thành phố
                    </label>
                    <br />
                    <input
                      type="text"
                      {...register("city", { required: true })}
                      className={`bill-forminput mb-0 ${
                        errors?.city?.message ? "border-red-500 " : ""
                      }`}
                      placeholder="Thành Phố "
                    />
                    <br />
                    {errors.city && (
                      <span className="text-red-500">
                        {String(errors.city.message)}
                      </span>
                    )}
                  </div>

                  <div className="bill-form">
                    <label htmlFor="comparyname" className="bill-formlable">
                      Số điện thoại
                    </label>
                    <br />
                    <input
                      type="tel"
                      {...register("phone", {
                        required: true,
                        minLength: 10,
                        maxLength: 11,
                        valueAsNumber: true,
                      })}
                      className={`bill-forminput mb-0 ${
                        errors?.phone?.message ? "border-red-500 " : ""
                      }`}
                      placeholder="số điện thoại  "
                    />
                    <br />
                    {errors.phone && (
                      <span className="text-red-500">
                        Vui lòng nhập số điện thoại
                      </span>
                    )}
                  </div>

                  <div className="bill-additional">
                    <input
                      type="text"
                      {...register("additional")}
                      className="bill-forminput"
                      placeholder="Additional information"
                    />
                  </div>
                </div>
                <div className="bill-checkout">
                  {cart?.products &&
                    cart?.products.map((product: IProduct, index: number) => (
                      <div
                        className=" border-1 border-orange-400 w-75 rounded-md "
                        key={index}
                      >
                        <div className="grid grid-cols-4 p-2 border-2 ">
                          <div className="p-2 col-span-1">
                            <img
                              src={Array.isArray(product.feature_image) ? product.feature_image[0] : product.feature_image ?? ""}
                              alt=""
                              className="w-full h-24 p-1"
                            />
                          </div>
                          <div className="p-4 col-span-3">
                            {" "}
                            <h4 className="truncate w-64 text-2xl">
                              {product.name}
                            </h4>
                            <span>
                              {product.regular_price.toLocaleString("vn-VN")}{" "}
                              VND
                            </span>
                          </div>
                        </div>

                        <div className="p-2">
                          <span>Sản phẩm : {product.quantity}</span>
                          <br />

                          <h5>
                            {" "}
                            Tổng tiền:{" "}
                            {(
                              product.regular_price * (product.quantity ?? 0)
                            ).toLocaleString("vn-VN")}
                            đ
                          </h5>
                        </div>
                      </div>
                    ))}{" "}
                  <div className="bill-total">
                    <div className="bill-total-name pt-2">
                      <span className="bill-name_products">
                        Sản phẩm ( {cart.totalQuantity} )
                      </span>{" "}
                      {cart &&
                        cart.products.map(
                          (product: IProduct, index: number) => (
                            <p key={index} className="flex mt-2">
                              <p className="truncate w-32 mr-5 ">
                                {product.name}
                              </p>{" "}
                              x {product.quantity}
                            </p>
                          )
                        )}
                      <span className="bill-name_total">
                        Phí Ship Giao hàng{" "}
                      </span>
                      <span className="bill-name_total text-2xl">
                        Tổng tiền
                      </span>
                    </div>

                    <div className="bill-price">
                      <span className="text-2xl font-semibold mt-3">
                        Tổng cộng
                      </span>
                      {cart &&
                        cart.products.map(
                          (product: IProduct, index: number) => (
                            <span
                              key={index}
                              className="bill-price_item mt-2 mb-3"
                            >
                              {product.regular_price.toLocaleString()} VND
                            </span>
                          )
                        )}

                      <span className=" my-3"> 25.000 đ</span>
                      <span className="bill-price_total">
                        {(25000 + cart.finalTotalPrice).toLocaleString()} đ
                      </span>
                    </div>
                  </div>
                  <hr />
                  <div className="bill-bank">
                    <div className="bill-bank-radio">
                      <span className="bill-bank-black">
                        <img src="./public/images/checkout/cham.svg" alt="" />
                      </span>
                      <span className="bill-bank_name">Chuyển khoản</span>
                    </div>
                    <p className="bill-bank_des1">
                      Thanh toán trực tiếp vào tài khoản ngân hàng của chúng
                      tôi. Vui lòng sử dụng Mã đơn hàng của bạn làm tham chiếu
                      thanh toán. Đơn hàng của bạn sẽ không được giao cho đến
                      khi tiền được chuyển vào tài khoản của chúng tôi.
                    </p>
                    <div className="bill-bank-radio">
                      {errors.payment && (
                        <span className="text-red-500">
                          Vui lòng chọn phương thức thanh toán
                        </span>
                      )}{" "}
                      <br />
                      <input
                        type="radio"
                        {...register("payment", { required: true })}
                        value="bank"
                        className="bill-bank_input"
                      />
                      <span className="bill-bank_name">
                        Chuyển khoản trực tiếp
                      </span>
                    </div>
                    <div className="bill-bank-radio">
                      <input
                        type="radio"
                        {...register("payment", { required: true })}
                        value="paypal"
                        className="bill-bank_input"
                      />
                      <span className="bill-bank_name">
                        Thanh toán khi giao hàng
                      </span>
                    </div>
                    <p className="bill-bank_des2">
                      Dữ liệu cá nhân của bạn sẽ được sử dụng để hỗ trợ trải
                      nghiệm của bạn trên toàn bộ trang web này, để quản lý
                      quyền truy cập vào tài khoản của bạn và cho các mục đích
                      khác được mô tả trong chính sách bảo mật của chúng tôi.
                    </p>
                  </div>
                  <div className="bill-btn">
                    <button type="submit" className={`bill-button border `}>
                      Đặt hàng
                    </button>
                  </div>
                </div>
              </div>
            </div>{" "}
          </form>
        </section>
      </div>
    </>
  );
};

export default Orderlist;
