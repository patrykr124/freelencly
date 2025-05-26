const express = require("express");
const router = express.Router();
const { getTechnologies } = require("../controllers/technology.controller");

router.get("/all", getTechnologies);

module.exports = router;
