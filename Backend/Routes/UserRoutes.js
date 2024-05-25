const express = require("express");
const { Signup, Login } = require("../Controllers/UserController");

const router = express.Router();

router.route("/signup").post(Signup);
router.route("/login").post(Login);

module.exports = router;
