"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, { DataTypes }) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    await queryInterface.createTable("Users", {
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
        default: Date.now,
      },

      updatedAt: {
        type: DataTypes.DATE,
        default: Date.now,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    await queryInterface.dropTable("Users");
  },
};
