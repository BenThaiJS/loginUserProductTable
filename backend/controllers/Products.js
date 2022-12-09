import Product from "../models/ProductModel.js";
import User from "../models/UserModel.js";
import { Op } from "sequelize";

export const getProductByQuery = async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 0;
  const search = req.query.search_query || "";
  const offset = limit * page;
  try {
    const totalRows = await Product.count({
      where: {
        [Op.or]: [
          {
            name: {
              [Op.like]: "%" + search + "%",
            },
          },
          {
            price: {
              [Op.like]: "%" + search + "%",
            },
          },
        ],
      },
    });
    const totalPage = Math.ceil(totalRows / limit);
    const result = await Product.findAll({
      attributes: [
        "uuid",
        "name",
        "price",
        "image",
        "id",
        "description",
        "userId",
        "quantity",
      ],
      include: [
        {
          model: User,
          attributes: ["name", "email", "id"],
        },
      ],
      where: {
        [Op.or]: [
          {
            name: {
              [Op.like]: "%" + search + "%",
            },
          },
          {
            price: {
              [Op.like]: "%" + search + "%",
            },
          },
        ],
      },
      offset: offset,
      limit: limit,
      order: [["id", "DESC"]],
    });
    res.json({
      result: result,
      page: page,
      limit: limit,
      totalRows: totalRows,
      totalPage: totalPage,
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!product) return res.status(404).json({ msg: "Product not found" });
    const response = await Product.findOne({
      attributes: [
        "uuid",
        "id",
        "name",
        "price",
        "image",
        "description",
        "userId",
        "quantity",
      ],
      where: {
        id: product.id,
      },
      include: [
        {
          model: User,
          attributes: ["name", "email", "id"],
        },
      ],
    });

    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const createProduct = async (req, res) => {
  const { name, price, description, quantity } = req.body;
  try {
    await Product.create({
      name: name,
      price: price,
      description: description,
      image: req.file?.path,
      userId: req.userId,
      quantity: quantity,
    });
    res.status(201).json({ msg: "Product Created Successfully" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!product) return res.status(404).json({ msg: "Product not found" });
    const { name, price, description, quantity } = req.body;
    const image = req.file?.path;
    if (req.role === "admin") {
      await Product.update(
        { name, price, image, description, quantity },
        {
          where: {
            id: product.id,
          },
        }
      );
    } else {
      if (req.userId !== product.userId)
        return res.status(403).json({ msg: "Access is forbidden" });
      await Product.update(
        { name, price, image, description },
        {
          where: {
            [Op.and]: [{ id: product.id }, { userId: req.userId }],
          },
        }
      );
    }
    res.status(200).json({ msg: "Product updated successfully" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!product) return res.status(404).json({ msg: "Product not found" });
    if (req.role === "admin") {
      await Product.destroy({
        where: {
          id: product.id,
        },
      });
    } else {
      if (req.userId !== product.userId)
        return res.status(403).json({ msg: "Access is forbidden" });
      await Product.destroy({
        where: {
          [Op.and]: [{ id: product.id }, { userId: req.userId }],
        },
      });
    }
    res.status(200).json({ msg: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
