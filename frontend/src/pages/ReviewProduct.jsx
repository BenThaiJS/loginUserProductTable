import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMe } from "../redux/reducers/authSlice";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import ProductCard from "../components/ProductCard";

const ReviewProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
  }, [isError, navigate]);

  return (
    <Layout>
      <ProductCard />
    </Layout>
  );
};

export default ReviewProduct;
