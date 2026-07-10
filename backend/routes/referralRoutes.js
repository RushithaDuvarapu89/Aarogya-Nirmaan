const express = require("express");

const router = express.Router();

const Referral = require("../models/Referral");



// =====================================
// CREATE NEW REFERRAL
// POST /api/referrals
// =====================================

router.post("/", async (req, res) => {


    try {


        const referral = new Referral({

            patientName: req.body.patientName,

            age: req.body.age,

            gender: req.body.gender,

            condition: req.body.condition,

            severity: req.body.severity,

            currentHospital: req.body.currentHospital,


            // Temporary AI Recommendation
            // Later replaced with AI logic

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
                96

        });



        const savedReferral = await referral.save();



        res.status(201).json(savedReferral);


    }

    catch(error) {


        res.status(500).json({

            message: error.message

        });


    }


});





// =====================================
// GET ALL REFERRALS
// GET /api/referrals
// =====================================

router.get("/", async(req,res)=>{


    try {


        const referrals = await Referral.find()
            .sort({
                createdAt:-1
            });



        res.json(referrals);


    }

    catch(error){


        res.status(500).json({

            message:error.message

        });


    }


});





// =====================================
// GET SINGLE REFERRAL
// GET /api/referrals/:id
// =====================================

router.get("/:id", async(req,res)=>{


    try {


        const referral = await Referral.findById(
            req.params.id
        );



        if(!referral){

            return res.status(404).json({

                message:"Referral not found"

            });

        }



        res.json(referral);


    }

    catch(error){


        res.status(500).json({

            message:error.message

        });


    }


});





// =====================================
// UPDATE REFERRAL STATUS
// PUT /api/referrals/:id
// =====================================

router.put("/:id", async(req,res)=>{


    try {


        const updatedReferral =
            await Referral.findByIdAndUpdate(

                req.params.id,

                {

                    status:req.body.status

                },

                {
                    new:true
                }

            );



        res.json(updatedReferral);


    }

    catch(error){


        res.status(500).json({

            message:error.message

        });


    }


});




module.exports = router;