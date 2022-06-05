const express = require("express");
const router = express.Router();
const MarcacaoController = require("../controllers/marcacao");

router.post("/", MarcacaoController.Insert);
router.get("/", MarcacaoController.SearchAll);
router.get("/:id", MarcacaoController.SearchOne);
router.put("/:id", MarcacaoController.Update);
router.delete("/:id", MarcacaoController.Delete);

module.exports = router;
