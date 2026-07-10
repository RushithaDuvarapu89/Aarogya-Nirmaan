import { AlertTriangle } from "lucide-react";

function EmergencyBanner() {
    return (
        <div className="bg-red-600 rounded-2xl text-white shadow-lg p-8">

            {/* Header */}

            <div className="flex justify-between items-start">

                <div className="flex items-center gap-4">

                    <AlertTriangle
                        size={40}
                        className="text-yellow-300"
                    />

                    <div>

                        <h2 className="text-4xl font-bold">
                            ACTIVE EMERGENCY
                        </h2>

                        <p className="text-red-100 mt-2">
                            Emergency referral currently in progress
                        </p>

                    </div>

                </div>

                <div className="w-10 h-10 rounded-full bg-white animate-pulse"></div>

            </div>

            {/* Details */}

            <div className="grid grid-cols-3 gap-10 mt-10">

                <div>
                    <p className="text-red-200 text-sm">
                        Patient
                    </p>

                    <h3 className="text-xl font-semibold mt-1">
                        --
                    </h3>
                </div>

                <div>
                    <p className="text-red-200 text-sm">
                        Age
                    </p>

                    <h3 className="text-xl font-semibold mt-1">
                        --
                    </h3>
                </div>

                <div>
                    <p className="text-red-200 text-sm">
                        Condition
                    </p>

                    <h3 className="text-xl font-semibold mt-1">
                        --
                    </h3>
                </div>

                <div>
                    <p className="text-red-200 text-sm">
                        Current Hospital
                    </p>

                    <h3 className="text-xl font-semibold mt-1">
                        --
                    </h3>
                </div>

                <div>
                    <p className="text-red-200 text-sm">
                        Required
                    </p>

                    <h3 className="text-xl font-semibold mt-1">
                        --
                    </h3>
                </div>

                <div>
                    <p className="text-red-200 text-sm">
                        Recommended Hospital
                    </p>

                    <h3 className="text-xl font-semibold mt-1">
                        --
                    </h3>
                </div>

            </div>

        </div>
    );
}

export default EmergencyBanner;