const express = require("express");
const controller = require("../controllers/controller");
const bodyPrinter = require("../middlewares/bodyPrinter");

const router = express.Router();

postRoute = router.post("", bodyPrinter, controller.calcualte_expression);

module.exports = { postRoute };
