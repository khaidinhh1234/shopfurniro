const LimitWeb = () => {
  return (
    <div>
      {" "}
      <section className="content">
        <div className="container">
          <div className="content-list">
            <div className="content-item">
              <div className="content-item-filter">
                <a href="#">
                  <img src="./public/images/shop/icon1.svg" alt="" />
                </a>
              </div>
              <div className="content-item-filter">
                <span className="content-item-filter__label">Filter</span>
              </div>
              <div className="content-item-filter">
                <a href="#">
                  <img
                    src="./public/images/shop/icon2.svg"
                    alt=""
                    className="content-item-filter__icon2"
                  />
                </a>
              </div>
              <div className="content-item-filter">
                <a href="#">
                  <img
                    src="./public/images/shop/icon3.svg"
                    alt=""
                    className="content-item-filter__icon3"
                  />
                </a>
              </div>
              <div className="content-item-filter">
                <span className="content-item-filter__results">
                  Showing 1 – 6 of 11 results
                </span>
              </div>
            </div>
            <div className="content-item">
              <div className="content-show">
                <p className="content-show__label">Show</p>
                <select
                  id="limit"
                  // onChange={handleLimitChange}
                  // defaultValue={limit}
                >
                  <option value="2">2</option>
                  <option value="4">4</option>
                  <option value="6">6</option>
                  <option value="10">10</option>
                </select>
              </div>
              <div className="limit-dropdown"></div>
              <div className="content-show">
                <p className="content-show__label">Short by</p>
                <select name="" id="">
                  <option selected>Tất cả</option>
                </select>
              </div>{" "}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LimitWeb;
