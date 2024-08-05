import { banner } from "@/assets/img";
import React from "react";

const Banner = () => {
  return (
    <>
      {" "}
      <section className="banner ">
        <img src={banner} alt="#" className=" w-full h-[800px]" />
      </section>
      {/*End .banner*/}
    </>
  );
};

export default Banner;
