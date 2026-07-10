const express = require("express");
const router = express.Router();

const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../data/referrals.json");

router.delete("/:id", (req, res) => {

    const referrals = JSON.parse(
        fs.readFileSync(filePath)
    );

    const updatedReferrals = referrals.filter(

        referral => referral.id != req.params.id

    );

    if (updatedReferrals.length === referrals.length) {

        return res.status(404).json({

            message: "Referral not found"

        });

    }

    fs.writeFileSync(

        filePath,

        JSON.stringify(updatedReferrals, null, 2)

    );

    res.json({

        message: "Referral Deleted"

    });

});

module.exports = router;