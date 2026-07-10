const mongoose = require("mongoose");


const referralSchema = new mongoose.Schema(

    {

        // Patient Details

        patientName: {

            type: String,

            required: true

        },


        age: {

            type: Number,

            required: true

        },


        gender: {

            type: String,

            required: true

        },


        condition: {

            type: String,

            required: true

        },


        severity: {

            type: String,

            enum: [
                "Low",
                "Medium",
                "High",
                "Critical"
            ],

            default: "Low"

        },


        // Current Hospital

        currentHospital: {

            type: String,

            required: true

        },


        // Recommended Hospital

        recommendedHospital: {

            type: String

        },


        distance: {

            type: String

        },


        icuBeds: {

            type: Number

        },


        ambulanceAvailability: {

            type: String,

            default: "Not Assigned"

        },


        medicineAvailability: {

            type: String,

            default: "Unknown"

        },


        recommendationScore: {

            type: Number,

            default: 0

        },


        // Referral Status

        status: {

            type: String,

            enum: [

                "Pending",

                "Accepted",

                "In Transit",

                "Completed"

            ],

            default: "Pending"

        }


    },

    {

        timestamps: true

    }

);



module.exports = mongoose.model(
    "Referral",
    referralSchema
);