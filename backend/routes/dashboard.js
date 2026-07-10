 const express = require("express");
const router = express.Router();

const hospitals = require("../data/hospitals.json");
const referrals = require("../data/referrals.json");
const ambulances = require("../data/ambulances.json");

router.get("/", (req, res) => {

    const totalHospitals = hospitals.length;

    const totalBeds = hospitals.reduce(

        (sum, hospital) => sum + hospital.icuBeds,

        0

    );

    const totalAmbulances = ambulances.length;

    const totalReferrals = referrals.length;

    res.json({

        stats: [

            {
                title: "Hospitals",
                value: totalHospitals,
                color: "bg-blue-600",
            },

            {
                title: "ICU Beds",
                value: totalBeds,
                color: "bg-green-600",
            },

            {
                title: "Ambulances",
                value: totalAmbulances,
                color: "bg-yellow-500",
            },

            {
                title: "Referrals",
                value: totalReferrals,
                color: "bg-red-600",
            },

        ],

    });

});

module.exports = router;