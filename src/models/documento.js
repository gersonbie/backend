const Sequelize = require("sequelize");
const sequelize = require("../database/database");

const Documentos = sequelize.define("documento", {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
  },
  bi: {
    allowNull: true,
    type: Sequelize.STRING,
  },
  dire: {
    allowNull: true,
    type: Sequelize.STRING,
  },
  passporte: {
    allowNull: true,
    type: Sequelize.STRING,
  },
  endereco: {
    allowNull: true,
    type: Sequelize.STRING,
  },
  nuit: {
    allowNull: true,
    type: Sequelize.STRING,
  },
  rendimento: {
    allowNull: true,
    type: Sequelize.STRING,
  },
  outros: {
    allowNull: true,
    type: Sequelize.STRING,
  },
});

module.exports = Documentos;
