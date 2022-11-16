const express = require("express");
const router = express.Router();

//Import controllers
const adminControllers = require('../controllers/admin-controller');

//Routes
router.post("/login", adminControllers.adminLogin);

module.exports = router;