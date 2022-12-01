import Review from "../models/ReviewModel.js";
import Product from "../models/ProductModel.js";
import User from "../models/UserModel.js";
import { Op } from "sequelize";

export const addReview = async (req, res) => {
  const { rating, description, productId } = req.body;
  try {
    await Review.create({
      rating: rating,
      description: description,
      productId: productId,
      userId: req.userId,
    });
    res.status(200).json({ msg: "Review Created Successfully" });
  } catch (err) {
    console.log(err);
  }
};

export const getReviews = async (req, res) => {
  try {
    const response = await Review.findAll({
      attributes: [
        "rating",
        "description",
        "uuid",
        "productId",
        "userId",
        "createdAt",
      ],
    });
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
  }
};

export const deleteReview = async (req, res) => {
  try {
    const review = await Review.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!review) return res.status(404).json({ msg: "Review not found" });
    if (req.role === "admin") {
      await Review.destroy({
        where: {
          id: review.id,
        },
      });
    } else {
      if (req.userId !== review.userId)
        return res.status(403).json({ msg: "Access is forbidden" });
      await Review.destroy({
        where: {
          [Op.and]: [{ id: product.id }, { userId: req.userId }],
        },
      });
    }
    res.status(200).json({ msg: "Review deleted successfully" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const updateReview = async (req, res) => {
  try {
    const review = await Review.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!review) return res.status(404).json({ msg: "Review not found" });
    const { name, rating, description } = req.body;
    if (req.role === "admin") {
      await Review.update(
        { name, rating, description },
        {
          where: {
            id: review.id,
          },
        }
      );
    } else {
      if (req.userId !== review.userId)
        return res.status(403).json({ msg: "Access is forbidden" });
      await Review.update(
        { name, rating, description },
        {
          where: {
            [Op.and]: [{ id: review.id }, { userId: req.userId }],
          },
        }
      );
    }
    res.status(200).json({ msg: "Review updated successfully" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const getReviewsByProductId = async (req, res) => {
  try {
    const product = await Product.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!product) return res.status(404).json({ msg: "Product not found" });
    const response = await Review.findAll({
        attributes: [
          "uuid",
          "rating",
          "description",
          "createdAt",
          "productId",
          "userId",
        ],
        where: {
          productId: product.id,
        },
        include: [
          {
            model: User,
            attributes: ["name", "email", "id", "image", "uuid"],
          },
          {
            model: Product,
            as: "product",
            attributes: ["name", "description", "price", "image", "id", "uuid"],
          },
        ],
      });
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
