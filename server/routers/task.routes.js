const express = require("express");
const { createFreelencerManagment, getFreelencerManagment, getAllTaskByFreelencer } = require("../controllers/task.controller");
const verifiToken = require("../middleware/verifiToken");
const router = express.Router();

router.post("/managment", verifiToken, createFreelencerManagment);
router.get("/managment", verifiToken, getFreelencerManagment);
router.get("/allTaskByFreelencer/:id",verifiToken, getAllTaskByFreelencer)
module.exports = router;
