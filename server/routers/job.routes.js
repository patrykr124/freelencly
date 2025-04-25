const express = require("express");
const {
  createJob,
  allJobs,
  getJobById,
} = require("../controllers/job.controller");
const router = express.Router();

const upload = require("../middleware/uploadImage");
const verifiToken = require("../middleware/verifiToken");

router.post("/create", verifiToken, upload.single("img"), createJob);
router.get("/all", allJobs);
router.get("/:id", getJobById);

module.exports = router;
