import {
    Pill,
    Building2,
    MapPin,
    Package,
    CircleCheckBig,
    TriangleAlert,
    CircleX,
} from "lucide-react";

function MedicineCard({ medicine }) {

    function getStatus() {

        if (medicine.quantity >= 100) {

            return {
                text: "Available",
                color: "bg-green-100 text-green-700",
                progress: "bg-green-500",
                icon: <CircleCheckBig size={16} />,
            };

        }

        if (medicine.quantity >= 30) {

            return {
                text: "Low Stock",
                color: "bg-yellow-100 text-yellow-700",
                progress: "bg-yellow-500",
                icon: <TriangleAlert size={16} />,
            };

        }

        return {

            text: "Out of Stock",
            color: "bg-red-100 text-red-700",
            progress: "bg-red-500",
            icon: <CircleX size={16} />,

        };

    }

    const status = getStatus();

    return (

        <div className="bg-white rounded-3xl border border-gray-100 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 p-6">

            {/* Header */}

            <div className="flex items-center gap-4 mb-6">

                <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-4 rounded-2xl text-white">

                    <Pill size={24} />

                </div>

                <div>

                    <h2 className="text-2xl font-bold">

                        {medicine.name}

                    </h2>

                    <p className="text-gray-500 text-sm">

                        Medicine Inventory

                    </p>

                </div>

            </div>

            {/* Hospital */}

            <div className="flex items-center gap-3 mb-4">

                <Building2
                    size={20}
                    className="text-blue-600"
                />

                <span className="text-gray-700">

                    {medicine.hospital}

                </span>

            </div>

            {/* Distance */}

            <div className="flex items-center gap-3 mb-6">

                <MapPin
                    size={20}
                    className="text-red-500"
                />

                <span className="text-gray-700">

                    {medicine.distance}

                </span>

            </div>

            {/* Quantity */}

            <div>

                <div className="flex justify-between mb-2">

                    <span className="font-semibold">

                        Quantity

                    </span>

                    <span className="font-bold text-blue-600">

                        {medicine.quantity}

                    </span>

                </div>

                <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden shadow-inner">

                    <div

                        className={`h-full rounded-full transition-all duration-700 ${status.progress}`}

                        style={{
                            width: `${Math.min(medicine.quantity, 200) / 2}%`,
                        }}

                    />

                </div>

            </div>

            {/* Footer */}

            <div className="flex justify-between items-center mt-6">

                <div

                    className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium ${status.color}`}

                >

                    {status.icon}

                    {status.text}

                </div>

                <Package

                    size={24}

                    className="text-gray-400"

                />

            </div>

        </div>

    );

}

export default MedicineCard;