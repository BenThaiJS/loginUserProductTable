import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import Layout from "../components/Layout";
import { getMe } from "../redux/reducers/authSlice";

const Checkout = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  console.log(cart)

  return <div>
    <Layout></Layout>
  </div>;
};

export default Checkout;
