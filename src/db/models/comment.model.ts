import { DataTypes, Model } from "sequelize";
import sequelize from "..";

class Comment extends Model {}

const commentSchema = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  content: {
    type: DataTypes.TEXT,
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

Comment.init(commentSchema, { sequelize, timestamps: true });
export default Comment;
