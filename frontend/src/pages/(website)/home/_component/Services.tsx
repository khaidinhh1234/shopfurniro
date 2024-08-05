import React from "react";

const Services = () => {
  return (
    <>
      {" "}
      <section className="services">
        <div className="container-fluid">
          <div className="service-list">
            <div className="service-item">
              <img
                src="https://i.pinimg.com/564x/90/cf/24/90cf243faf238f1fe7e4263f1cc60943.jpg"
                className="service__image"
              />
              <div className="service-info">
                <h4 className="service__name">Tươi-Sạch-Đảm bảo </h4>
                <p className="service__description">
                  crafted from top materials
                </p>
              </div>
            </div>
            {/*End service-item*/}
            <div className="service-item">
              <img
                src="https://i.pinimg.com/736x/1e/9b/5b/1e9b5bcd4faada891fe16e24eb4e2b3b.jpg"
                className="service__image"
              />
              <div className="service-info">
                <h4 className="service__name">Ngon</h4>
                <p className="service__description">
                  crafted from top materials
                </p>
              </div>
            </div>
            {/*End service-item*/}
            <div className="service-item">
              <img
                src="https://i.pinimg.com/736x/64/02/53/640253e8a75cc5eccf0d6718a94b6421.jpg"
                className="service__image"
              />
              <div className="service-info">
                <h4 className="service__name">Bổ</h4>
                <p className="service__description">
                  crafted from top materials
                </p>
              </div>
            </div>
            {/*End service-item*/}
            <div className="service-item">
              <img
                src="https://i.pinimg.com/564x/25/82/e7/2582e7abe35457df67331439b531d605.jpg"
                className="service__image"
              />
              <div className="service-info">
                <h4 className="service__name">Không rẻ</h4>
                <p className="service__description">
                  crafted from top materials
                </p>
              </div>
            </div>
            {/*End service-item*/}
          </div>
        </div>
      </section>
      {/*End .services*/}
    </>
  );
};

export default Services;
