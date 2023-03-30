import { DataTypes, Model } from "sequelize";
import bcrypt from "bcrypt";
import sequelize from "..";

class User extends Model {
  static async hashPassword(value: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(value, salt);
    return hash;
  }
}

const userSchema = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },

  mobile: {
    type: DataTypes.STRING,
  },

  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  profile: {
    type: DataTypes.STRING,
  },

  role: {
    type: DataTypes.STRING,
    defaultValue: "User",
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

User.init(userSchema, { sequelize, timestamps: true });
export default User;
