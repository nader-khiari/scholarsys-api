const express = require("express");
const router = express.Router();
const statsController = require("../controllers/statsController");

router.get("/kpi", statsController.getKpi);

module.exports = router;
