const express = require("express");
const router = express.Router();

const medicines = require("../data/medicines.json");

router.get("/", (req, res) => {

    res.json(medicines);

});

module.exports = router;