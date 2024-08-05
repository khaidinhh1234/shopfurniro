import { useState } from "react";
import useUserQuery from "@/common/hook/userQuery";
import { ICategory } from "@/common/types/category";
import { IProduct } from "@/common/types/product";
import { Select } from "antd";
import { useLocalStorage } from "@/common/hook/useStoratge";
import { useCartMutate } from "@/common/hook/useCart";

const { Option } = Select;

const CategoryDetail = () => {
  const { data: categories, isLoading: isCategoryLoading } = useUserQuery({
    action: "category",
  });
  const { data: products, isLoading: isProductLoading } = useUserQuery({
    action: "products",
  });

  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const handleChange = (value: string) => {
    setSelectedCategory(value);
  };
  const [user] = useLocalStorage("user", {});
  const userId = user?._id;

  const { mutate } = useCartMutate();
  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products?.filter(
          (product: any) =>
            product.category && product.category._id === selectedCategory
        );

  if (isCategoryLoading || isProductLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <section className="shop">
        <div className="container">
          <div className="section-heading">
            <h2 className="section-heading__title">Danh mục sản phẩm</h2>
          </div>
          <Select
            value={selectedCategory}
            style={{ width: 200 }}
            onChange={handleChange}
          >
            <Option value="all">Tất cả</Option>
            {categories?.map((category: ICategory) => (
              <Option key={category._id} value={category._id}>
                {category.name}
              </Option>
            ))}
          </Select>
          <div className="container mt-10">
            <div className="section-body">
              <div className="products-list">
                {filteredProducts?.length > 0 ? (
                  filteredProducts.map((product: any) => (
                    <div className="products-item" key={product._id}>
                      <div className="products-image">
                        <img
                          src={product.feature_image}
                          alt="#"
                          className="products__thumbnail"
                        />
                        <span
                          className={`products-sale  ${
                            product.featured ? "bg-green-600" : "bg-red-400"
                          }`}
                        >
                          {product.featured ? "New" : "Sale"}
                        </span>
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
                        <div className="products-price">
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
                        <button className="btn products-action__addtocart">
                          <p
                            className="products-action__link border py-2 bg-white/50 rounded hover:bg-white "
                            onClick={() =>
                              mutate({
                                action: "add-to-cart",
                                product,
                                quantity: 1,
                                userId,
                              })
                            }
                          >
                            Add to Cart
                          </p>
                        </button>
                        <div className="products-actions-more">
                          <span className="products-action__share">Share</span>
                          <span className="products-action__compare">
                            Compare
                          </span>
                          <span className="products-action__like">Like</span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>Không có sản phẩm nào trong danh mục này.</p>
                )}
              </div>{" "}
            </div>{" "}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CategoryDetail;
