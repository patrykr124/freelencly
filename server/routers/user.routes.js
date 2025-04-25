const express = require("express");
const { signUp, singIn, updateUser, currentUser } = require("../controllers/auth.controller");
const verifiToken = require("../middleware/verifiToken");
const router = express.Router();

router.post("/auth", signUp);
router.post("/login", singIn);
router.patch("/update", verifiToken, updateUser);
router.get("/currentUser", verifiToken, currentUser)

module.exports = router;
