import { DataTypes, Model } from "sequelize";
import sequelize from "../db/index";
import User from "./user.model";

class Blog extends Model {
  static createSlug(title: string) {
    return title
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
  }
}

const blogSchema = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  title: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },

  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },

  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  slug: {
    type: DataTypes.STRING,
    unique: true,
  },

  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },

  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },

  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "id",
    },
  },
};

Blog.init(blogSchema, {
  sequelize,
  hooks: {
    beforeCreate: (blog: any) => {
      blog.slug = Blog.createSlug(blog.title);
    },

    beforeUpdate: (blog: any) => {
      blog.slug = Blog.createSlug(blog.title);
    },
  },
  timestamps: true,
});


Blog.belongsTo(User, { foreignKey: "userId" });

export default Blog;
