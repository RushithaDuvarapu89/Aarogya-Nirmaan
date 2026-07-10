 import { useReferral } from "../context/ReferralContext";

import {
    REFERRAL_STAGES,
    getCurrentStage,
} from "../services/referralLifecycle";

import {
    Ambulance,
    Building2,
    MapPin,
    Clock3,
    CircleCheckBig,
} from "lucide-react";

function HospitalMatch({

    hospital,

    nextStage,

}) {

    const { referral } = useReferral();

    const currentStage = getCurrentStage(
        referral.status
    );

    if (!hospital) {

        return (

            <div className="bg-white rounded-2xl shadow p-6">

                <div className="flex items-center gap-3 mb-4">

                    <Ambulance
                        size={30}
                        className="text-red-600"
                    />

                    <h2 className="text-2xl font-bold">

                        Live Referral Journey

                    </h2>

                </div>

                <p className="text-gray-500">

                    Fill the referral form to begin.

                </p>

            </div>

        );

    }

    return (

        <div className="bg-white rounded-2xl shadow p-6">

            <div className="flex items-center gap-3 mb-6">

                <Ambulance
                    size={30}
                    className="text-red-600"
                />

                <h2 className="text-2xl font-bold">

                    Live Referral Journey

                </h2>

            </div>

            <div className="bg-blue-50 rounded-xl p-5 mb-8">

                <div className="flex items-center gap-2 mb-3">

                    <Building2
                        size={22}
                        className="text-blue-600"
                    />

                    <h3 className="text-xl font-bold">

                        {hospital.name}

                    </h3>

                </div>

                <div className="space-y-2">

                    <div className="flex items-center gap-2">

                        <MapPin
                            size={18}
                            className="text-red-500"
                        />

                        <span>

                            {hospital.city}

                        </span>

                    </div>

                    <div className="flex items-center gap-2">

                        <MapPin
                            size={18}
                            className="text-green-600"
                        />

                        <span>

                            Distance : {hospital.distance}

                        </span>

                    </div>

                    <div className="flex items-center gap-2">

                        <Clock3
                            size={18}
                            className="text-orange-500"
                        />

                        <span>

                            ETA : {hospital.eta}

                        </span>

                    </div>

                </div>

            </div>

            <div className="space-y-5">

                {

                    REFERRAL_STAGES.map(

                        (

                            stage,

                            index

                        ) => (

                            <div

                                key={stage.key}

                                className="flex items-center gap-4"

                            >

                                <div

                                    className={`w-10 h-10 rounded-full flex items-center justify-center

                                    ${

                                        index < currentStage

                                            ? "bg-green-600"

                                            : index === currentStage

                                            ? "bg-yellow-500"

                                            : "bg-gray-300"

                                    }

                                    `}

                                >

                                    <CircleCheckBig

                                        size={20}

                                        className="text-white"

                                    />

                                </div>

                                <span className="font-medium">

                                    {stage.label}

                                </span>

                            </div>

                        )

                    )

                }

            </div>

            {

                currentStage <

                REFERRAL_STAGES.length - 1 && (

                    <button

                        onClick={nextStage}

                        className="mt-8 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl transition"

                    >

                        Next Step

                    </button>

                )

            }

            {

                currentStage ===

                REFERRAL_STAGES.length - 1 && (

                    <div className="mt-8 bg-green-100 text-green-700 rounded-xl p-5 flex items-center gap-3 font-semibold">

                        <CircleCheckBig
                            size={26}
                        />

                        Referral Completed Successfully

                    </div>

                )

            }

        </div>

    );

}

export default HospitalMatch;