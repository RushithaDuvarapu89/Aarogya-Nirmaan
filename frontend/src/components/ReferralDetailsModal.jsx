import {
    Eye,
    User,
    HeartPulse,
    Building2,
    MapPin,
    ShieldPlus,
    Wind,
    Cross,
    Flag,
    CircleCheckBig,
    X,
} from "lucide-react";

import {
    REFERRAL_STAGES,
    getCurrentStage,
} from "../services/referralLifecycle";

function ReferralDetailsModal({

    referral,

    onClose,

}) {

    if (!referral) return null;

    const currentStage = getCurrentStage(
        referral.status
    );

    return (

        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

            <div className="bg-white rounded-2xl shadow-2xl w-[650px] max-h-[90vh] overflow-y-auto">

                <div className="flex justify-between items-center border-b p-6">

                    <div className="flex items-center gap-3">

                        <Eye
                            className="text-blue-600"
                            size={28}
                        />

                        <h2 className="text-2xl font-bold">

                            Referral Details

                        </h2>

                    </div>

                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-red-600"
                    >

                        <X size={24} />

                    </button>

                </div>

                <div className="p-6 space-y-8">

                    {/* Patient */}

                    <section>

                        <h3 className="flex items-center gap-2 font-bold text-lg mb-4">

                            <User
                                size={20}
                                className="text-blue-600"
                            />

                            Patient Information

                        </h3>

                        <div className="grid grid-cols-2 gap-4">

                            <Info
                                label="Patient Name"
                                value={referral.patientName}
                            />

                            <Info
                                label="Age"
                                value={referral.age}
                            />

                            <Info
                                label="Condition"
                                value={referral.condition}
                            />

                            <Info
                                label="Priority"
                                value={referral.priority}
                            />

                        </div>

                    </section>

                    {/* Hospital */}

                    <section>

                        <h3 className="flex items-center gap-2 font-bold text-lg mb-4">

                            <Building2
                                size={20}
                                className="text-green-600"
                            />

                            Hospital Information

                        </h3>

                        <div className="grid grid-cols-2 gap-4">

                            <Info
                                label="Current Hospital"
                                value={referral.currentHospital}
                            />

                            <Info
                                label="Recommended Hospital"
                                value={referral.recommendedHospital}
                            />

                        </div>

                    </section>

                    {/* Resources */}

                    <section>

                        <h3 className="flex items-center gap-2 font-bold text-lg mb-4">

                            <HeartPulse
                                size={20}
                                className="text-red-600"
                            />

                            Required Resources

                        </h3>

                        <div className="space-y-3">

                            <Resource
                                icon={<ShieldPlus size={18} />}
                                text="ICU"
                                active={referral.needICU}
                            />

                            <Resource
                                icon={<Wind size={18} />}
                                text="Ventilator"
                                active={referral.needVentilator}
                            />

                            <Resource
                                icon={<Cross size={18} />}
                                text="Trauma Care"
                                active={referral.needTrauma}
                            />

                        </div>

                    </section>

                    {/* Status */}

                    <section>

                        <h3 className="flex items-center gap-2 font-bold text-lg mb-4">

                            <Flag
                                size={20}
                                className="text-orange-500"
                            />

                            Referral Journey

                        </h3>

                        <div className="space-y-3">

                            {

                                REFERRAL_STAGES.map(

                                    (stage, index) => (

                                        <div
                                            key={stage.key}
                                            className="flex items-center gap-3"
                                        >

                                            <CircleCheckBig

                                                size={22}

                                                className={

                                                    index <= currentStage

                                                        ? "text-green-600"

                                                        : "text-gray-300"

                                                }

                                            />

                                            <span>

                                                {stage.label}

                                            </span>

                                        </div>

                                    )

                                )

                            }

                        </div>

                    </section>

                </div>

                <div className="border-t p-6 flex justify-end">

                    <button

                        onClick={onClose}

                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"

                    >

                        Close

                    </button>

                </div>

            </div>

        </div>

    );

}

function Info({

    label,

    value,

}) {

    return (

        <div className="bg-gray-50 rounded-lg p-4">

            <p className="text-sm text-gray-500">

                {label}

            </p>

            <p className="font-semibold mt-1">

                {String(value)}

            </p>

        </div>

    );

}

function Resource({

    icon,

    text,

    active,

}) {

    return (

        <div className="flex items-center gap-3">

            <div

                className={

                    active

                        ? "text-green-600"

                        : "text-gray-400"

                }

            >

                {icon}

            </div>

            <span>

                {text}

            </span>

            {

                active

                    ? (

                        <CircleCheckBig

                            size={18}

                            className="text-green-600"

                        />

                    )

                    : (

                        <span className="text-gray-400">

                            Not Required

                        </span>

                    )

            }

        </div>

    );

}

export default ReferralDetailsModal;