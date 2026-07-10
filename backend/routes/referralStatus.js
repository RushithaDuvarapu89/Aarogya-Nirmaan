console.log("Referral Status Route Loaded");
const express = require("express");
const router = express.Router();

const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../data/referrals.json");

router.patch("/:id", (req, res) => {

    const referrals = JSON.parse(
        fs.readFileSync(filePath)
    );

    const referral = referrals.find(
        r => r.id == req.params.id
    );

    if (!referral) {

        return res.status(404).json({
            message: "Referral not found"
        });

    }

    referral.status = req.body.status;

    fs.writeFileSync(
        filePath,
        JSON.stringify(referrals, null, 2)
    );

    res.json(referral);

});

module.exports = router;