const Documento = require("../models/documento");
const status = require("http-status");
const { defaultErrorHandler } = require("../utils");
const { Op } = require("sequelize");

exports.SearchAll = async (req, res) => {
  const { tipo, pacote, startDate, endDate } = req.query;

  const where = {}
  if (req.user.funcao === 'vendedor') {
    where.usuarioId = req.user.id
  }
  if (tipo) {
    where.tipo = tipo
  }
  if (pacote) {
    where.pacote = pacote
  }
  if (startDate && endDate) {
    where.createdAt = { [Op.between]: [new Date(startDate), new Date(endDate)] }
  } else if (startDate) {
    where.createdAt = { [Op.gte]: new Date(startDate) }
  } else if (endDate) {
    where.createdAt = { [Op.lte]: new Date(endDate) }
  }

  try {
    const todas = await Documento.count({
      where,
    })
    const trial = await Documento.count({
      where: { ...where, expiracaoTrial: { [Op.gt]: new Date() } },
    })
    const contratos = await Documento.count({
      where: { ...where, aprovado: true },
    })
    res.status(status.OK).send({ todas, trial, receitaContratos, receitaMensalidades, naoAprovado: todas - contratos })
  } catch (error) {
    defaultErrorHandler(res, error)
  }

};