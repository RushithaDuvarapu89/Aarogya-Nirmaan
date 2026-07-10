import { useEffect, useMemo, useState } from "react";

import Sidebar from "../layout/Sidebar";
import Topbar from "../layout/Topbar";

import MedicineStats from "../components/MedicineStats";
import MedicineSearchBar from "../components/MedicineSearchBar";
import MedicineCard from "../components/MedicineCard";

import { getMedicines } from "../services/api";

function MedicineAvailability() {

    const [medicines, setMedicines] = useState([]);
    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");
    const [hospital, setHospital] = useState("");
    const [stock, setStock] = useState("");
    const [sort, setSort] = useState("");

    useEffect(() => {
        loadMedicines();
    }, []);

    async function loadMedicines() {

        try {

            const data = await getMedicines();
            console.log("Medicines:", data);
            setMedicines(data);

        } catch (error) {

            console.error("Error loading medicines:", error);

        } finally {

            setLoading(false);

        }
    }

    const hospitals = [
        ...new Set(
            medicines.map((medicine) => medicine.hospital)
        ),
    ];

    const filteredMedicines = useMemo(() => {

        let data = [...medicines];

        if (search.trim() !== "") {

            data = data.filter((medicine) =>
                medicine.name
                    .toLowerCase()
                    .includes(search.toLowerCase())
            );
        }

        if (hospital !== "") {

            data = data.filter(
                (medicine) => medicine.hospital === hospital
            );
        }

        if (stock === "available") {

            data = data.filter(
                (medicine) => medicine.quantity > 100
            );
        }

        else if (stock === "low") {

            data = data.filter(
                (medicine) =>
                    medicine.quantity > 30 &&
                    medicine.quantity <= 100
            );
        }

        else if (stock === "out") {

            data = data.filter(
                (medicine) => medicine.quantity <= 30
            );
        }

        if (sort === "name") {

            data.sort((a, b) =>
                a.name.localeCompare(b.name)
            );
        }

        else if (sort === "quantity") {

            data.sort(
                (a, b) => b.quantity - a.quantity
            );
        }

        return data;

    }, [
        medicines,
        search,
        hospital,
        stock,
        sort,
    ]);

    return (

        <div className="flex bg-gray-100 min-h-screen">

            <Sidebar />

            <div className="flex-1 ml-64">

                <Topbar />

                <div className="p-8">

                    {/* Heading */}

                    <div className="mb-8">

                        <h1 className="text-4xl font-bold flex items-center gap-3">

                            💊 Medicine Availability

                        </h1>

                        <p className="text-gray-500 mt-2 text-lg">

                            Monitor medicine inventory across all hospitals.

                        </p>

                    </div>

                    {/* Statistics */}

                    <MedicineStats medicines={medicines} />

                    {/* Search */}

                    <div className="mt-8 mb-8">

                        <MedicineSearchBar

                            search={search}
                            setSearch={setSearch}

                            hospital={hospital}
                            setHospital={setHospital}

                            stock={stock}
                            setStock={setStock}

                            sort={sort}
                            setSort={setSort}

                            hospitals={hospitals}

                        />

                    </div>

                    {/* Loading */}

                    {loading ? (

                        <div className="bg-white rounded-2xl shadow-lg p-16 text-center">

                            <h2 className="text-2xl font-bold">

                                Loading Medicines...

                            </h2>

                        </div>

                    ) : (

                        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">

                            {filteredMedicines.length === 0 ? (

                                <div className="col-span-3">

                                    <div className="bg-white rounded-2xl shadow-lg p-16 text-center">

                                        <h2 className="text-3xl font-bold">

                                            No Medicines Found

                                        </h2>

                                        <p className="text-gray-500 mt-3">

                                            Try changing the search or filter options.

                                        </p>

                                    </div>

                                </div>

                            ) : (

                                filteredMedicines.map((medicine) => (

                                    <MedicineCard

                                        key={medicine.id}
                                        medicine={medicine}

                                    />

                                ))

                            )}

                        </div>

                    )}

                </div>

            </div>

        </div>

    );

}

export default MedicineAvailability;