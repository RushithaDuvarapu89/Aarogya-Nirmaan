 import { useEffect, useState } from "react";

import ReferralForm from "../components/ReferralForm";
import HospitalMatch from "../components/HospitalMatch";
import HospitalRecommendation from "../components/HospitalRecommendation";

import { useReferral } from "../context/ReferralContext";

import { getHospitals, updateReferralStatus } from "../services/api";

import { getNextStatus } from "../services/referralLifecycle";

function ReferralCenter() {

    const [matchedHospital, setMatchedHospital] = useState(null);

    const [recommendedHospitals, setRecommendedHospitals] = useState([]);

    const [availableHospitals, setAvailableHospitals] = useState([]);

    const { referral, setReferral } = useReferral();

    useEffect(() => {

        async function loadHospitals() {

            try {

                const hospitals = await getHospitals();

                setAvailableHospitals(hospitals);

            }

            catch (error) {

                console.error(error);

            }

        }

        loadHospitals();

    }, []);

    function findHospital(bestHospital) {

        setMatchedHospital(bestHospital);

        const rankings = availableHospitals.map((hospital) => {

            if (hospital.id === bestHospital.id) {

                return {

                    ...hospital,

                    score: 100,

                    reasons: [

                        "Recommended by Backend",

                        "Best Match",

                        "Resources Available",

                    ],

                };

            }

            let score = 0;

            let reasons = [];

            if (hospital.icuBeds > 0) {

                score += 50;

                reasons.push("ICU Available");

            }

            if (hospital.ventilator) {

                score += 30;

                reasons.push("Ventilator");

            }

            if (hospital.ambulance > 0) {

                score += 20;

                reasons.push("Ambulance");

            }

            return {

                ...hospital,

                score,

                reasons,

            };

        });

        rankings.sort(

            (a, b) => b.score - a.score

        );

        setRecommendedHospitals(rankings);

    }

    async function nextStage() {

        if (!referral.id) {

            alert("Referral ID not found.");

            return;

        }

        const nextStatus = getNextStatus(

            referral.status

        );

        try {

            const updatedReferral =

                await updateReferralStatus(

                    referral.id,

                    nextStatus

                );

            setReferral(updatedReferral);

        }

        catch (error) {

            console.error(error);

            alert("Unable to update status.");

        }

    }

    return (

        <div className="space-y-8">

            <div className="grid grid-cols-2 gap-8">

                <ReferralForm

                    onFindHospital={findHospital}

                />

                <HospitalMatch

                    hospital={matchedHospital}

                    nextStage={nextStage}

                />

            </div>

            {

                recommendedHospitals.length > 0 && (

                    <HospitalRecommendation

                        hospitals={recommendedHospitals}

                    />

                )

            }

        </div>

    );

}

export default ReferralCenter;