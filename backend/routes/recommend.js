const express = require("express");
const router = express.Router();

const hospitals = require("../data/hospitals.json");

router.post("/", (req, res) => {

    const {
        needICU,
        needVentilator
    } = req.body;

    let scoredHospitals = hospitals.map(hospital => {

        let score = 0;
        let reasons = [];

        if (needICU && hospital.icuBeds > 0) {
            score += 50;
            reasons.push("ICU Available");
        }

        if (needVentilator && hospital.ventilator) {
            score += 30;
            reasons.push("Ventilator Available");
        }

        if (hospital.distance.includes("3")) {
            score += 20;
            reasons.push("Nearby Hospital");
        }

        return {
            ...hospital,
            score,
            reasons
        };

    });

    scoredHospitals.sort((a, b) => b.score - a.score);

    res.json({

        recommended: scoredHospitals[0],

        rankings: scoredHospitals

    });

});

module.exports = router;