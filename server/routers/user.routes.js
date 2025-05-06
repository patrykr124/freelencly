const express = require("express");
const { signUp, singIn, updateUser, currentUser, getMe, googleLogin } = require("../controllers/auth.controller");
const verifiToken = require("../middleware/verifiToken");
const router = express.Router();

router.post("/auth", signUp);
router.get("/me", verifiToken, getMe);
router.post("/login", singIn);
router.patch("/update", verifiToken, updateUser);
router.post("/google-login", googleLogin)
router.get("/currentUser", verifiToken, currentUser)

module.exports = router;
