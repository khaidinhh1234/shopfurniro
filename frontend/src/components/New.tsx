import { useCartMutate } from "@/common/hook/useCart";
import useUserQuery from "@/common/hook/userQuery";
import { useLocalStorage } from "@/common/hook/useStoratge";

const New = () => {
  const [user] = useLocalStorage("user", {});
  const userId = user?._id;
  const {
    data: products,
    isLoading,
    isError,
    error,
  } = useUserQuery({
    action: "products",
  });
  const { mutate } = useCartMutate();
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  return (
    <>
      <section className="news">
        <div className="container">
          <div className="section-body">
            <div className="products-list">
              {products?.map(
                (product: any, index: number) =>
                  product.featured && (
                    <div className="products-item" key={index}>
                      <div className="products-image">
                        <img
                          src={product.feature_image}
                          alt="#"
                          className="products__thumbnail"
                        />
                        <span className="products-sale bg-green-600">New</span>
                      </div>
                      <div className="products-info">
                        <h3 className="products__name h-14">
                          <a href="#" className="products__link  ">
                            {product.name}
                          </a>
                        </h3>
                        <a
                          href="#"
                          className="products__category line-clamp-3 max-w-xs "
                        >
                          {product.description}
                        </a>
                        <div className="products-price mt-4">
                          <span className="products-price__new">
                            {product.regular_price.toLocaleString()} VND
                          </span>
                          <del className="products-price__old">
                            {product.discount.toLocaleString()} VND
                          </del>
                        </div>
                      </div>
                      <div className="products-actions">
                        <button className="">
                          <a
                            href={`/detail/${product._id}`}
                            className=" border  bg-white/50 rounded hover:bg-white text-black px-5 py-2 products-action__link "
                          >
                            Quick View
                          </a>
                        </button>
                        <button
                          className="btn products-action__addtocart"
                          onClick={() =>
                            mutate({
                              action: "add-to-cart",
                              product,
                              quantity: 1,
                              userId,
                            })
                          }
                        >
                          <p className="products-action__link border py-2 bg-white/50 rounded hover:bg-white ">
                            Add to Cart
                          </p>
                        </button>
                        <div className="products-actions-more *:mx-2">
                          <span className="products-action__share">Share</span>
                          <span className="products-action__compare">
                            Compare
                          </span>
                          <span className="products-action__like">Like</span>
                        </div>
                      </div>
                    </div>
                  )
              )}

              {/*End .product-item*/}
            </div>{" "}
          </div>{" "}
        </div>
      </section>
      {/*End .news*/}
    </>
  );
};

export default New;
