const express = require("express");
const router = express.Router();
const { User, ValidateUser } = require("../models/user");

router.get("/", async (req, res) => {
    res.send();
});

router.post("/", async (req, res) => {
    res.send();
});


module.exports = router;