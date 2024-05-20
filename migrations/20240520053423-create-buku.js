'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Bukus', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      judul: {
        type: Sequelize.STRING
      },
      kategori: {
        type: Sequelize.STRING
      },
      ringkasan: {
        type: Sequelize.TEXT
      },
      penulis: {
        type: Sequelize.STRING
      },
      tanggal_upload: {
        type: Sequelize.DATE
      },
      image_url: {
        type: Sequelize.STRING
      },
      read_url: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Bukus');
  }
};