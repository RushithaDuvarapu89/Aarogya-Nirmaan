 function HospitalRecommendation({ hospitals }) {

    return (

        <div className="bg-white rounded-xl shadow p-6">

            <h2 className="text-2xl font-bold mb-6">

                🏥 Recommended Hospitals

            </h2>

            <div className="space-y-4">

                {

                    hospitals.map((hospital, index) => (

                        <div
                            key={hospital.id}
                            className={`border rounded-lg p-5 ${
                                index === 0
                                    ? "border-green-600 bg-green-50"
                                    : "border-gray-300"
                            }`}
                        >

                            <div className="flex justify-between items-center">

                                <div>

                                    <h3 className="text-lg font-bold">

                                        {hospital.name}

                                    </h3>

                                    <p className="text-gray-600">

                                        {hospital.city}

                                    </p>

                                </div>

                                <div className="text-right">

                                    <p className="font-bold text-green-700">

                                        Score : {hospital.score}

                                    </p>

                                </div>

                            </div>

                            <div className="mt-4">

                                <p>

                                    ICU Beds :
                                    <span className="font-semibold">

                                        {" "}
                                        {hospital.icuBeds}

                                    </span>

                                </p>

                                <p>

                                    Ambulances :
                                    <span className="font-semibold">

                                        {" "}
                                        {hospital.ambulance}

                                    </span>

                                </p>

                                <p>

                                    Distance :
                                    <span className="font-semibold">

                                        {" "}
                                        {hospital.distance}

                                    </span>

                                </p>

                                <p>

                                    ETA :
                                    <span className="font-semibold">

                                        {" "}
                                        {hospital.eta}

                                    </span>

                                </p>

                            </div>

                            {

                                hospital.reasons &&
                                hospital.reasons.length > 0 && (

                                    <div className="mt-4">

                                        <p className="font-semibold mb-2">

                                            Recommendation Reasons

                                        </p>

                                        <div className="flex flex-wrap gap-2">

                                            {

                                                hospital.reasons.map((reason) => (

                                                    <span
                                                        key={reason}
                                                        className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                                                    >

                                                        {reason}

                                                    </span>

                                                ))

                                            }

                                        </div>

                                    </div>

                                )

                            }

                        </div>

                    ))

                }

            </div>

        </div>

    );

}

export default HospitalRecommendation;