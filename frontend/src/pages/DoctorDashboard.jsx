import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../layout/Sidebar";
import Header from "../components/Header";
import {
    User,
    Calendar,
    Users,
    ClipboardList,
    Pill,
    Activity,
    Phone,
    Mail,
    Search,
    Plus,
    X,
    Stethoscope,
    CheckCircle,
    Clock,
    AlertTriangle,
    ArrowRight,
    Filter,
    Download,
    Star,
    Ticket,
    ArrowLeft,
} from "lucide-react";

import { getApprovedAppointments, getDoctorAppointments, MASTER_DOCTORS } from "../utils/sharedData";

function DoctorDashboard() {

    const navigate = useNavigate();

    const [showAddAppointment, setShowAddAppointment] = useState(false);
    const [showPrescriptionModal, setShowPrescriptionModal] = useState(false);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [sharedAppointments, setSharedAppointments] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [doctorSearch, setDoctorSearch] = useState("");

    // Get the logged-in doctor name from localStorage (set during login)
    const loggedInDoctorName = localStorage.getItem("doctorName") || "";

    // Auto-select the logged-in doctor if available, otherwise show all doctors
    useEffect(() => {
        if (loggedInDoctorName) {
            const doc = MASTER_DOCTORS.find(d => d.name === loggedInDoctorName);
            if (doc) {
                setSelectedDoctor(doc);
            }
        }
    }, []);

    // Load shared appointments for the selected doctor
    useEffect(() => {
        if (selectedDoctor) {
            const appts = getDoctorAppointments(selectedDoctor.name);
            setSharedAppointments(appts);
        } else {
            const allAppts = getDoctorAppointments();
            setSharedAppointments(allAppts);
        }
    }, [selectedDoctor]);

    // Refresh when modal closes
    useEffect(() => {
        if (!showPrescriptionModal) {
            const appts = selectedDoctor ? getDoctorAppointments(selectedDoctor.name) : getDoctorAppointments();
            setSharedAppointments(appts);
        }
    }, [showPrescriptionModal, selectedDoctor]);

    // ─── Today's Appointments ──────────────────────────
    const [appointments, setAppointments] = useState([
        { id: 1, patient: "Ravi Kumar", time: "09:00 AM", reason: "Chest Pain Follow-up", status: "Completed" },
        { id: 2, patient: "Priya Sharma", time: "10:30 AM", reason: "Heart Checkup", status: "In Progress" },
        { id: 3, patient: "Amit Singh", time: "11:45 AM", reason: "ECG Review", status: "Scheduled" },
        { id: 4, patient: "Sneha Patel", time: "02:00 PM", reason: "Blood Pressure Check", status: "Scheduled" },
        { id: 5, patient: "Vikram Joshi", time: "03:30 PM", reason: "Angiography Results", status: "Scheduled" },
    ]);

    const [newAppointment, setNewAppointment] = useState({
        patient: "",
        time: "",
        reason: ""
    });

    function handleAddAppointment(e) {
        e.preventDefault();
        if (!newAppointment.patient || !newAppointment.time || !newAppointment.reason) return;
        setAppointments([
            ...appointments,
            {
                id: Date.now(),
                ...newAppointment,
                status: "Scheduled"
            }
        ]);
        setNewAppointment({ patient: "", time: "", reason: "" });
        setShowAddAppointment(false);
    }

    function handleAppointmentStatus(id, newStatus) {
        setAppointments(appointments.map(a =>
            a.id === id ? { ...a, status: newStatus } : a
        ));
    }

    // ─── Patient List ─────────────────────────────────
    const [patients] = useState([
        { id: 1, name: "Ravi Kumar", age: 55, gender: "Male", condition: "Coronary Artery Disease", lastVisit: "2026-06-28", status: "Active" },
        { id: 2, name: "Priya Sharma", age: 42, gender: "Female", condition: "Arrhythmia", lastVisit: "2026-07-01", status: "Active" },
        { id: 3, name: "Amit Singh", age: 38, gender: "Male", condition: "Hypertension", lastVisit: "2026-06-25", status: "Stable" },
        { id: 4, name: "Sneha Patel", age: 60, gender: "Female", condition: "Heart Failure", lastVisit: "2026-07-05", status: "Critical" },
        { id: 5, name: "Vikram Joshi", age: 48, gender: "Male", condition: "Post-Attack Recovery", lastVisit: "2026-06-30", status: "Active" },
        { id: 6, name: "Anita Desai", age: 35, gender: "Female", condition: "Mitral Valve Prolapse", lastVisit: "2026-07-02", status: "Stable" },
    ]);

    const [searchTerm, setSearchTerm] = useState("");
    const filteredPatients = patients.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.condition.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // ─── Referral Requests ────────────────────────────
    const [referrals, setReferrals] = useState([
        { id: 1, patient: "Manoj Gupta", from: "District Hospital", reason: "Cardiac Evaluation", priority: "High", date: "2026-07-10", status: "Pending" },
        { id: 2, patient: "Lakshmi Devi", from: "Area Hospital", reason: "Echocardiogram", priority: "Medium", date: "2026-07-09", status: "Accepted" },
        { id: 3, patient: "Rajesh Kumar", from: "Government General Hospital", reason: "Heart Surgery Consultation", priority: "Critical", date: "2026-07-10", status: "Pending" },
        { id: 4, patient: "Sunita Verma", from: "PHC", reason: "Chest Pain Evaluation", priority: "High", date: "2026-07-08", status: "Pending" },
        { id: 5, patient: "Deepak Nair", from: "District Hospital", reason: "Holter Monitoring", priority: "Low", date: "2026-07-07", status: "Declined" },
    ]);

    function handleReferralAction(id, action) {
        setReferrals(referrals.map(r =>
            r.id === id ? { ...r, status: action } : r
        ));
    }

    // ─── Prescriptions ────────────────────────────────
    const [prescriptions, setPrescriptions] = useState([
        { id: 1, patient: "Ravi Kumar", medicine: "Aspirin 75mg", dosage: "1 tablet daily", prescribed: "2026-07-05", till: "2026-08-05" },
        { id: 2, patient: "Priya Sharma", medicine: "Metoprolol 50mg", dosage: "1 tablet twice daily", prescribed: "2026-07-01", till: "2026-08-01" },
        { id: 3, patient: "Amit Singh", medicine: "Amlodipine 5mg", dosage: "1 tablet daily", prescribed: "2026-06-25", till: "2026-07-25" },
    ]);

    const [newPrescription, setNewPrescription] = useState({
        patient: "",
        medicine: "",
        dosage: "",
        till: ""
    });

    function handleAddPrescription(e) {
        e.preventDefault();
        if (!newPrescription.patient || !newPrescription.medicine || !newPrescription.dosage || !newPrescription.till) return;
        setPrescriptions([
            ...prescriptions,
            {
                id: Date.now(),
                ...newPrescription,
                prescribed: new Date().toISOString().split("T")[0]
            }
        ]);
        setNewPrescription({ patient: "", medicine: "", dosage: "", till: "" });
        setShowPrescriptionModal(false);
    }

    // ─── Stats ───────────────────────────────────────
    const activePatients = patients.filter(p => p.status === "Active").length;
    const criticalPatients = patients.filter(p => p.status === "Critical").length;
    const pendingReferrals = referrals.filter(r => r.status === "Pending").length;
    const todayAppointments = appointments.length;
    const completedToday = appointments.filter(a => a.status === "Completed").length;

    const stats = [
        { label: "Total Patients", value: patients.length, icon: Users, color: "bg-blue-500", change: "+2 this week" },
        { label: "Active Cases", value: activePatients, icon: Activity, color: "bg-green-500", change: `${criticalPatients} critical` },
        { label: "Pending Referrals", value: pendingReferrals, icon: ClipboardList, color: "bg-orange-500", change: "Needs review" },
        { label: "Today's Appointments", value: todayAppointments, icon: Calendar, color: "bg-purple-500", change: `${completedToday} completed` },
    ];

    const statusColors = {
        "Completed": "bg-green-100 text-green-700",
        "In Progress": "bg-blue-100 text-blue-700",
        "Scheduled": "bg-yellow-100 text-yellow-700",
        "Pending": "bg-orange-100 text-orange-700",
        "Accepted": "bg-green-100 text-green-700",
        "Declined": "bg-red-100 text-red-700",
        "Critical": "bg-red-100 text-red-700",
        "Active": "bg-blue-100 text-blue-700",
        "Stable": "bg-green-100 text-green-700",
    };

    const priorityColors = {
        "Critical": "bg-red-500",
        "High": "bg-orange-500",
        "Medium": "bg-yellow-500",
        "Low": "bg-green-500",
    };

    // Filter doctors list
    const filteredDoctors = MASTER_DOCTORS.filter(doc => {
        const search = doctorSearch.toLowerCase();
        return (
            doc.name.toLowerCase().includes(search) ||
            doc.specialty.toLowerCase().includes(search) ||
            doc.hospital.toLowerCase().includes(search)
        );
    });

    // ─── DOCTOR SELECTION GRID ────────────────────────
    const renderDoctorSelection = () => (
        <div>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-4xl font-bold text-gray-900">Doctor Dashboard</h1>
                    <p className="text-gray-500 mt-1">Select a doctor to view their appointments and details</p>
                </div>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search doctors..."
                        value={doctorSearch}
                        onChange={(e) => setDoctorSearch(e.target.value)}
                        className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 w-64"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredDoctors.map((doc, idx) => {
                    const docAppts = getDoctorAppointments(doc.name);
                    return (
                        <div
                            key={idx}
                            onClick={() => setSelectedDoctor(doc)}
                            className="bg-white rounded-2xl shadow-lg p-5 hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer border-2 border-transparent hover:border-green-300"
                        >
                            <div className="flex items-start justify-between mb-3">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-white font-bold text-sm">
                                    {doc.name.split(" ").slice(1).map(n => n[0]).join("")}
                                </div>
                                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                                    doc.status === "Available" 
                                        ? "bg-green-100 text-green-700" 
                                        : doc.status === "In Surgery" || doc.status === "In Consultation"
                                            ? "bg-amber-100 text-amber-700"
                                            : "bg-gray-100 text-gray-600"
                                }`}>
                                    {doc.status}
                                </span>
                            </div>
                            <h3 className="font-bold text-gray-900">{doc.name}</h3>
                            <p className="text-sm text-emerald-600 font-medium">{doc.specialty}</p>
                            <p className="text-xs text-gray-500 mt-1">🏥 {doc.hospital}</p>
                            <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center">
                                <span className="text-xs text-gray-400">📞 {doc.phone}</span>
                                {docAppts.length > 0 && (
                                    <span className="bg-blue-100 text-blue-700 text-[10px] px-2 py-0.5 rounded-full font-bold">
                                        {docAppts.length} Patient(s)
                                    </span>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );

    // ─── DOCTOR PROFILE VIEW ──────────────────────────
    const renderDoctorProfile = () => {
        if (!selectedDoctor) return null;
        const doc = selectedDoctor;
        return (
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-6">
                        <div className="w-20 h-20 rounded-full overflow-hidden ring-2 ring-green-200 shadow-md flex-shrink-0">
                            <img
                                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(doc.name)}&background=059669&color=fff&size=80&bold=true&format=svg`}
                                alt={doc.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">{doc.name}</h2>
                            <div className="flex items-center gap-2 mt-1">
                                <Stethoscope className="text-green-600" size={18} />
                                <span className="text-gray-600">{doc.specialty}</span>
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                                <p className="text-gray-500">{doc.hospital}</p>
                                <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                                    doc.status === "Available" 
                                        ? "bg-green-100 text-green-700" 
                                        : "bg-amber-100 text-amber-700"
                                }`}>
                                    {doc.status}
                                </span>
                            </div>
                            <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                                <div className="flex items-center gap-1">
                                    <Phone size={14} />
                                    {doc.phone}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                            {sharedAppointments.filter((appt) => appt.status !== "completed").length} OPD Patient(s)
                        </span>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="bg-gray-100 min-h-screen">
            <Sidebar />
            <div className="ml-64">
                <Header />

                <div className="p-8">

                    {/* ── Back button when a doctor is selected ── */}
                    {selectedDoctor && (
                        <button
                            onClick={() => setSelectedDoctor(null)}
                            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition"
                        >
                            <ArrowLeft size={20} />
                            <span className="font-medium">Back to All Doctors</span>
                        </button>
                    )}

                    {/* ── Show Doctor Selection or Doctor Profile ── */}
                    {!selectedDoctor ? (
                        renderDoctorSelection()
                    ) : (
                        <>
                            {/* ── Page Title ───────────────────────────── */}
                            <div className="flex justify-between items-center mb-8">
                                <div>
                                    <h1 className="text-4xl font-bold text-gray-900">{selectedDoctor.name}</h1>
                                    <p className="text-gray-500 mt-1">{selectedDoctor.specialty} • {selectedDoctor.hospital}</p>
                                </div>
                                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm">
                                    <Clock className="text-gray-400" size={18} />
                                    <span className="text-gray-600 font-medium">{new Date().toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</span>
                                </div>
                            </div>

                            {/* ── Doctor Profile ────────────── */}
                            {renderDoctorProfile()}

                            {/* ── Section 2: Stats Cards ──────────────── */}
                            <div className="grid grid-cols-4 gap-6 mb-8">
                                {stats.map((stat) => (
                                    <div key={stat.label} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
                                        <div className="flex items-center justify-between">
                                            <div className={`${stat.color} p-3 rounded-xl text-white`}>
                                                <stat.icon size={24} />
                                            </div>
                                            <span className="text-sm text-gray-400">{stat.change}</span>
                                        </div>
                                        <p className="text-4xl font-bold mt-4 text-gray-900">{stat.value}</p>
                                        <p className="text-gray-500 mt-1">{stat.label}</p>
                                    </div>
                                ))}
                            </div>

                            {/* ── Section 3: Shared Appointments from Patients (with Tokens) ─────── */}
                            {sharedAppointments.length > 0 && (
                                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-6 mb-8">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <Ticket className="text-blue-600" size={28} />
                                            <h2 className="text-2xl font-bold text-gray-900">Next OPD List (Token System)</h2>
                                        </div>
                                        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                                            {sharedAppointments.filter((appt) => appt.status !== "completed").length} Upcoming
                                        </span>
                                    </div>
                                    <div className="overflow-x-auto">
                                        <table className="w-full">
                                            <thead>
                                                <tr className="border-b border-blue-200 text-left text-gray-500 text-sm">
                                                    <th className="pb-3 font-medium">Token</th>
                                                    <th className="pb-3 font-medium">Patient</th>
                                                    <th className="pb-3 font-medium">Hospital</th>
                                                    <th className="pb-3 font-medium">Date/Time</th>
                                                    <th className="pb-3 font-medium">Reason</th>
                                                    <th className="pb-3 font-medium">Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {sharedAppointments.map((appt) => (
                                                    <tr key={appt.id} className="border-b border-blue-100 last:border-b-0 hover:bg-blue-50/50 transition">
                                                        <td className="py-4">
                                                            <span className={`font-mono font-bold text-sm px-2.5 py-1 rounded-lg ${
                                                                appt.isOverflow 
                                                                    ? "bg-orange-100 text-orange-700 border border-orange-200" 
                                                                    : "bg-blue-100 text-blue-700 border border-blue-200"
                                                            }`}>
                                                                🎫 {appt.token}
                                                            </span>
                                                            {appt.isOverflow && (
                                                                <span className="ml-1 text-[10px] text-orange-600 font-medium">(Overflow)</span>
                                                            )}
                                                        </td>
                                                        <td className="py-4 font-medium text-gray-900">{appt.patientName}</td>
                                                        <td className="py-4 text-gray-600 text-sm">{appt.hospitalName}</td>
                                                        <td className="py-4 text-gray-600 text-sm">{appt.date} {appt.time}</td>
                                                        <td className="py-4 text-gray-600 text-sm">
                                                            {appt.reason || "—"}
                                                            {appt.recommendedHospital && (
                                                                <div className="mt-2 rounded-lg border border-emerald-200 bg-emerald-50 px-2 py-2 text-[11px] text-emerald-700">
                                                                    <div className="font-semibold">Best Hospital: {appt.recommendedHospital.name}</div>
                                                                    <div>{appt.recommendedHospital.city}</div>
                                                                    <div>ICU {appt.recommendedHospital.availableEmergencyIcuBeds} · Beds {appt.recommendedHospital.availableBeds} · Vent {appt.recommendedHospital.ventilators}</div>
                                                                </div>
                                                            )}
                                                        </td>
                                                        <td className="py-4">
                                                            <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                                                                appt.status === "approved" 
                                                                    ? "bg-green-100 text-green-700" 
                                                                    : appt.status === "in-consultation"
                                                                        ? "bg-purple-100 text-purple-700"
                                                                        : appt.status === "pending"
                                                                            ? "bg-amber-100 text-amber-700"
                                                                            : "bg-gray-100 text-gray-600"
                                                            }`}>
                                                                {appt.status === "approved" ? "✅ Approved" : appt.status === "in-consultation" ? "🩺 In Consultation" : appt.status === "pending" ? "⏳ Pending" : appt.status}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}

                            {sharedAppointments.length === 0 && (
                                <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 text-center">
                                    <Ticket size={48} className="text-gray-300 mx-auto mb-3" />
                                    <h3 className="text-lg font-semibold text-gray-500">No Patient Appointments Yet</h3>
                                    <p className="text-sm text-gray-400 mt-1">When patients book appointments and receptionist approves them, they will appear here.</p>
                                </div>
                            )}

                            {/* ── Section 4: Today's Appointments ─────── */}
                            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-3">
                                        <Calendar className="text-blue-600" size={28} />
                                        <h2 className="text-2xl font-bold text-gray-900">Today's Appointments</h2>
                                    </div>
                                    <button
                                        onClick={() => setShowAddAppointment(true)}
                                        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                                    >
                                        <Plus size={18} />
                                        Add Appointment
                                    </button>
                                </div>

                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="border-b text-left text-gray-500 text-sm">
                                                <th className="pb-3 font-medium">Patient</th>
                                                <th className="pb-3 font-medium">Time</th>
                                                <th className="pb-3 font-medium">Reason</th>
                                                <th className="pb-3 font-medium">Status</th>
                                                <th className="pb-3 font-medium">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {appointments.map((apt) => (
                                                <tr key={apt.id} className="border-b last:border-b-0 hover:bg-gray-50 transition">
                                                    <td className="py-4 font-medium text-gray-900">{apt.patient}</td>
                                                    <td className="py-4 text-gray-600">{apt.time}</td>
                                                    <td className="py-4 text-gray-600">{apt.reason}</td>
                                                    <td className="py-4">
                                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[apt.status]}`}>
                                                            {apt.status}
                                                        </span>
                                                    </td>
                                                    <td className="py-4">
                                                        {apt.status === "Scheduled" && (
                                                            <div className="flex gap-2">
                                                                <button
                                                                    onClick={() => handleAppointmentStatus(apt.id, "In Progress")}
                                                                    className="text-xs bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 transition"
                                                                >
                                                                    Start
                                                                </button>
                                                                <button
                                                                    onClick={() => handleAppointmentStatus(apt.id, "Completed")}
                                                                    className="text-xs bg-green-600 text-white px-3 py-1.5 rounded-lg hover:bg-green-700 transition"
                                                                >
                                                                    Complete
                                                                </button>
                                                            </div>
                                                        )}
                                                        {apt.status === "In Progress" && (
                                                            <button
                                                                onClick={() => handleAppointmentStatus(apt.id, "Completed")}
                                                                className="text-xs bg-green-600 text-white px-3 py-1.5 rounded-lg hover:bg-green-700 transition"
                                                            >
                                                                Mark Done
                                                            </button>
                                                        )}
                                                        {apt.status === "Completed" && (
                                                            <span className="text-green-600 text-sm flex items-center gap-1">
                                                                <CheckCircle size={16} /> Done
                                                            </span>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* ── Section 5: Patient List ─────────────── */}
                            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-3">
                                        <Users className="text-blue-600" size={28} />
                                        <h2 className="text-2xl font-bold text-gray-900">Patient List</h2>
                                    </div>
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                        <input
                                            type="text"
                                            placeholder="Search patients..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
                                        />
                                    </div>
                                </div>

                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="border-b text-left text-gray-500 text-sm">
                                                <th className="pb-3 font-medium">Patient</th>
                                                <th className="pb-3 font-medium">Age/Gender</th>
                                                <th className="pb-3 font-medium">Condition</th>
                                                <th className="pb-3 font-medium">Last Visit</th>
                                                <th className="pb-3 font-medium">Status</th>
                                                <th className="pb-3 font-medium">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredPatients.map((p) => (
                                                <tr key={p.id} className="border-b last:border-b-0 hover:bg-gray-50 transition">
                                                    <td className="py-4 font-medium text-gray-900">{p.name}</td>
                                                    <td className="py-4 text-gray-600">{p.age} yrs / {p.gender}</td>
                                                    <td className="py-4 text-gray-600">{p.condition}</td>
                                                    <td className="py-4 text-gray-600">{p.lastVisit}</td>
                                                    <td className="py-4">
                                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[p.status]}`}>
                                                            {p.status}
                                                        </span>
                                                    </td>
                                                    <td className="py-4">
                                                        <div className="flex gap-2">
                                                            <button
                                                                onClick={() => navigate(`/patient-health-record/${p.id}`)}
                                                                className="text-xs bg-purple-600 text-white px-3 py-1.5 rounded-lg hover:bg-purple-700 transition"
                                                            >
                                                                <ClipboardList size={14} className="inline mr-1" />
                                                                Records
                                                            </button>
                                                            <button
                                                                onClick={() => {
                                                                    setSelectedPatient(p);
                                                                    setShowPrescriptionModal(true);
                                                                    setNewPrescription({ ...newPrescription, patient: p.name });
                                                                }}
                                                                className="text-xs bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 transition"
                                                            >
                                                                <Pill size={14} className="inline mr-1" />
                                                                Prescribe
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* ── Section 6: Referral Requests ────────── */}
                            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-3">
                                        <ClipboardList className="text-blue-600" size={28} />
                                        <h2 className="text-2xl font-bold text-gray-900">Referral Requests</h2>
                                        {pendingReferrals > 0 && (
                                            <span className="bg-red-100 text-red-700 text-sm px-3 py-1 rounded-full font-medium">
                                                {pendingReferrals} Pending
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    {referrals.map((ref) => (
                                        <div key={ref.id} className="border rounded-xl p-5 hover:shadow-md transition">
                                            <div className="flex items-start justify-between">
                                                <div className="flex items-start gap-4">
                                                    <div className={`w-3 h-3 rounded-full mt-1.5 ${priorityColors[ref.priority]}`}></div>
                                                    <div>
                                                        <h4 className="font-semibold text-gray-900 text-lg">{ref.patient}</h4>
                                                        <p className="text-gray-500 text-sm mt-1">
                                                            From: {ref.from} • {ref.reason}
                                                        </p>
                                                        <p className="text-gray-400 text-xs mt-1">
                                                            Received: {ref.date} • Priority: <span className="font-medium">{ref.priority}</span>
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    {ref.status === "Pending" && (
                                                        <>
                                                            <button
                                                                onClick={() => handleReferralAction(ref.id, "Accepted")}
                                                                className="flex items-center gap-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition text-sm"
                                                            >
                                                                <CheckCircle size={16} />
                                                                Accept
                                                            </button>
                                                            <button
                                                                onClick={() => handleReferralAction(ref.id, "Declined")}
                                                                className="flex items-center gap-1 bg-red-100 text-red-700 px-4 py-2 rounded-lg hover:bg-red-200 transition text-sm"
                                                            >
                                                                <X size={16} />
                                                                Decline
                                                            </button>
                                                        </>
                                                    )}
                                                    {ref.status !== "Pending" && (
                                                        <span className={`px-3 py-1.5 rounded-lg text-sm font-medium ${statusColors[ref.status]}`}>
                                                            {ref.status}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* ── Section 7: Prescriptions ───────────── */}
                            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-3">
                                        <Pill className="text-blue-600" size={28} />
                                        <h2 className="text-2xl font-bold text-gray-900">Prescriptions</h2>
                                    </div>
                                    <button
                                        onClick={() => {
                                            setSelectedPatient(null);
                                            setNewPrescription({ patient: "", medicine: "", dosage: "", till: "" });
                                            setShowPrescriptionModal(true);
                                        }}
                                        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                                    >
                                        <Plus size={18} />
                                        New Prescription
                                    </button>
                                </div>

                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="border-b text-left text-gray-500 text-sm">
                                                <th className="pb-3 font-medium">Patient</th>
                                                <th className="pb-3 font-medium">Medicine</th>
                                                <th className="pb-3 font-medium">Dosage</th>
                                                <th className="pb-3 font-medium">Prescribed</th>
                                                <th className="pb-3 font-medium">Valid Till</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {prescriptions.map((pr) => (
                                                <tr key={pr.id} className="border-b last:border-b-0 hover:bg-gray-50 transition">
                                                    <td className="py-4 font-medium text-gray-900">{pr.patient}</td>
                                                    <td className="py-4 text-gray-600">{pr.medicine}</td>
                                                    <td className="py-4 text-gray-600">{pr.dosage}</td>
                                                    <td className="py-4 text-gray-600">{pr.prescribed}</td>
                                                    <td className="py-4 text-gray-600">{pr.till}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </>
                    )}

                </div>
            </div>

            {/* ── Add Appointment Modal ─────────────────────── */}
            {showAddAppointment && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl p-8 w-full max-w-md mx-4 shadow-2xl">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold text-gray-900">New Appointment</h3>
                            <button onClick={() => setShowAddAppointment(false)} className="text-gray-400 hover:text-gray-600">
                                <X size={24} />
                            </button>
                        </div>
                        <form onSubmit={handleAddAppointment} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Patient Name</label>
                                <input
                                    type="text"
                                    value={newAppointment.patient}
                                    onChange={(e) => setNewAppointment({ ...newAppointment, patient: e.target.value })}
                                    className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter patient name"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                                <input
                                    type="time"
                                    value={newAppointment.time}
                                    onChange={(e) => setNewAppointment({ ...newAppointment, time: e.target.value })}
                                    className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Reason</label>
                                <input
                                    type="text"
                                    value={newAppointment.reason}
                                    onChange={(e) => setNewAppointment({ ...newAppointment, reason: e.target.value })}
                                    className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter reason for visit"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
                            >
                                Add Appointment
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* ── New Prescription Modal ──────────────────── */}
            {showPrescriptionModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl p-8 w-full max-w-md mx-4 shadow-2xl">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold text-gray-900">New Prescription</h3>
                            <button onClick={() => setShowPrescriptionModal(false)} className="text-gray-400 hover:text-gray-600">
                                <X size={24} />
                            </button>
                        </div>
                        <form onSubmit={handleAddPrescription} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Patient</label>
                                <select
                                    value={newPrescription.patient}
                                    onChange={(e) => setNewPrescription({ ...newPrescription, patient: e.target.value })}
                                    className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                >
                                    <option value="">Select patient</option>
                                    {patients.map((p) => (
                                        <option key={p.id} value={p.name}>{p.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Medicine</label>
                                <input
                                    type="text"
                                    value={newPrescription.medicine}
                                    onChange={(e) => setNewPrescription({ ...newPrescription, medicine: e.target.value })}
                                    className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter medicine name"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Dosage</label>
                                <input
                                    type="text"
                                    value={newPrescription.dosage}
                                    onChange={(e) => setNewPrescription({ ...newPrescription, dosage: e.target.value })}
                                    className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="e.g., 1 tablet daily"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Valid Until</label>
                                <input
                                    type="date"
                                    value={newPrescription.till}
                                    onChange={(e) => setNewPrescription({ ...newPrescription, till: e.target.value })}
                                    className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
                            >
                                Issue Prescription
                            </button>
                        </form>
                    </div>
                </div>
            )}

        </div>
    );
}

export default DoctorDashboard;