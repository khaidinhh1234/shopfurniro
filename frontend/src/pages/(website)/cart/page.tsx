import { Services } from "@/components";
import Banner2 from "@/pages/(website)/home/_component/Banner2";
import Cart from "@/pages/(website)/cart/cart";
import { Server } from "lucide-react";

const CartPage = () => {
  return (
    <>
      <Banner2 />
      <Cart />
      <Services />
    </>
  );
};

export default CartPage;
