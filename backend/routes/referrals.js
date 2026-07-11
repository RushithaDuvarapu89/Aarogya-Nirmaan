const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();


// JSON file location

const referralsFile = path.join(
    __dirname,
    "../data/referrals.json"
);



// Helper function to read referrals

function readReferrals() {

    if (!fs.existsSync(referralsFile)) {

        fs.writeFileSync(
            referralsFile,
            JSON.stringify([])
        );

    }


    const data = fs.readFileSync(
        referralsFile,
        "utf-8"
    );


    return JSON.parse(data);

}



// Helper function to save referrals

function saveReferrals(referrals) {


    fs.writeFileSync(

        referralsFile,

        JSON.stringify(
            referrals,
            null,
            2
        )

    );

}





// =====================================
// CREATE REFERRAL
// POST /api/referrals
// =====================================

router.post("/", (req, res) => {


    try {


        const {

            patientName,
            age,
            gender,
            condition,
            severity,
            currentHospital

        } = req.body;



        if (

            !patientName ||
            !age ||
            !gender ||
            !condition ||
            !severity 

        ) {


            return res.status(400).json({

                message:
                "All patient details are required"

            });


        }




        const referrals = readReferrals();



        const newReferral = {


            id: Date.now(),


            patientName,


            age,


            gender,


            condition,


            severity,


           currentHospital:
           currentHospital || "New Patient / Self Registered",



            // Smart Recommendation Data

            recommendedHospital:
            "District Government Hospital",


            distance:
            "8.5 km",


            icuBeds:
            12,


            ambulanceAvailability:
            "Available",


            medicineAvailability:
            "Available",


            recommendationScore:
            96,



            status:
            "Pending",


            createdAt:
            new Date()

        };



        referrals.push(newReferral);



        saveReferrals(referrals);



        res.status(201).json({

            message:
            "Referral Created Successfully",


            referral:
            newReferral

        });



    }

    catch(error) {


        res.status(500).json({

            message:
            error.message

        });


    }


});







// =====================================
// GET ALL REFERRALS
// GET /api/referrals
// =====================================

router.get("/", (req,res)=>{


    try {


        const referrals = readReferrals();


        res.json(referrals);


    }

    catch(error){


        res.status(500).json({

            message:
            error.message

        });


    }


});






// =====================================
// GET SINGLE REFERRAL
// GET /api/referrals/:id
// =====================================

router.get("/:id",(req,res)=>{


    try {


        const referrals = readReferrals();



        const referral = referrals.find(

            item =>
            item.id == req.params.id

        );



        if(!referral){


            return res.status(404).json({

                message:
                "Referral not found"

            });


        }



        res.json(referral);



    }

    catch(error){


        res.status(500).json({

            message:
            error.message

        });


    }


});







// =====================================
// UPDATE REFERRAL STATUS
// PUT /api/referrals/:id
// =====================================

router.put("/:id",(req,res)=>{


    try {


        const referrals = readReferrals();



        const referral = referrals.find(

            item =>
            item.id == req.params.id

        );



        if(!referral){


            return res.status(404).json({

                message:
                "Referral not found"

            });


        }



        referral.status =
        req.body.status;



        saveReferrals(referrals);



        res.json({

            message:
            "Status Updated",


            referral

        });



    }

    catch(error){


        res.status(500).json({

            message:
            error.message

        });


    }


});



module.exports = router;