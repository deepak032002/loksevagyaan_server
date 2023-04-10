import { DataTypes, Model, Sequelize } from 'sequelize';
import sequelize from '../db/index';

class User extends Model {}

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
    defaultValue: 'user',
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
