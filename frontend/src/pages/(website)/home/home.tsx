import { Banner, Blog, New, Services, Shop } from "@/components";

const HomePage1 = () => {
  return (
    <div>
      {" "}
      <Banner />
      <div className="container">
        <div className="section-heading">
          <h2 className="section-heading__title">New</h2>
        </div>
      </div>
      <New />
      <div className="container">
        <hr />
      </div>
      <Shop />
      <Blog />
      <Services />
    </div>
  );
};

export default HomePage1;
