import { DataTypes, Model, Sequelize } from "sequelize";
import sequelize from "../db/index";
import bcrypt from 'bcrypt'

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
    defaultValue: "user",
  },

  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },

  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
};

User.init(userSchema, {
  sequelize,
  timestamps: true,
});

export default User;
