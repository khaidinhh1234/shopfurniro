import { Services } from "@/components";
import Banner2 from "../home/_component/Banner2";
import Orderlist from "./orderlist";

const OrderPagehome = () => {
  return (
    <>
      <Banner2 />
      <Orderlist></Orderlist>
      <Services />
    </>
  );
};

export default OrderPagehome;
