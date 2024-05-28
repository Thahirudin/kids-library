'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Bukus', [
      {
        judul: 'Fairy tales.',
        kategori: 'Fantasi',
        ringkasan: 'A long time ago in a galaxy far, far away...',
        penulis: 'J.R.R. Tolkien',
        image_url: 'https://archive.org/download/fairytales00anderich/fairytales00anderich.pdf',
        read_url: 'https://covers.openlibrary.org/b/id/8231470-M.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
