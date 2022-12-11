import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { formatCurrency } from "../utils/functions";
import CommentCard from "./CommentCard";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { useSelector } from "react-redux";

const ProductCard = () => {
  const [comments, setComments] = useState("");
  const [msg, setMsg] = useState("");
  const [productImage, setProductImage] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productName, setProductName] = useState("");
  const [productId, setProductId] = useState(0);
  const [productDescription, setProductDescription] = useState("");
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [hoverStar, setHoverStar] = useState(undefined);
  const { id } = useParams();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const getReviewByProductId = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/reviews/${id}`);
        setReviews(response.data);
      } catch (err) {
        if (err.response) {
          setMsg(err.response.data.msg);
        }
      }
    };

    getReviewByProductId();
  }, [id]);

  useEffect(() => {
    const getProductById = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/products/${id}`
        );
        setProductName(response.data.name);
        setProductPrice(response.data.price);
        setProductImage(response.data.image);
        setProductDescription(response.data.description);
        setProductId(response.data.id);
      } catch (err) {
        if (err.response) {
          setMsg(err.response.data.msg);
        }
      }
    };
    getProductById();
  }, [id]);

  const handleComments = (e) => {
    setComments(e.target.value);
  };

  const addComment = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/reviews", {
        rating: rating,
        description: comments,
        productId: productId,
      });
      window.location.reload(false);
    } catch (err) {
      setMsg(err.response.data.msg);
    }
  };

  const handleText = () => {
    switch (rating || hoverStar) {
      case 0:
        return "Evaluate";
      case 1:
        return "Very Poor";
      case 2:
        return "Poor";
      case 3:
        return "Average";
      case 4:
        return "Good";
      case 5:
        return "Very Good";
      default:
        return "Evaluate";
    }
  };

  return (
    <div className='card'>
      <header className='card-header'>
        <p className='card-header-title'>{productName.toUpperCase()}</p>
        <p>{msg}</p>
        <p>{productDescription}</p>
        <p>{formatCurrency(productPrice)}</p>
      </header>
      {productImage ? (
        <div className='card-image'>
          <figure className='image is-3by2'>
            <img
              src={`http://localhost:5000/${productImage}`}
              alt={productName}
            />
          </figure>
        </div>
      ) : (
        ""
      )}
      <div className='card-content'>
        {reviews.map((review, index) => {
          return <CommentCard details={review} userId={user?.uuid} key={index + 1}/>;
        })}
        <div>
          <div>
            <h1>{handleText()}</h1>
            {Array(5)
              .fill()
              .map((_, index) =>
                rating >= index + 1 || hoverStar >= index + 1 ? (
                  <AiFillStar
                    onMouseOver={() => setHoverStar(index + 1)}
                    onMouseLeave={() => setHoverStar(undefined)}
                    style={{ color: "orange" }}
                    onClick={() => setRating(index + 1)}
                    key={index + 1}
                  />
                ) : (
                  <AiOutlineStar
                    onMouseOver={() => setHoverStar(index + 1)}
                    onMouseLeave={() => setHoverStar(undefined)}
                    style={{ color: "orange" }}
                    onClick={() => setRating(index + 1)}
                    key={index + 1}
                  />
                )
              )}
          </div>
          <textarea placeholder='Comment here...' onChange={handleComments} />
          <button onClick={addComment}>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
