import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";
import argon2 from "argon2";
import nodemailer from "nodemailer";

export const forgotPassword = async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({
      where: {
        email: email,
      },
    });
    if (!user) return res.status(404).json({ msg: "User not found" });
    const secret = process.env.JWT_SECRET + user.password;
    const payload = {
      email: user.email,
      id: user.id,
    };
    const token = jwt.sign(payload, secret, { expiresIn: "15m" });
    const link = `http://localhost:3000/resetPassword/${user.id}/${token}`;
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: user.email,
        pass: "mrdjwuclwodhheyq",
      },
    });

    const mailOptions = {
      from: "localhost@gmail.com",
      to: user.email,
      subject: "Password Reset",
      text: link,
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    res
      .status(200)
      .json({ msg: "Password reset link has been sent to your email" });
  } catch (err) {
    res.status(400).json({ msg: "Not Verified" });
  }
};

export const verifyToken = async (req, res, next) => {
  const { id, token } = req.params;
  const user = await User.findOne({
    where: {
      id: id,
    },
  });
  if (!user) return res.status(404).json({ msg: "User not found" });
  const secret = process.env.JWT_SECRET + user.password;
  try {
    const verify = jwt.verify(token, secret);
    res.status(200).json({ msg: "Verified" });
  } catch (err) {
    res.status(400).json({ msg: "Not Verified" });
  }
};

export const resetPassword = async (req, res, next) => {
  const { id, token } = req.params;
  const { newPassword } = req.body;
  const user = await User.findOne({
    where: {
      id: id,
    },
  });
  if (!user) return res.status(404).json({ msg: "User not found" });
  const secret = process.env.JWT_SECRET + user.password;
  const hashPassword = await argon2.hash(newPassword);

  try {
    const verify = jwt.verify(token, secret);
    await User.update(
      { password: hashPassword },
      {
        where: {
          id: user.id,
        },
      }
    );
    res.status(200).json({ msg: "Password Updated" });
  } catch (err) {
    res.status(400).json({ msg: "Something went wrong" });
  }
};
