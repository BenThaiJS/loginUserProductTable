import React from "react";
import { useSelector } from "react-redux";

const CheckoutList = () => {
  const cartState = useSelector((state) => state.cart);
  const {cart} = cartState
  
  return <div>
    {cart ? cart.map(item => (
        <div><span>{item.quantity}</span>
        <span>{item.name}</span></div>
    )) : null}
  </div>;
};

export default CheckoutList;
