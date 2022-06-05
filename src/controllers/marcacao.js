const status = require("http-status");
const { Op } = require("sequelize");
const {
  fetchPaginatedData,
  updateRow,
  cloneObject,
  defaultErrorHandler,
} = require("../utils");
const Marcacao = require("../models/marcacao");

exports.Insert = (req, res) => {
  const data = req.body;
  data.usuarioId= req.user.id;
  Marcacao.create(data)
    .then((marcacao) => {
      if (marcacao) {
        res.status(200).send(marcacao);
      } else {
        res.status(status.NOT_FOUND).send();
      }
    })
    .catch((error) => defaultErrorHandler(res, error));
};
exports.SearchAll = (req, res) => {
  const { id } = req.query;
  
  const where = {}
  if (id) {
    where.usuarioId = id
  }
  fetchPaginatedData(req, res, Marcacao, where);
};
exports.SearchOne = (req, res) => {
  const id = req.params.id;
  Marcacao.findByPk(id)
    .then((marcacao) => {
      if (marcacao) {
        res.status(status.OK).send(marcacao);
      } else {
        res.status(status.NOT_FOUND).send();
      }
    })
    .catch((error) => defaultErrorHandler(res, error));
};

exports.Update = (req, res) => {
  updateRow(req, res, Marcacao, cloneObject(req.body))
    .then((data) => {
      if (typeof data === "string") res.status(status.NOT_FOUND).send();
      else res.status(status.OK).send(data);
    })
    .catch((err) => defaultErrorHandler(res, err));
};

exports.Delete = (req, res) => {
  const { id } = req.params;
  Marcacao.findByPk(id)
    .then((marcacao) => {
      if (marcacao) {
        marcacao
          .destroy({
            where: { id },
          })
          .then(() => {
            res.status(status.OK).send();
          })
          .catch((error) => next(error));
      } else {
        res.status(status.NOT_FOUND).send();
      }
    })
    .catch((error) => defaultErrorHandler(res, error));
};
