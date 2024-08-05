import React from "react";


const Shop = () => {
  return (
    <>
      {" "}
      <section className="shop">
        <div className="container">
          <div className="section-heading">
            <h2 className="section-heading__title">Shop</h2>
          </div>
          <div className="section-body">
            <div className="shops">
              <div className="shop-item">
                <a href="#" className="shop__link">
                  <img
                    src="https://i.pinimg.com/564x/28/b6/7a/28b67a274776b4c02faedeef555e1e82.jpg"
                    alt="#"
                    className="shop__image"
                  />
                </a>
              </div>
              <div className="shop-item">
                <a href="#" className="shop__link">
                  <img
                    src="https://i.pinimg.com/564x/39/9f/ce/399fced77b8bb8abb475fd485395b011.jpg"
                    alt="#"
                    className="shop__image"
                  />
                </a>
              </div>
              <div className="shop-item">
                <a href="#" className="shop__link">
                  <img
                    src="https://i.pinimg.com/564x/b6/ad/bb/b6adbb2385acceaa392930ba0a9996cc.jpg"
                    alt="#"
                    className="shop__image"
                  />
                </a>
              </div>
              <div className="shop-item">
                <a href="#" className="shop__link">
                  <img
                    src="https://i.pinimg.com/564x/d0/15/97/d015972a673e489ec290128d0f45723a.jpg"
                    alt="#"
                    className="shop__image"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*End .shop*/}
    </>
  );
};

export default Shop;
