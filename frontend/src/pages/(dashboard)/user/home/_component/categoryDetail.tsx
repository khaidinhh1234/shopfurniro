import Banner2 from "@/pages/(website)/home/_component/Banner2";

import { Link } from "react-router-dom";

const CategoryDetail = () => {
  return (
    <>
      <Banner2 />
      <section className="news">
        <div className="container">
          <div className="section-heading">
            <h2 className="section-heading__title">Danh mục</h2>
          </div>
        </div>{" "}
        {/* <New data={data.products}></New> */}
        <section className="news">
          <div className="container">
            <div className="section-body">
              <div className="products-list">
                <div className="products-item">
                  <div className="products-image">
                    <img src={""} alt="#" className="products__thumbnail" />
                    <span className="products-sale">12%</span>
                  </div>
                  <div className="products-info">
                    <h3 className="products__name">
                      <a href="#" className="products__link">
                        PRODUCTS
                      </a>
                    </h3>
                    <a href="#" className="products__category">
                      cmt
                    </a>
                    <div className="products-price">
                      <span className="products-price__new">2000D</span>
                      <del className="products-price__old">2000D</del>
                    </div>
                  </div>
                  <div className="products-actions">
                    <button className="btn products-action__quickview">
                      <Link to={`/detail`} className="products-action__link">
                        Quick View
                      </Link>
                    </button>
                    <button className="btn products-action__addtocart">
                      <a href="" className="products-action__link">
                        Add to Cart
                      </a>
                    </button>
                    <div className="products-actions-more">
                      <span className="products-action__share">Share</span>
                      <span className="products-action__compare">Compare</span>
                      <span className="products-action__like">Like</span>
                    </div>
                  </div>
                </div>
              </div>{" "}
            </div>{" "}
          </div>
        </section>
      </section>
    </>
  );
};

export default CategoryDetail;
