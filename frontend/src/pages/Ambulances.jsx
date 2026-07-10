import { useEffect, useState } from "react";

import Sidebar from "../layout/Sidebar";
import Header from "../components/Header";

import {
    Ambulance,
    MapPin,
    Clock,
    Phone,
    User,
    Building2
} from "lucide-react";

function Ambulances() {

    const [ambulances, setAmbulances] = useState([]);

    async function fetchAmbulances() {

        try {

            const response = await fetch(
                "http://localhost:5000/api/ambulances"
            );

            const data = await response.json();

            console.log("Ambulance Data:", data);

            setAmbulances(data);

        } catch (error) {

            console.error("Error fetching ambulances:", error);

        }

    }

    useEffect(() => {

        fetchAmbulances();

    }, []);

    return (

        <div className="bg-gray-100 min-h-screen">

            <Sidebar />

            <div className="ml-64">

                <Header />

                <div className="p-8">

                    <h1 className="text-4xl font-bold mb-8">
                        🚑 Ambulance Availability
                    </h1>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

                        {ambulances.length === 0 ? (

                            <p className="text-gray-500">
                                No ambulances available
                            </p>

                        ) : (

                            ambulances.map((item) => (

                                <div
                                    key={item.id}
                                    className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition"
                                >

                                    <div className="flex items-center gap-3">

                                        <Ambulance
                                            size={40}
                                            className="text-red-600"
                                        />

                                        <h2 className="text-2xl font-bold">
                                            {item.vehicleNumber}
                                        </h2>

                                    </div>

                                    <div className="mt-5 space-y-3">

                                        <p className="flex items-center gap-2 text-gray-700">
                                            <MapPin size={18} />
                                            {item.location || "Not Available"}
                                        </p>

                                        <p className="flex items-center gap-2 text-gray-700">
                                            <Clock size={18} />
                                            Type : {item.type || "N/A"}
                                        </p>

                                        <p className="flex items-center gap-2 text-gray-700">
                                            <User size={18} />
                                            Driver : {item.driver || "Not Available"}
                                        </p>

                                        <p className="flex items-center gap-2 text-gray-700">
                                            <Phone size={18} />
                                            Phone : {item.phone || "Not Available"}
                                        </p>

                                        <p className="flex items-center gap-2 text-gray-700">
                                            <Clock size={18} />
                                            ETA : {item.eta || "Not Available"}
                                        </p>

                                        <p className="flex items-center gap-2 text-gray-700">
                                            <Building2 size={18} />
                                            Hospital : {item.hospital || "Not Assigned"}
                                        </p>

                                    </div>

                                    <div className="mt-5">

                                        <span
                                            className={`px-4 py-2 rounded-full font-semibold ${
                                                item.status === "Available"
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-red-100 text-red-700"
                                            }`}
                                        >
                                            {item.status}
                                        </span>

                                    </div>

                                </div>

                            ))

                        )}

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Ambulances;