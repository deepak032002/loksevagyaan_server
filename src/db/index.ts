import { Sequelize } from "sequelize";

const sequelize = new Sequelize(process.env.DB || '');

export default sequelize;
