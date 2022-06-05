const express = require("express");
const router = express.Router();
const usuarios = require("./usuarios");
const documentos = require("./documentos");
const marcacoes = require("./marcacoes");
const dashboard = require("./dashboard");
const auth = require("./auth");
const { authenticateToken } = require("../config/authValidation");

router.use("/usuarios", usuarios);
router.use("/documentos", authenticateToken, documentos);
router.use("/marcacoes", authenticateToken, marcacoes);
router.use("/dashboard", authenticateToken, dashboard);
router.use("/auth", auth);
router.use("/*", (_, res) => res.send("OK!"));

module.exports = router;
