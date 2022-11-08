const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const verifyToken = require("../auth/verifyToken");

//Import controllers
const managerControllers = require('../controllers/manager-controller');


//Routes
router.post("/add", managerControllers.addNewManager);
router.post("/login", managerControllers.managerLogin);
router.post("/savemsg", verifyToken, managerControllers.saveMsg);

module.exports = router;