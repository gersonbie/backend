const express = require("express");
const router = express.Router();
const DocumentoController = require("../controllers/documentos");

router.post("/", DocumentoController.Insert);
router.get("/", DocumentoController.SearchAll);
router.get("/:id", DocumentoController.SearchOne);
router.put("/:id", DocumentoController.Update);
router.delete("/:id", DocumentoController.Delete);

module.exports = router;
