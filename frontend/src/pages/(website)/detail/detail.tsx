import { useCart, useCartMutate } from "@/common/hook/useCart";

import useUserQuery from "@/common/hook/userQuery";
import { useLocalStorage } from "@/common/hook/useStoratge";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";

const DetailPage = () => {
  const [user] = useLocalStorage("user", {});
  const userId = user._id;
  const { id } = useParams();
  const {
    data: product,
    isLoading,
    isError,
  } = useUserQuery({
    action: `products/${id}`,
    id,
  });
  const [quantity, setQuantity] = useState(1);
  const handlequatity = (e: any) => {
    let inputValue = e.target.value;
    if (inputValue.length > 3) {
      inputValue = inputValue.slice(0, 3);
    }

    setQuantity(inputValue);
  };

  const { mutate } = useCartMutate();
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error</div>;
  }

  return (
    <>
      <div>
        <section className="review">
          <div className="container">
            <div className="review-info">
              <div className="review-howe">
                <Link to="/" className="review-home__link">
                  Home
                </Link>
              </div>
              <div className="review-home border-l border-black pl-5 ml-3">
                <Link to="/shop" className="review-home__link">
                  Shop
                </Link>
              </div>
              <div className="review-home border-l border-black  ml-3">
                <span className="">{product.name}</span>
              </div>
            </div>
          </div>
        </section>
        <section className="product">
          <div className="container">
            <div className="product-list">
              <div className="product-images">
                <div className="product-images__smail">
                  <div className="product-images__smailone border w-20 h-20 rounded-lg">
                    <img
                      src={product.feature_image}
                      alt="#"
                      className="product-images-size w-full h-full"
                    />
                  </div>
                  <div className="product-images__smailone border w-20 h-20 rounded-lg">
                    <img
                      src={product.feature_image}
                      alt="#"
                      className="product-images-size w-full h-full"
                    />
                  </div>
                  <div className="product-images__smailone border w-20 h-20 rounded-lg">
                    <img
                      src={product.feature_image}
                      alt="#"
                      className="product-images-size w-full h-full"
                    />
                  </div>
                  <div className="product-images__smailone border w-20 h-20 rounded-lg">
                    <img
                      src={product.feature_image}
                      alt="#"
                      className="product-images-size w-full h-full"
                    />
                  </div>
                </div>
                <div className="product-images__big ">
                  <img
                    src={product.feature_image}
                    alt="#"
                    className="product-images-size w-[490px] h-[550px]"
                  />
                </div>
              </div>
              <div className="product-info">
                <div className="product-name">
                  <h2 className="product-asgaard">{product.name}</h2>
                </div>
                <div className="product-price">
                  <span className="product-price_VND">
                    {product.regular_price.toLocaleString("vn-VN")} VND
                  </span>
                </div>
                <div className="product-evaluate">
                  <div className="product-evaluate__icon">
                    <i className="fa-solid fa-star text-[#FFD43B]"></i>
                    <i className="fa-solid fa-star text-[#FFD43B]"></i>
                    <i className="fa-solid fa-star text-[#FFD43B]"></i>
                    <i className="fa-solid fa-star text-[#FFD43B]"></i>
                    <i className="fa-solid fa-star text-[#FFD43B]"></i>
                  </div>
                  <div className="product-evaluate__review">
                    5 Customer Review
                  </div>
                </div>
                <div className="product-des">
                  <p className="product-des__document">{product.description}</p>
                </div>
                <div className="product-size">
                  <div className="product-size__name">
                    <span className="product-size__size">Size</span>
                  </div>
                  <div className=" flex gap-2">
                    <p className="product-size-L  bg-amber-800 px-[15px] py-[5px] rounded">
                      L
                    </p>

                    <p className="  bg-yellow-700 px-[10px] py-[5px] rounded">
                      XL
                    </p>

                    <p className=" bg-slate-500 px-[10px] py-[5px] rounded">
                      XS
                    </p>
                  </div>
                </div>
                {/* End productsize*/}
                {/* <div className="product-color">
                  <div className="product-color__name">
                    <span className="product-color__color">Color</span>
                  </div>
                  <div className="product-color__post space-x-2">
                    <a href="#">
                      {" "}
                      <span className="bg-black px-[14px] py-1 rounded-full" />
                    </a>
                    <a href="#">
                      {" "}
                      <span className="bg-red-500 px-[14px] py-1 rounded-full" />
                    </a>{" "}
                    <a href="#">
                      {" "}
                      <span className="bg-yellow-500 px-[14px] py-1 rounded-full" />
                    </a>
                  </div>
                </div> */}
                {/* End productcolor*/}
                <div className="product-btn mt-20">
                  <div className=" py-2 px-10 flex items-center border border-slate-900 rounded-xl  mr-2">
                    <button
                      className=" mr-5"
                      onClick={() =>
                        setQuantity(quantity > 1 ? quantity - 1 : quantity)
                      }
                    >
                      <i className="fa-solid fa-minus"></i>
                    </button>
                    <input
                      type="number"
                      id="numberInput"
                      className="text-center ring-white  py-2"
                      placeholder="0"
                      min="1"
                      max="999"
                      value={quantity}
                      onChange={handlequatity}
                    />{" "}
                    <div
                      className="product-btn-qua_button ml-5 text-base"
                      onClick={() =>
                        setQuantity(
                          quantity
                            ? quantity < 10
                              ? quantity + 1
                              : quantity
                            : 1
                        )
                      }
                    >
                      <i className="fa-solid fa-plus"></i>
                    </div>
                  </div>
                  <div className="product-btn-addtocart">
                    <button
                      className="product-btn-button"
                      onClick={() =>
                        mutate({
                          action: "add-to-cart",
                          product,
                          userId,
                          quantity,
                        })
                      }
                    >
                      <p className="product-btn-link pt-1">Add to Cart</p>
                    </button>
                  </div>
                  {/* <div className="product-btn-conmpare">
                    <button className="product-btn-button">
                      <a href="#" className="product-btn-link">
                        +Compare
                      </a>
                    </button>
                  </div> */}
                </div>{" "}
                {/* End productbtn*/}
                <hr className="product-hr" />
                <div className="product-footer">
                  <div className="product-footer-list">
                    <div className="product-footer--item">
                      <div className="product-footer-title">
                        {" "}
                        <span>SKU</span>
                      </div>
                      <div className="product-footer-title">
                        {" "}
                        <span>Category</span>
                      </div>
                      <div className="product-footer-title">
                        {" "}
                        <span>Tags</span>
                      </div>
                      <div className="product-footer-title">
                        {" "}
                        <span>Share</span>
                      </div>
                    </div>
                    <div className="product-footer-item">
                      <div className="product-footer-title">
                        : <span className="product-footer-sofa"> SS001</span>
                      </div>
                      <div className="product-footer-title">
                        : <span className="product-footer-sofa"> Sofas</span>
                      </div>
                      <div className="product-footer-title">
                        :
                        <span className="product-footer-sofa">
                          {" "}
                          Sofa, Chair, Home, Shop
                        </span>
                      </div>
                      <div className="product-footer-title">
                        :
                        <span className="product-footer-sofa">
                          {" "}
                          <img
                            src="./public/images/detail/icon-f.png"
                            alt="#"
                          />
                        </span>
                        <span className="product-footer-sofa">
                          {" "}
                          <img
                            src="./public/images/detail/icon-i.svg"
                            alt="#"
                          />
                          <span className="product-footer-sofa">
                            {" "}
                            <img
                              src="./public/images/detail/icon-t.svg"
                              alt="#"
                            />
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* End productFooter*/}
              </div>
            </div>
          </div>
        </section>
        {/* End product*/}
        <div className="container-fluid">
          <hr />
        </div>
        <section className="products-description">
          <div className="container">
            <div className="products-description__list">
              <div className="products-description__item">
                <h3 className="products-description__des">
                  <a
                    href="#"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    Description
                  </a>
                </h3>
              </div>
              <div className="products-description__item">
                <span className="products-description__add">
                  {" "}
                  <a
                    href="#"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    Additional Information
                  </a>
                </span>
              </div>
              <div className="products-description__item">
                <span className="products-description__re">
                  <a
                    href="#"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    Reviews [5]
                  </a>
                </span>
              </div>
            </div>
            <div className="products-description_main">
              <p className="products-description_excerpt">
                Embodying the raw, wayward spirit of rock ‘n’ roll, the Kilburn
                portable active stereo speaker takes the unmistakable look and
                sound of Marshall, unplugs the chords, and takes the show on the
                road.
              </p>
              <p className="products-description_excerpt">
                Weighing in under 7 pounds, the Kilburn is a lightweight piece
                of vintage styled engineering. Setting the bar as one of the
                loudest speakers in its class, the Kilburn is a compact,
                stout-hearted hero with a well-balanced audio which boasts a
                clear midrange and extended highs for a sound that is both
                articulate and pronounced. The analogue knobs allow you to fine
                tune the controls to your personal preferences while the
                guitar-influenced leather strap enables easy and stylish travel.
              </p>
            </div>
            <div className="products-description_footer">
              <img
                src="https://picsum.photos/id/49/605/348"
                alt="#"
                className="products-description_footer_img"
              />
              <img
                src="https://picsum.photos/id/53/605/348"
                alt="#"
                className="products-description_footer_img"
              />
            </div>
          </div>
        </section>
        <div className="container-fluid">
          <hr />
        </div>
        <section className="related">
          <div className="container">
            <div className="related-title">
              <span className="related-title-name">Related Products</span>
            </div>
            <div className="related-list">
              <div className="related-item">
                <div className="related-image">
                  <img
                    src="https://picsum.photos/id/893/76/80"
                    alt="#"
                    className="related__thumbnail"
                  />
                  <span className="related-new">New</span>
                </div>
                <div className="related-info">
                  <h3 className="related__name">
                    <a href="#" className="related__link">
                      products
                    </a>
                  </h3>
                  <a href="#" className="related__category">
                    cmt
                  </a>
                  <div className="related-price">
                    <span className="related-price__new">200000 đ</span>
                    <del className="related-price__old" />
                  </div>
                </div>
                <div className="related-actions">
                  <button className="btn related-action__quickview">
                    <Link to={`/detail`} className="related-action__link">
                      Quick View
                    </Link>
                  </button>
                  <button className="btn related-action__addtocart">
                    <a href="" className="related-action__link">
                      Add to Cart
                    </a>
                  </button>
                  <div className="related-actions-more">
                    <span className="related-action__share">Share</span>
                    <span className="related-action__compare">Compare</span>
                    <span className="related-action__like">Like</span>
                  </div>
                </div>
              </div>

              {/*End .related-item*/}
            </div>
            <div className="show">
              <button className="show-btn "> </button>
            </div>
          </div>
        </section>
      </div>
      ;
    </>
  );
};

export default DetailPage;
