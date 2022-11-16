const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const verifyAdminToken = require("../auth/verifyAdminToken");
const verifyManagerToken = require("../auth/verifyManagerToken");

//Import controllers
const managerControllers = require('../controllers/manager-controller');


//Routes
router.post("/add", verifyAdminToken, managerControllers.addNewManager);
router.post("/login", managerControllers.managerLogin);
router.post("/savemsg", verifyManagerToken, managerControllers.saveMsg);

module.exports = router;