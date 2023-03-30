import { DataTypes, Model } from "sequelize";
import sequelize from "..";

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

  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  slug: {
    type: DataTypes.STRING,
    unique: true,
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

export default Blog;
