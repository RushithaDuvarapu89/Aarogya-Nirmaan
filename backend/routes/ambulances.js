const express = require("express");

const router = express.Router();


// GET ALL AMBULANCES
router.get("/", (req, res) => {

    console.log("🔥 NEW ROUTE IS RUNNING 🔥");

    res.json([
        {
            id: 999,
            vehicleNumber: "TG01AQ5678",
            location: "Secunderabad",
            type: "ALS",
            driver: "Ramesh",
            phone: "9465871325",
            eta: "8 min",
            hospital: "CARE HOSPITAL",
            status: "Available"
        },

        {
            id: 134,
            vehicleNumber: "AP01AQ5271",
            location: "Hyderabad",
            type: "ALS",
            driver: "Sathish",
            phone: "8013587132",
            eta: "8 min",
            hospital: "APOLLO HOSPITAL",
            status: "Busy"
        },

        {
            id: 345,
            vehicleNumber: "TS01AQ1032",
            location: "Uppal",
            type: "ALS",
            driver: "Ganesh",
            phone: "9034589832",
            eta: "8 min",
            hospital: "YASHODA HOSPITAL",
            status: "Available"
        }

    ]);

});


module.exports = router;