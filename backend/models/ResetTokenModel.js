import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const ResetToken = db.define(
  "resetToken",
  {
    email: {
      type: DataTypes.TEXT,
      defaultValue: null,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    token: {
      type: DataTypes.TEXT,
      defaultValue: null,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    expiration: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    used: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    freezeTableName: true,
  }
);


export default ResetToken;
