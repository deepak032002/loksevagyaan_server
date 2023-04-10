import { Sequelize } from "sequelize";

const sequelize = new Sequelize(process.env.DB || 'postgres://postgres:123456789@localhost:5432/loksevagyaan');

export default sequelize;
