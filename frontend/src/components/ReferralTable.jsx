import { useEffect, useState } from "react";

import {
    ClipboardList,
    Search,
    SquarePen,
    Trash2,
    Filter,
     Eye,
} from "lucide-react";

import {
    getReferrals,
    deleteReferral,
    editReferral,
} from "../services/api";

import EditReferralModal from "./EditReferralModal";
import ReferralDetailsModal from "./ReferralDetailsModal";

function ReferralTable() {

    const [referrals, setReferrals] = useState([]);

    const [search, setSearch] = useState("");

    const [statusFilter, setStatusFilter] = useState("All");

    const [editingReferral, setEditingReferral] = useState(null);

    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedReferral, setSelectedReferral] = useState(null);

    const [showDetailsModal, setShowDetailsModal] = useState(false);

    async function loadReferrals() {

        try {

            const data = await getReferrals();

            setReferrals(data);

        }

        catch (error) {

            console.error(error);

        }

    }

    useEffect(() => {

        loadReferrals();

        const interval = setInterval(

            loadReferrals,

            3000

        );

        return () => clearInterval(interval);

    }, []);

    async function handleDelete(id) {

        const confirmed = window.confirm(

            "Delete this referral?"

        );

        if (!confirmed) {

            return;

        }

        try {

            await deleteReferral(id);

            loadReferrals();

        }

        catch (error) {

            console.error(error);

            alert("Failed to delete referral.");

        }

    }

    function handleEdit(referral) {

        setEditingReferral(referral);

        setShowEditModal(true);

    }
    function handleView(referral) {

    setSelectedReferral(referral);

    setShowDetailsModal(true);

}

    async function handleSave(updatedReferral) {

        try {

            await editReferral(

                updatedReferral.id,

                updatedReferral

            );

            setShowEditModal(false);

            setEditingReferral(null);

            loadReferrals();

        }

        catch (error) {

            console.error(error);

            alert("Failed to update referral.");

        }

    }

    function getStatusColor(status) {

        switch (status) {

            case "MATCHED":

                return "bg-blue-600";

            case "ACCEPTED":

                return "bg-yellow-500";

            case "AMBULANCE_ASSIGNED":

                return "bg-purple-600";

            case "PATIENT_PICKED":

                return "bg-indigo-600";

            case "PATIENT_ADMITTED":

                return "bg-orange-500";

            case "COMPLETED":

                return "bg-green-600";

            default:

                return "bg-gray-500";

        }

    }

    const filteredReferrals = referrals.filter(

        (referral) => {

            const matchesSearch =

                referral.patientName

                    .toLowerCase()

                    .includes(

                        search.toLowerCase()

                    );

            const matchesStatus =

                statusFilter === "All" ||

                referral.status === statusFilter;

            return (

                matchesSearch &&

                matchesStatus

            );

        }

    ); 
        return (

        <div className="bg-white rounded-xl shadow p-6">

            <div className="flex justify-between items-center mb-6">

                <div className="flex items-center gap-3">

                    <ClipboardList
                        size={28}
                        className="text-blue-600"
                    />

                    <h2 className="text-2xl font-bold">

                        Recent Referrals

                    </h2>

                </div>

                <div className="flex gap-4">

                    <div className="relative">

                        <Search
                            size={18}
                            className="absolute left-3 top-3 text-gray-500"
                        />

                        <input
                            type="text"
                            placeholder="Search Patient..."
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                            className="border rounded-lg pl-10 pr-4 py-2 w-64"
                        />

                    </div>

                    <div className="relative">

                        <Filter
                            size={18}
                            className="absolute left-3 top-3 text-gray-500"
                        />

                        <select
                            value={statusFilter}
                            onChange={(e) =>
                                setStatusFilter(e.target.value)
                            }
                            className="border rounded-lg pl-10 pr-4 py-2"
                        >

                            <option>All</option>

                            <option>MATCHED</option>

                            <option>ACCEPTED</option>

                            <option>AMBULANCE_ASSIGNED</option>

                            <option>PATIENT_PICKED</option>

                            <option>PATIENT_ADMITTED</option>

                            <option>COMPLETED</option>

                        </select>

                    </div>

                </div>

            </div>

            <div className="overflow-x-auto">

                <table className="w-full">

                    <thead>

                        <tr className="border-b bg-gray-50">

                            <th className="text-left py-3 px-2">

                                Patient

                            </th>

                            <th className="text-left px-2">

                                Condition

                            </th>

                            <th className="text-left px-2">

                                Priority

                            </th>

                            <th className="text-left px-2">

                                Hospital

                            </th>

                            <th className="text-left px-2">

                                Status

                            </th>

                            <th className="text-center px-2">

                                Actions

                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            filteredReferrals.map((referral) => (

                                <tr

                                    key={referral.id}

                                    className="border-b hover:bg-blue-50 transition"

                                >

                                    <td className="py-4 px-2 font-medium">

                                        {referral.patientName}

                                    </td>

                                    <td className="px-2">

                                        {referral.condition}

                                    </td>

                                    <td className="px-2">

                                        <span className="font-semibold">

                                            {referral.priority}

                                        </span>

                                    </td>

                                    <td className="px-2">

                                        {referral.recommendedHospital}

                                    </td>

                                    <td className="px-2">

                                        <span

                                            className={`px-3 py-1 rounded-full text-white text-sm ${getStatusColor(

                                                referral.status

                                            )}`}

                                        >

                                            {referral.status}

                                        </span>

                                    </td>

                                    <td className="px-2">

                                            <div className="flex justify-center gap-2">

    <button
        onClick={() => handleView(referral)}
        className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg transition"
    >
        <Eye size={16} />
        View
    </button>

    <button
        onClick={() => handleEdit(referral)}
        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg transition"
    >
        <SquarePen size={16} />
        Edit
    </button>

    <button
        onClick={() => handleDelete(referral.id)}
        className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg transition"
    >
        <Trash2 size={16} />
        Delete
    </button>

</div>
                                    </td>

                                </tr>

                            ))

                        }

                        {

                            filteredReferrals.length === 0 && (

                                <tr>

                                    <td

                                        colSpan="6"

                                        className="text-center py-10 text-gray-500"

                                    >

                                        No referrals found.

                                    </td>

                                </tr>

                            )

                        }

                    </tbody>

                </table>

            </div>
                        {

                showEditModal && (

                    <EditReferralModal

                        referral={editingReferral}

                        onClose={() => {

                            setShowEditModal(false);

                            setEditingReferral(null);

                        }}

                        onSave={handleSave}

                    />

                )

            }
            {

    showDetailsModal && (

        <ReferralDetailsModal

            referral={selectedReferral}

            onClose={() => {

                setShowDetailsModal(false);

                setSelectedReferral(null);

            }}

        />

    )

}

        </div>

    );

}

export default ReferralTable;