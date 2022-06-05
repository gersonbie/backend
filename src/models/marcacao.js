const Sequelize = require("sequelize");
const sequelize = require("../database/database");

const Marcacao = sequelize.define("marcacao", {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
  },
  provincia: {
    type: Sequelize.STRING,
  },
  agencia: {
    type: Sequelize.STRING,
  },
  tipo: {
    type: Sequelize.STRING,
  },
  descricao: {
    type: Sequelize.STRING,
  },
  data: {
    type: Sequelize.DATE,
  },
});

module.exports = Marcacao;
