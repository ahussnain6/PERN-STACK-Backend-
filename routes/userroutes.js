const express = require("express");
const { createUser, authenticateUser,sendMail  } = require("../controller/User.js");
const router = express.Router();
router.route("/signup").post(createUser);
router.route("/signin").post(authenticateUser);
router.route("/send").post(sendMail);
module.exports = router; 