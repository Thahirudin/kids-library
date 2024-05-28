'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Buku extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Buku.belongsToMany(models.User, { through: 'Favorit', foreignKey: 'bukuId', otherKey: 'userId' });
    }
  }
  Buku.init({
    judul: DataTypes.STRING,
    kategori: DataTypes.STRING,
    ringkasan: DataTypes.TEXT,
    penulis: DataTypes.STRING,
    image_url: DataTypes.STRING,
    read_url: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Buku',
  });
  return Buku;
};