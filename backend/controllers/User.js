import User from "../models/UserModel.js";
import argon2 from "argon2";
import { Op } from "sequelize";

export const getUsers = async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 0;
  const search = req.query.search_query || "";
  const offset = limit * page;
  const totalRows = await User.count({
    where: {
      [Op.or]: [
        {
          name: {
            [Op.like]: "%" + search + "%",
          },
        },
        {
          email: {
            [Op.like]: "%" + search + "%",
          },
        },
      ],
    },
  });
  const totalPage = Math.ceil(totalRows / limit);
  const result = await User.findAll({
    where: {
      [Op.or]: [
        {
          name: {
            [Op.like]: "%" + search + "%",
          },
        },
        {
          email: {
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
};

export const getUserById = async (req, res) => {
  try {
    const response = await User.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const createUser = async (req, res) => {
  const { name, email, password, confirmPassword, role } = req.body;
  if (password !== confirmPassword)
    return res
      .status(400)
      .json({ msg: "Password and Confirm Password do not match" });
  const hashPassword = await argon2.hash(password);
  try {
    await User.create({
      name: name,
      email: email,
      password: hashPassword,
      image: req.file?.path,
      role: role,
    });
    res.status(201).json({ msg: "User registered" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const updateUser = async (req, res) => {
  const user = await User.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!user) return res.status(404).json({ msg: "User not found" });
  const { name, email, password, confirmPassword, role, address, state, city, country, zip, phone } = req.body;
  let hashPassword;
  if (password === "" || password === null) {
    hashPassword = user.password;
  } else {
    hashPassword = await argon2.hash(password);``
  }
  if (password !== confirmPassword)
    return res
      .status(400)
      .json({ msg: "Password doesn't match with Confirm Password" });
  try {
    await User.update(
      {
        name: name,
        email: email,
        password: hashPassword,
        image: req.file?.path,
        role: role,
        address: address,
        city: city,
        state: state,
        country: country,
        zip: zip, 
        phone: phone
      },
      {
        where: {
          id: user.id,
        },
      }
    );
    res.status(200).json({ msg: "User updated" });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

export const deleteUser = async (req, res) => {
  const user = await User.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!user) return res.status(404).json({ msg: "User not found" });
  try {
    await User.destroy({
      where: {
        id: user.id,
      },
    });
    res.status(200).json({ msg: "User Deleted" });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};
