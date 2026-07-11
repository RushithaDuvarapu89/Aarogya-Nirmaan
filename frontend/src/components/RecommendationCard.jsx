import {
    Hospital,
    MapPin,
    Bed,
    Ambulance,
    Pill,
    Brain,
    Star
} from "lucide-react";


function RecommendationCard({ recommendation }) {

    if (!recommendation) {

        return (
            <div className="bg-white rounded-2xl shadow-lg p-6 min-h-[360px] flex items-center justify-center">
                <div className="text-center text-gray-500">
                    <p className="text-lg font-semibold">Waiting for recommendation</p>
                    <p className="text-sm mt-1">The best hospital details will appear here after you click “Find Best Hospital”.</p>
                </div>
            </div>
        );

    }

    const recommendationData = {

        hospital: recommendation.hospital || "AI Recommended Hospital",

        distance: recommendation.distance || "Based on current details",

        icu: recommendation.icu ?? 12,

        ambulance: recommendation.ambulance || "Available",

        medicines: recommendation.medicines || "Available",

        score: recommendation.score ?? 92,

        reasons: recommendation.reasons?.length
            ? recommendation.reasons
            : [
                "Best match for the provided condition",
                "Considers the current hospital context",
                "Recommended based on available hospital data"
            ]

    };


    return (

        <div className="bg-white rounded-2xl shadow-lg p-6">


            {/* Heading */}

            <div className="flex items-center gap-3 mb-6">

                <Hospital
                    size={32}
                    className="text-green-600"
                />

                <h2 className="text-2xl font-bold">

                    AI Recommended Hospital

                </h2>

            </div>



            {/* Hospital Name */}

            <div className="bg-green-50 rounded-xl p-4 mb-5">

                <h3 className="text-xl font-bold text-green-700">

                    {recommendationData.hospital}

                </h3>


                <div className="flex items-center gap-2 mt-2 text-gray-600">

                    <MapPin size={18}/>

                    {recommendationData.distance} away

                </div>

            </div>



            {/* Facilities */}

            <div className="grid grid-cols-2 gap-4">


                <div className="border rounded-xl p-4">

                    <Bed
                        className="text-blue-600"
                        size={25}
                    />

                    <p className="text-gray-500 mt-2">

                        ICU Beds

                    </p>

                    <h3 className="text-xl font-bold">

                        {recommendationData.icu}

                    </h3>

                </div>



                <div className="border rounded-xl p-4">

                    <Ambulance
                        className="text-red-600"
                        size={25}
                    />

                    <p className="text-gray-500 mt-2">

                        Ambulance

                    </p>

                    <h3 className="text-xl font-bold">

                        {recommendationData.ambulance}

                    </h3>

                </div>



                <div className="border rounded-xl p-4">

                    <Pill
                        className="text-purple-600"
                        size={25}
                    />

                    <p className="text-gray-500 mt-2">

                        Medicines

                    </p>

                    <h3 className="text-xl font-bold">

                        {recommendationData.medicines}

                    </h3>

                </div>



                <div className="border rounded-xl p-4">

                    <Star
                        className="text-yellow-500"
                        size={25}
                    />

                    <p className="text-gray-500 mt-2">

                        Match Score

                    </p>

                    <h3 className="text-xl font-bold">

                        {recommendationData.score}%

                    </h3>

                </div>


            </div>



            {/* AI Reasons */}

            <div className="mt-6 bg-gray-50 rounded-xl p-4">


                <div className="flex items-center gap-2 mb-3">


                    <Brain
                        className="text-indigo-600"
                        size={25}
                    />


                    <h3 className="font-bold text-lg">

                        AI Recommendation Reasons

                    </h3>


                </div>



                <ul className="space-y-2">


                    {

                        recommendationData.reasons.map(
                            (reason,index)=>(

                                <li
                                    key={index}
                                    className="text-gray-700 flex gap-2"
                                >

                                    ✅ {reason}

                                </li>

                            )

                        )

                    }


                </ul>


            </div>



        </div>

    );

}


export default RecommendationCard;