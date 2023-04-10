import { DataTypes, Model } from "sequelize";
import sequelize from "../db/index";

class Tag extends Model {}

const tagSchema = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  createdAt: {
    type: DataTypes.DATE,
    default: Date.now,
  },

  updatedAt: {
    type: DataTypes.DATE,
    default: Date.now,
  },
};

Tag.init(tagSchema, { sequelize, timestamps: true });

export default Tag;
