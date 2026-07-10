const express = require("express");
const router = express.Router();

const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../data/referrals.json");

router.put("/:id", (req, res) => {

    const referrals = JSON.parse(
        fs.readFileSync(filePath)
    );

    const index = referrals.findIndex(
        referral => referral.id == req.params.id
    );

    if (index === -1) {

        return res.status(404).json({
            message: "Referral not found"
        });

    }

    referrals[index] = {
        ...referrals[index],
        ...req.body,
    };

    fs.writeFileSync(
        filePath,
        JSON.stringify(referrals, null, 2)
    );

    res.json({
        message: "Referral Updated",
        referral: referrals[index],
    });

});

module.exports = router;