 import {
    Building2,
    MapPin,
    BedDouble,
    Ambulance,
    Clock3,
    Activity,
    CheckCircle2,
    XCircle,
    AlertCircle,
    Bed
} from "lucide-react";

function HospitalCard({ hospital }) {

    const available = hospital.icu > 0;

    return (

        <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6">

            {/* Hospital Name */}

            <div className="flex items-center gap-3">

                <div className="bg-blue-100 p-3 rounded-xl">

                    <Building2 className="text-blue-600" size={24} />

                </div>

                <div>

                    <h2 className="text-2xl font-bold">

                        {hospital.name}

                    </h2>

                    <p className="flex gap-2 text-gray-600">
                        <MapPin size={20}/>
                        {hospital.city}
                    </p>

                    <p className="flex gap-2 text-gray-600">
                        <Bed size={20}/>
                        ICU Beds: {hospital.icu}
                        </p>

                    <p className="flex gap-2 text-gray-600">
                        <Ambulance size={20}/>
                        Ambulances: {hospital.ambulances}
                    </p>

                    <p className="font-semibold">
                        Status:
                        <span className="text-green-600 ml-2">
                        {hospital.status}
                        </span>
                    </p>

                </div>

            </div>

            {/* Divider */}

            <div className="border-t my-5"></div>

            {/* ICU Beds */}

            <div className="flex justify-between items-center mb-4">

                <div className="flex items-center gap-2">

                    <BedDouble
                        className="text-green-600"
                        size={20}
                    />

                    <span className="font-medium">
                        ICU Beds
                    </span>

                </div>

                <span className="text-xl font-bold">

                    {hospital.icu}

                </span>

            </div>

            {/* Ambulances */}

            <div className="flex justify-between items-center mb-6">

                <div className="flex items-center gap-2">

                    <Ambulance
                        className="text-red-600"
                        size={20}
                    />

                    <span className="font-medium">
                        Ambulances
                    </span>

                </div>

                <span className="text-xl font-bold">

                    {hospital.ambulances}

                </span>

            </div>

            {/* Status */}

            <div>

                {available ? (

                    <span className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold">

                        <CheckCircle2 size={18} />

                        Available

                    </span>

                ) : (

                    <span className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-full font-semibold">

                        <XCircle size={18} />

                        Full

                    </span>

                )}

            </div>

        </div>

    );

}

export default HospitalCard;