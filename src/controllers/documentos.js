const Documento = require("../models/documento");
const status = require("http-status");
const {
  fetchPaginatedData,
  updateRow,
  cloneObject,
  defaultErrorHandler,
} = require("../utils");

exports.Insert = (req, res) => {
  const data = req.body;
  data.usuarioId= req.user.id;
  
  Documento.create(data)
    .then((documento) => {
      if (documento) {
        res.status(status.OK).send(documento);
      } else {
        res.status(status.NOT_FOUND).send();
      }
    })
    .catch((error) => defaultErrorHandler(res, error));
};
exports.SearchAll = (req, res) => {
  fetchPaginatedData(req, res, Documento);
};
exports.SearchOne = (req, res) => {
  const id = req.params.id;
  Documento.findByPk(id)
    .then((documento) => {
      if (documento) {
        res.status(status.OK).send(documento);
      } else {
        res.status(status.NOT_FOUND).send();
      }
    })
    .catch((error) => defaultErrorHandler(res, error));
};

exports.Update = (req, res) => {
  updateRow(req, res, Documento, cloneObject(req.body))
    .then((data) => {
      if (typeof data === "string") res.status(status.NOT_FOUND).send();
      else res.status(status.OK).send(data);
    })
    .catch((err) => defaultErrorHandler(res, err));
};

exports.Delete = (req, res) => {
  const { id } = req.params;
  Documento.findByPk(id)
    .then((documento) => {
      if (documento) {
        documento
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
