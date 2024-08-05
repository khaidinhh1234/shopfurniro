import { ship } from "@/assets/img";
import { useCart, useCartMutate } from "@/common/hook/useCart";
import { useLocalStorage } from "@/common/hook/useStoratge";

const Cart = () => {
  const [user] = useLocalStorage("user", {});
  const userId = user?._id;

  const { data: cart, isLoading, isError, error } = useCart({ userId });
  const { mutate } = useCartMutate();
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  return (
    <div>
      <section className="cart">
        <div className="container">
          <div className="cart-info">
            <div className="cart-table">
              <div className="cart-table-title">
                <span className="cart-table-title__name">Sản phẩm</span>
                <span className="cart-table-title__price">Giá</span>
                <span className="cart-table-title__name">Số Lượng</span>
                <span className="mx-14">Tổng</span>
              </div>
              {cart?.products && cart?.products.length > 0 ? (
                cart?.products.map((item: string | any) => (
                  <div className="flex items-center  gap-12 my-4">
                    <div className="  ">
                      <img
                        className="border rounded w-20 h-20 p-1"
                        src={item.feature_image}
                        alt=""
                      />
                    </div>{" "}
                    <span className="truncate w-32">{item.name}</span>
                    <span className="">
                      {item.regular_price.toLocaleString()}
                    </span>
                    <div className="lg:mt-0 mb:mt-[12.5px] flex items-center *:grid *:place-items-center *:lg:w-9 *:lg:h-9 *:mb:w-8 *:mb:h-8 ">
                      <button
                        onClick={() =>
                          mutate({
                            action: "descrease",
                            product: item,
                            quantity: 1,
                            userId,
                          } as any)
                        }
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={12}
                          height={12}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-minus text-xs"
                        >
                          <path d="M5 12h14" />
                        </svg>
                      </button>
                      <div
                        className={`bg-[#F4F4F4] text-xs rounded mx-2 ${
                          item.quantity <= 10 ? "text-black" : `text-red-500 `
                        }`}
                      >
                        {item.quantity}
                      </div>
                      <button
                        onClick={() =>
                          mutate({
                            action: "inscrease",
                            product: item,
                            quantity: 1,
                            userId,
                          } as any)
                        }
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={12}
                          height={12}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-plus text-xs"
                        >
                          <path d="M5 12h14" />
                          <path d="M12 5v14" />
                        </svg>
                      </button>
                    </div>
                    <div className="flex">
                      <span className="mx-2">
                        {(item.regular_price * item.quantity).toLocaleString(
                          "vn-VN"
                        )}{" "}
                      </span>
                      <button
                        className="ml-20"
                        onClick={() =>
                          mutate({
                            action: "delete-product",
                            product: item,

                            userId,
                          } as any)
                        }
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 448 512"
                          className="w-7 h-7"
                        >
                          <path
                            fill="#812709"
                            d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="empty-cart text-2xl text-center mt-10 mx-32 font-semibold">
                  <p>
                    <img src={ship} alt="" />
                  </p>
                </div>
              )}
            </div>
            <div className="cart-totals">
              <div className="cart-totals-title">Tổng số giỏ hàng</div>
              <div className="cart-totals-info">
                <div className="cart-totals_item">
                  <span className="cart-totals_name">Tổng </span>
                  <span className="cart-totals_name">Tổng cộng :</span>
                </div>
                <div className="cart-totals_item">
                  <span className="cart-totals_priceA">
                    {cart?.totalPrice.toLocaleString()} VND
                  </span>
                  <span className="cart-totals_priceB">
                    {cart?.finalTotalPrice.toLocaleString()} VND
                  </span>
                </div>
              </div>
              <div className="cart-totals">
                <button className="">
                  <a
                    href="/orders"
                    className={`cart-totals_link  text-white     hover:text-white px-10 py-3 rounded-2xl ${
                      cart.products.length === 0
                        ? "cursor-not-allowed bg-[#b88e2f]"
                        : cart.products.some((item: any) => item.quantity > 10)
                        ? "cursor-not-allowed px-3 bg-[#b88e2f]"
                        : "hover:bg-[#b88e2f]  bg-[#b88e2f]/50"
                    }`}
                  >
                    {cart.products.length === 0
                      ? "Giỏ hàng trống"
                      : cart.products.some((item: any) => item.quantity > 10)
                      ? "Chỉ được mua số lượng 10 của mỗi sản phẩm"
                      : "Mua Hàng"}
                  </a>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Cart;
