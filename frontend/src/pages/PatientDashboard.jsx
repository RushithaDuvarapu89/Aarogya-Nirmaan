import { useState, useEffect } from "react";
import Sidebar from "../layout/Sidebar";
import Header from "../components/Header";
import StatCard from "../components/StatCard";
import { addPatientRegistration, seedSharedDemoData, getDashboardStats, MASTER_DOCTORS } from "../utils/sharedData";

// Use the shared master doctors list - only show Available doctors (first 15) for patients
const doctorsData = MASTER_DOCTORS.filter(doc => doc.status === "Available");
const allDoctors = MASTER_DOCTORS;

// Mock Beds Data matching total counters: Total (420) | Occupied (286) | Available (134)
const hospitalBedsData = [
    { 
        name: "Government CHC Chevella", 
        city: "Chevella (Rural)",
        totalBeds: 120, 
        occupiedBeds: 85, 
        availableBeds: 35, 
        emergencyIcuBeds: 4, 
        availableEmergencyIcuBeds: 3,
        ventilators: 2,
        availableVentilators: 1,
        status: "Available"
    },
    { 
        name: "Government PHC Shabad", 
        city: "Shabad (Rural)",
        totalBeds: 50, 
        occupiedBeds: 49, 
        availableBeds: 1, 
        emergencyIcuBeds: 1, 
        availableEmergencyIcuBeds: 0,
        ventilators: 0,
        availableVentilators: 0,
        status: "Full"
    },
    { 
        name: "Govt Area Hospital, Kondapur", 
        city: "Kondapur (Suburban)",
        totalBeds: 250, 
        occupiedBeds: 152, 
        availableBeds: 98, 
        emergencyIcuBeds: 6, 
        availableEmergencyIcuBeds: 4,
        ventilators: 4,
        availableVentilators: 2,
        status: "Limited"
    }
];

// Mock Medicines Data matching total counters: In Stock (1240 qty sum) | Low Stock (38 qty sum) | Out of Stock (12 items)
const medicinesData = [
    { name: "Paracetamol 650mg", category: "Analgesic / Anti-pyretic", stock: 450, hospital: "Government CHC Chevella", status: "In Stock" },
    { name: "Amoxicillin 500mg", category: "Antibiotic", stock: 120, hospital: "Government PHC Shabad", status: "In Stock" },
    { name: "Insulin Glargine", category: "Anti-diabetic", stock: 40, hospital: "Govt Area Hospital, Kondapur", status: "In Stock" },
    { name: "Normal Saline 500ml", category: "IV Fluids", stock: 350, hospital: "Government CHC Chevella", status: "In Stock" },
    { name: "Oxygen Cylinders (D-Type)", category: "Respiratory Support", stock: 25, hospital: "Govt Area Hospital, Kondapur", status: "In Stock" },
    { name: "Metformin 500mg", category: "Anti-diabetic", stock: 180, hospital: "Government PHC Shabad", status: "In Stock" },
    { name: "ORS Packets", category: "Rehydration", stock: 75, hospital: "Government CHC Chevella", status: "In Stock" },
    
    // Low Stock (Total items sum = 38)
    { name: "Ibuprofen 400mg", category: "Analgesic / Anti-inflammatory", stock: 15, hospital: "Government CHC Chevella", status: "Low Stock" },
    { name: "Azithromycin 250mg", category: "Antibiotic", stock: 12, hospital: "Government PHC Shabad", status: "Low Stock" },
    { name: "Salbutamol Inhaler", category: "Bronchodilator", stock: 11, hospital: "Govt Area Hospital, Kondapur", status: "Low Stock" },
    
    // Out of Stock (Total items sum = 12)
    { name: "Rabies Vaccine", category: "Immunization", stock: 0, hospital: "Government CHC Chevella", status: "Out of Stock" },
    { name: "Artesunate Injection", category: "Anti-malarial", stock: 0, hospital: "Government PHC Shabad", status: "Out of Stock" },
    { name: "Snake Anti-Venom", category: "Critical Care", stock: 0, hospital: "Govt Area Hospital, Kondapur", status: "Out of Stock" }
];

// Mock Appointments Queue list (Totals: 156 Today, 42 Waiting, 89 Completed)
const appointmentsQueueData = [
    { patient: "Ramesh Pawar", doctor: "Dr. Rajesh Kumar", hospital: "Government CHC Chevella", time: "09:30 AM", status: "Completed" },
    { patient: "Savitri Devi", doctor: "Dr. Anita Sharma", hospital: "Government PHC Shabad", time: "10:00 AM", status: "Waiting" },
    { patient: "Balaji Rao", doctor: "Dr. Vikram Reddy", hospital: "Govt Area Hospital, Kondapur", time: "10:15 AM", status: "In Consultation" },
    { patient: "Laxmi Prasanna", doctor: "Dr. Priya Patel", hospital: "Government CHC Chevella", time: "10:30 AM", status: "Waiting" },
    { patient: "Narayana Swamy", doctor: "Dr. Sanjay Dutt", hospital: "Government PHC Shabad", time: "11:00 AM", status: "Completed" },
    { patient: "Kavitha Reddy", doctor: "Dr. Meera Sen", hospital: "Govt Area Hospital, Kondapur", time: "11:15 AM", status: "Waiting" },
    { patient: "Mallesh Goud", doctor: "Dr. Amit Verma", hospital: "Government CHC Chevella", time: "11:30 AM", status: "Waiting" },
    { patient: "Shanthamma", doctor: "Dr. Shalini Gupta", hospital: "Government PHC Shabad", time: "12:00 PM", status: "Completed" },
    { patient: "Yousuf Ali", doctor: "Dr. Rohan Das", hospital: "Govt Area Hospital, Kondapur", time: "12:15 PM", status: "Completed" },
    { patient: "Anasuya Bai", doctor: "Dr. Sunita Rao", hospital: "Government CHC Chevella", time: "12:30 PM", status: "Waiting" },
    { patient: "Jagdish Prasad", doctor: "Dr. Alok Mishra", hospital: "Government PHC Shabad", time: "01:00 PM", status: "Completed" },
    { patient: "P. Venkat Ramana", doctor: "Dr. Neha Kapoor", hospital: "Govt Area Hospital, Kondapur", time: "01:30 PM", status: "Waiting" }
];

// Mock Free Slots for Today (Where appointments are available/free)
const freeTimeSlotsData = [
    { doctor: "Dr. Rajesh Kumar", specialty: "Cardiologist", hospital: "Government CHC Chevella", time: "10:30 AM", status: "Available" },
    { doctor: "Dr. Rajesh Kumar", specialty: "Cardiologist", hospital: "Government CHC Chevella", time: "11:45 AM", status: "Available" },
    { doctor: "Dr. Anita Sharma", specialty: "Pediatrician", hospital: "Government PHC Shabad", time: "01:00 PM", status: "Available" },
    { doctor: "Dr. Anita Sharma", specialty: "Pediatrician", hospital: "Government PHC Shabad", time: "02:30 PM", status: "Available" },
    { doctor: "Dr. Vikram Reddy", specialty: "Orthopedic Surgeon", hospital: "Govt Area Hospital, Kondapur", time: "03:30 PM", status: "Available" },
    { doctor: "Dr. Vikram Reddy", specialty: "Orthopedic Surgeon", hospital: "Govt Area Hospital, Kondapur", time: "04:30 PM", status: "Available" },
    { doctor: "Dr. Priya Patel", specialty: "General Physician", hospital: "Government CHC Chevella", time: "09:00 AM", status: "Available" },
    { doctor: "Dr. Priya Patel", specialty: "General Physician", hospital: "Government CHC Chevella", time: "11:15 AM", status: "Available" },
    { doctor: "Dr. Sanjay Dutt", specialty: "Neurologist", hospital: "Government PHC Shabad", time: "03:15 PM", status: "Available" },
    { doctor: "Dr. Meera Sen", specialty: "Gynecologist", hospital: "Govt Area Hospital, Kondapur", time: "02:00 PM", status: "Available" }
];

// Mock Emergency Cases & Ambulance Requests (Totals: 8 Active, 5 Ambulance Requests, 3 Critical)
const emergencyCasesData = [
    { patient: "Gopal Naik", condition: "Acute Snake Bite (Viper)", village: "Malkapur", critical: true, ambulance: "Requested", hospital: "Government CHC Chevella" },
    { patient: "Yellamma", condition: "Active Labor Pain (High Risk)", village: "Kangal", critical: false, ambulance: "Requested", hospital: "Govt Area Hospital, Kondapur" },
    { patient: "Venkataiah", condition: "Severe Chest Pain (Cardiac)", village: "Aloor", critical: true, ambulance: "En Route", hospital: "Govt Area Hospital, Kondapur" },
    { patient: "Sheikh Fareed", condition: "Road Traffic Accident (Multiple Fractures)", village: "Chevella Bypass", critical: true, ambulance: "Requested", hospital: "Government CHC Chevella" },
    { patient: "Bheem Rao", condition: "Severe Cholera / Dehydration", village: "Pamena", critical: false, ambulance: "Self-Transport", hospital: "Government PHC Shabad" },
    { patient: "Manjula", condition: "Severe Asthma Attack (Acute)", village: "Shabad Rural", critical: false, ambulance: "Requested", hospital: "Government PHC Shabad" },
    { patient: "Chennappa", condition: "Organophosphate Poisoning", village: "Raviryal", critical: false, ambulance: "Self-Transport", hospital: "Government CHC Chevella" },
    { patient: "Radhika", condition: "Accidental Chemical Burns", village: "Urella", critical: false, ambulance: "Arrived", hospital: "Govt Area Hospital, Kondapur" }
];

function PatientDashboard() {
    // Modal states
    const [showBookingModal, setShowBookingModal] = useState(false);
    const [showDoctorsModal, setShowDoctorsModal] = useState(false);
    const [showBedsModal, setShowBedsModal] = useState(false);
    const [showMedicinesModal, setShowMedicinesModal] = useState(false);
    const [showApptsQueueModal, setShowApptsQueueModal] = useState(false);
    const [showEmergencyModal, setShowEmergencyModal] = useState(false);
    
    // Filter states
    const [doctorFilter, setDoctorFilter] = useState("Available"); // Available, On-Duty, Offline, All
    const [doctorSearchQuery, setDoctorSearchQuery] = useState("");
    const [medicineFilter, setMedicineFilter] = useState("In Stock"); // In Stock, Low Stock, Out of Stock, All
    const [medicineSearchQuery, setMedicineSearchQuery] = useState("");
    const [apptQueueFilter, setApptQueueFilter] = useState("All"); // All, Waiting, Completed, Free Slots
    const [apptQueueSearchQuery, setApptQueueSearchQuery] = useState("");
    const [emergencyFilter, setEmergencyFilter] = useState("All"); // All, Ambulance Requests, Critical
    const [emergencySearchQuery, setEmergencySearchQuery] = useState("");

    // Booking form state
    const [bookingForm, setBookingForm] = useState({
        patientName: "",
        doctorName: "",
        hospitalName: "",
        date: "",
        time: "",
        reason: ""
    });
    const [bookingSuccess, setBookingSuccess] = useState(false);

    // Stats values state
    const [todayApptsCount, setTodayApptsCount] = useState(156);
    const [pendingApptsCount, setPendingApptsCount] = useState(42);
    const [sharedStats, setSharedStats] = useState({ pending: 0, total: 0, overflowPatients: 0 });

    // Seed demo data on first load and refresh shared stats
    useEffect(() => {
        seedSharedDemoData();
        const stats = getDashboardStats();
        setSharedStats(stats);
    }, []);
    
    // Refresh stats when booking modal closes
    useEffect(() => {
        if (!showBookingModal) {
            const stats = getDashboardStats();
            setSharedStats(stats);
        }
    }, [showBookingModal]);

    // Auto-fill logged in patient if available
    useEffect(() => {
        const loggedInPatient = JSON.parse(localStorage.getItem("patient") || "null");
        if (loggedInPatient && loggedInPatient.name) {
            setBookingForm(prev => ({ ...prev, patientName: loggedInPatient.name }));
        }
    }, [showBookingModal]);

    // Group 1: Appointments (Replaced Patient Registrations)
    const appointmentStats = [
        { title: "Book Appointment", value: "📅 Click here", color: "bg-gradient-to-br from-blue-600 to-indigo-700", type: "book" },
        { title: "Today's Appointments", value: todayApptsCount.toString(), color: "bg-indigo-600", type: "today" },
        { title: "Pending Appointments", value: pendingApptsCount.toString(), color: "bg-cyan-600", type: "pending" },
    ];

    // Group 2: Doctor Availability (dynamic counts from master list)
    const availableCount = allDoctors.filter(d => d.status === "Available").length;
    const onDutyCount = allDoctors.filter(d => d.status !== "Offline").length;
    const offlineCount = allDoctors.filter(d => d.status === "Offline").length;
    const doctorStats = [
        { title: "Available Doctors", value: availableCount.toString(), color: "bg-green-600", filter: "Available" },
        { title: "On-Duty Doctors", value: onDutyCount.toString(), color: "bg-teal-600", filter: "On-Duty" },
        { title: "Offline / Unavailable", value: offlineCount.toString(), color: "bg-gray-500", filter: "Offline" },
    ];

    // Group 3: Bed Availability
    const bedStats = [
        { title: "Total Beds", value: "420", color: "bg-purple-600" },
        { title: "Occupied Beds", value: "286", color: "bg-orange-600" },
        { title: "Available Beds", value: "134", color: "bg-emerald-600" },
    ];

    // Group 4: Medicine Stock
    const medicineStats = [
        { title: "Available Medicines", value: "1,240", color: "bg-sky-600", filter: "In Stock" },
        { title: "Low-Stock Medicines", value: "38", color: "bg-amber-500", filter: "Low Stock" },
        { title: "Out-of-Stock Medicines", value: "12", color: "bg-red-600", filter: "Out of Stock" },
    ];

    // Group 5: Appointments Queue
    const appointmentQueueStats = [
        { title: "Today's Appointments", value: todayApptsCount.toString(), color: "bg-cyan-600", filter: "All" },
        { title: "Waiting Patients", value: pendingApptsCount.toString(), color: "bg-yellow-500", filter: "Waiting" },
        { title: "Completed Consultations", value: "89", color: "bg-lime-600", filter: "Completed" },
    ];

    // Group 6: Emergency Cases
    const emergencyStats = [
        { title: "Active Emergency Cases", value: "8", color: "bg-rose-600", filter: "All" },
        { title: "Ambulance Requests", value: "5", color: "bg-pink-600", filter: "Ambulance Requests" },
        { title: "Critical Patients", value: "3", color: "bg-red-700", filter: "Critical" },
    ];

    const handleStatClick = (groupTitle, item) => {
        if (groupTitle.includes("Appointments") || groupTitle.includes("Booking")) {
            if (item.type === "book") {
                setShowBookingModal(true);
            } else {
                setApptQueueFilter("Free Slots");
                setShowApptsQueueModal(true);
            }
        } else if (groupTitle.includes("Doctor")) {
            setDoctorFilter(item.filter);
            setShowDoctorsModal(true);
        } else if (groupTitle.includes("Bed")) {
            setShowBedsModal(true);
        } else if (groupTitle.includes("Medicine")) {
            if (item.filter) setMedicineFilter(item.filter);
            setShowMedicinesModal(true);
        } else if (groupTitle.includes("Queue")) {
            if (item.filter) setApptQueueFilter(item.filter);
            setShowApptsQueueModal(true);
        } else if (groupTitle.includes("Emergency")) {
            if (item.filter) setEmergencyFilter(item.filter);
            setShowEmergencyModal(true);
        }
    };

    const handleBookingSubmit = async (e) => {
        e.preventDefault();
        
        const loggedInPatient = JSON.parse(localStorage.getItem("patient") || "null");
        
        if (loggedInPatient && loggedInPatient._id) {
            try {
                const res = await fetch(`http://localhost:5000/api/patients/${loggedInPatient._id}/appointments`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        doctorName: bookingForm.doctorName,
                        hospitalName: bookingForm.hospitalName,
                        date: bookingForm.date,
                        time: bookingForm.time
                    }),
                });
                if (res.ok) {
                    setTodayApptsCount(prev => prev + 1);
                    setPendingApptsCount(prev => prev + 1);
                }
            } catch (err) {
                console.error("Failed to post appointment to backend", err);
            }
        } else {
            // Save to shared data store for receptionist & doctor
            const registration = addPatientRegistration({
                patientName: bookingForm.patientName,
                doctorName: bookingForm.doctorName,
                hospitalName: bookingForm.hospitalName,
                date: bookingForm.date,
                time: bookingForm.time,
                reason: bookingForm.reason,
            });
            
            setTodayApptsCount(prev => prev + 1);
            setPendingApptsCount(prev => prev + 1);
            
            // Update shared stats
            const stats = getDashboardStats();
            setSharedStats(stats);
        }

        setBookingSuccess(true);
        setTimeout(() => {
            setBookingSuccess(false);
            setShowBookingModal(false);
            setBookingForm({
                patientName: loggedInPatient?.name || "",
                doctorName: "",
                hospitalName: "",
                date: "",
                time: "",
                reason: ""
            });
        }, 2000);
    };

    // Filter doctors list
    const filteredDoctors = doctorsData.filter(doc => {
        if (doctorFilter === "Available" && doc.status !== "Available") return false;
        if (doctorFilter === "On-Duty" && doc.status === "Offline") return false;
        if (doctorFilter === "Offline" && doc.status !== "Offline") return false;

        const search = doctorSearchQuery.toLowerCase();
        return (
            doc.name.toLowerCase().includes(search) ||
            doc.specialty.toLowerCase().includes(search) ||
            doc.hospital.toLowerCase().includes(search)
        );
    });

    // Filter medicines list
    const filteredMedicines = medicinesData.filter(med => {
        if (medicineFilter !== "All" && med.status !== medicineFilter) return false;

        const search = medicineSearchQuery.toLowerCase();
        return (
            med.name.toLowerCase().includes(search) ||
            med.category.toLowerCase().includes(search) ||
            med.hospital.toLowerCase().includes(search)
        );
    });

    // Filter appointments queue list
    const filteredApptsQueue = appointmentsQueueData.filter(appt => {
        if (apptQueueFilter === "Waiting" && appt.status !== "Waiting" && appt.status !== "In Consultation") return false;
        if (apptQueueFilter === "Completed" && appt.status !== "Completed") return false;

        const search = apptQueueSearchQuery.toLowerCase();
        return (
            appt.patient.toLowerCase().includes(search) ||
            appt.doctor.toLowerCase().includes(search) ||
            appt.hospital.toLowerCase().includes(search)
        );
    });

    // Filter free time slots
    const filteredFreeSlots = freeTimeSlotsData.filter(slot => {
        const search = apptQueueSearchQuery.toLowerCase();
        return (
            slot.doctor.toLowerCase().includes(search) ||
            slot.specialty.toLowerCase().includes(search) ||
            slot.hospital.toLowerCase().includes(search) ||
            slot.time.toLowerCase().includes(search)
        );
    });

    // Filter emergency cases list
    const filteredEmergencyCases = emergencyCasesData.filter(emg => {
        if (emergencyFilter === "Ambulance Requests" && emg.ambulance !== "Requested" && emg.ambulance !== "En Route") return false;
        if (emergencyFilter === "Critical" && !emg.critical) return false;

        const search = emergencySearchQuery.toLowerCase();
        return (
            emg.patient.toLowerCase().includes(search) ||
            emg.condition.toLowerCase().includes(search) ||
            emg.village.toLowerCase().includes(search) ||
            emg.hospital.toLowerCase().includes(search)
        );
    });

    function renderCardGroup(title, stats) {
        const isClickableGroup = title.includes("Appointments") || title.includes("Booking") || title.includes("Doctor") || title.includes("Bed") || title.includes("Medicine") || title.includes("Queue") || title.includes("Emergency");
        
        return (
            <div className="mb-10">
                <h2 className="text-3xl font-bold text-gray-800 mb-5">
                    {title}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {stats.map((item) => (
                        <div 
                            key={item.title} 
                            onClick={() => isClickableGroup && handleStatClick(title, item)}
                            className={isClickableGroup ? "cursor-pointer transform hover:-translate-y-1 transition-all duration-300" : ""}
                        >
                            <StatCard
                                title={item.title}
                                value={item.value}
                                color={item.color}
                            />
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-100 min-h-screen">
            <Sidebar />

            <div className="ml-64">
                <Header />

                <div className="p-8">

                    {/* Page Title */}
                    <div className="mb-8">
                        <h1 className="text-4xl font-bold text-gray-900">
                            🏥 Rural Healthcare Patient Management Dashboard
                        </h1>
                        <p className="text-gray-500 mt-2">
                            Real-time overview of doctor availability, bed status, medicine stock, appointments, and emergency cases.
                        </p>
                    </div>

                    {/* Shared Stats Banner */}
                    {sharedStats.pending > 0 && (
                        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-6 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <span className="text-2xl">🔄</span>
                                <div>
                                    <p className="font-semibold text-amber-800">{sharedStats.pending} Pending Registration(s)</p>
                                    <p className="text-xs text-amber-600">Waiting for receptionist approval</p>
                                </div>
                            </div>
                            {sharedStats.overflowPatients > 0 && (
                                <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-bold">
                                    🎫 {sharedStats.overflowPatients} Token Overflow
                                </span>
                            )}
                        </div>
                    )}

                    {/* Total Summary Bar */}
                    <div className="bg-white rounded-2xl shadow-md p-6 mb-10 grid grid-cols-6 gap-4 text-center">
                        <div>
                            <p className="text-3xl font-bold text-blue-600">{todayApptsCount + 12845}</p>
                            <p className="text-sm text-gray-500">Total Patients</p>
                        </div>
                        <div className="cursor-pointer hover:bg-green-50 p-1 rounded-xl transition" onClick={() => { setDoctorFilter("On-Duty"); setShowDoctorsModal(true); }}>
                            <p className="text-3xl font-bold text-green-600">32</p>
                            <p className="text-sm text-gray-500">Doctors On-Duty 🩺</p>
                        </div>
                        <div className="cursor-pointer hover:bg-purple-50 p-1 rounded-xl transition" onClick={() => { setShowBedsModal(true); }}>
                            <p className="text-3xl font-bold text-emerald-600">134</p>
                            <p className="text-sm text-gray-500">Available Beds 🛏️</p>
                        </div>
                        <div className="cursor-pointer hover:bg-sky-50 p-1 rounded-xl transition" onClick={() => { setMedicineFilter("All"); setShowMedicinesModal(true); }}>
                            <p className="text-3xl font-bold text-sky-600">1,240</p>
                            <p className="text-sm text-gray-500">Medicines in Stock 💊</p>
                        </div>
                        <div className="cursor-pointer hover:bg-yellow-50 p-1 rounded-xl transition" onClick={() => { setApptQueueFilter("Free Slots"); setShowApptsQueueModal(true); }}>
                            <p className="text-3xl font-bold text-yellow-500">{todayApptsCount}</p>
                            <p className="text-sm text-gray-500">Today's Appts 📅</p>
                        </div>
                        <div className="cursor-pointer hover:bg-rose-50 p-1 rounded-xl transition" onClick={() => { setEmergencyFilter("All"); setShowEmergencyModal(true); }}>
                            <p className="text-3xl font-bold text-rose-600">8</p>
                            <p className="text-sm text-gray-500">Active Emergencies 🚨</p>
                        </div>
                    </div>

                    {/* Grouped Metric Cards */}
                    {renderCardGroup("📅 Appointment Booking", appointmentStats)}
                    {renderCardGroup("🩺 Doctor Availability", doctorStats)}
                    {renderCardGroup("🛏️ Bed Availability", bedStats)}
                    {renderCardGroup("💊 Medicine Stock Status", medicineStats)}
                    {renderCardGroup("📅 Appointments Queue", appointmentQueueStats)}
                    {renderCardGroup("🚨 Emergency Cases", emergencyStats)}

                </div>
            </div>

            {/* MODAL 1: Appointment Registration Form */}
            {showBookingModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity">
                    <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-lg mx-4 transform transition-all relative overflow-hidden">
                        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
                        
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                                <span>📅</span> Appointment Registration Form
                            </h2>
                            <button onClick={() => setShowBookingModal(false)} className="text-gray-400 hover:text-gray-600 transition text-2xl">&times;</button>
                        </div>

                        {bookingSuccess ? (
                            <div className="py-12 text-center">
                                <div className="text-6xl mb-4 animate-bounce">🎉</div>
                                <h3 className="text-2xl font-bold text-green-600 mb-2">Registration Successful!</h3>
                                <p className="text-gray-500">Your appointment has been registered and is pending doctor confirmation.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleBookingSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Patient Name</label>
                                    <input 
                                        type="text" 
                                        value={bookingForm.patientName} 
                                        onChange={(e) => setBookingForm({ ...bookingForm, patientName: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
                                        placeholder="Enter patient's full name"
                                        required 
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">Select Hospital</label>
                                        <select 
                                            value={bookingForm.hospitalName} 
                                            onChange={(e) => setBookingForm({ ...bookingForm, hospitalName: e.target.value })}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                                            required
                                        >
                                            <option value="">Select Hospital</option>
                                            <option value="Government CHC Chevella">Government CHC Chevella</option>
                                            <option value="Government PHC Shabad">Government PHC Shabad</option>
                                            <option value="Govt Area Hospital, Kondapur">Govt Area Hospital, Kondapur</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">Select Doctor</label>
                                        <select 
                                            value={bookingForm.doctorName} 
                                            onChange={(e) => setBookingForm({ ...bookingForm, doctorName: e.target.value })}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                                            required
                                        >
                                            <option value="">Select Doctor</option>
                                            {doctorsData
                                                .filter(doc => doc.status === "Available" && (!bookingForm.hospitalName || doc.hospital === bookingForm.hospitalName))
                                                .map(doc => (
                                                    <option key={doc.name} value={doc.name}>{doc.name} ({doc.specialty})</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">Appointment Date</label>
                                        <input 
                                            type="date" 
                                            value={bookingForm.date} 
                                            onChange={(e) => setBookingForm({ ...bookingForm, date: e.target.value })}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
                                            required 
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">Preferred Time</label>
                                        <input 
                                            type="time" 
                                            value={bookingForm.time} 
                                            onChange={(e) => setBookingForm({ ...bookingForm, time: e.target.value })}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
                                            required 
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Reason for Visit (Optional)</label>
                                    <textarea 
                                        value={bookingForm.reason} 
                                        onChange={(e) => setBookingForm({ ...bookingForm, reason: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all h-20 resize-none" 
                                        placeholder="Brief description of symptoms/reason..."
                                    />
                                </div>

                                <div className="flex gap-4 pt-4">
                                    <button 
                                        type="submit" 
                                        className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-3 px-6 rounded-xl hover:shadow-lg hover:shadow-blue-500/20 active:scale-95 transition-all duration-150"
                                    >
                                        Register Appointment
                                    </button>
                                    <button 
                                        type="button" 
                                        onClick={() => setShowBookingModal(false)}
                                        className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3 px-6 rounded-xl transition"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            )}

            {/* MODAL 2: Doctors Availability List */}
            {showDoctorsModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity">
                    <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-4xl mx-4 transform transition-all relative overflow-hidden flex flex-col max-h-[85vh]">
                        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-green-500 to-teal-500"></div>

                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                                    <span>🩺</span> Doctor Availability & Directory
                                </h2>
                                <p className="text-sm text-gray-500 mt-1">Real-time status of rural clinic and referral hospital doctors</p>
                            </div>
                            <button onClick={() => setShowDoctorsModal(false)} className="text-gray-400 hover:text-gray-600 transition text-2xl p-2">&times;</button>
                        </div>

                        <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-6">
                            <div className="flex bg-gray-100 p-1.5 rounded-xl w-full md:w-auto">
                                {[
                                    { id: "Available", label: "Available (18)" },
                                    { id: "On-Duty", label: "On-Duty (32)" },
                                    { id: "Offline", label: "Offline (7)" },
                                    { id: "All", label: "All (39)" }
                                ].map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setDoctorFilter(tab.id)}
                                        className={`flex-1 md:flex-none px-4 py-2 text-sm font-semibold rounded-lg transition-all ${
                                            doctorFilter === tab.id 
                                                ? "bg-white text-teal-600 shadow-sm" 
                                                : "text-gray-500 hover:text-gray-800"
                                        }`}
                                    >
                                        {tab.label}
                                    </button>
                                ))}
                            </div>

                            <div className="relative w-full md:w-64">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">🔍</span>
                                <input
                                    type="text"
                                    placeholder="Search specialty, name..."
                                    value={doctorSearchQuery}
                                    onChange={(e) => setDoctorSearchQuery(e.target.value)}
                                    className="w-full pl-9 pr-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                                />
                            </div>
                        </div>

                        <div className="overflow-y-auto flex-1 pr-2 space-y-4">
                            {filteredDoctors.length === 0 ? (
                                <div className="text-center py-12 text-gray-500">
                                    <p className="text-4xl mb-3">🔍</p>
                                    <p className="text-lg font-medium">No doctors found matching "{doctorSearchQuery}"</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {filteredDoctors.map((doc, idx) => (
                                        <div key={idx} className="bg-gray-50 border border-gray-100 hover:border-teal-200 rounded-2xl p-5 transition flex flex-col justify-between">
                                            <div>
                                                <div className="flex justify-between items-start mb-2">
                                                    <h3 className="font-bold text-lg text-gray-800">{doc.name}</h3>
                                                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                                                        doc.status === "Available" 
                                                            ? "bg-green-100 text-green-700" 
                                                            : doc.status === "Offline" 
                                                                ? "bg-gray-100 text-gray-600" 
                                                                : "bg-amber-100 text-amber-700"
                                                    }`}>
                                                        {doc.status}
                                                    </span>
                                                </div>
                                                <p className="text-sm font-medium text-teal-600">{doc.specialty}</p>
                                                <p className="text-sm text-gray-500 mt-1 flex items-center gap-1.5">
                                                    <span>🏥</span> {doc.hospital}
                                                </p>
                                            </div>
                                            
                                            <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center text-xs text-gray-500">
                                                <span>📞 {doc.phone}</span>
                                                {doc.status === "Available" && (
                                                    <button 
                                                        onClick={() => {
                                                            setBookingForm(prev => ({
                                                                ...prev,
                                                                doctorName: doc.name,
                                                                hospitalName: doc.hospital
                                                            }));
                                                            setShowDoctorsModal(false);
                                                            setShowBookingModal(true);
                                                        }}
                                                        className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-1 px-3 rounded-lg transition"
                                                    >
                                                        Book
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="mt-6 pt-4 border-t border-gray-100 flex justify-end">
                            <button onClick={() => setShowDoctorsModal(false)} className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-2.5 px-6 rounded-xl transition">Close Directory</button>
                        </div>
                    </div>
                </div>
            )}

            {/* MODAL 3: Beds Availability List */}
            {showBedsModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity">
                    <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-4xl mx-4 transform transition-all relative overflow-hidden flex flex-col max-h-[85vh]">
                        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-purple-500 to-indigo-500"></div>

                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                                    <span>🛏️</span> Rural Clinic Bed & Emergency ICU Inventory
                                </h2>
                                <p className="text-sm text-gray-500 mt-1">Real-time status of emergency, ICU, and general ward beds</p>
                            </div>
                            <button onClick={() => setShowBedsModal(false)} className="text-gray-400 hover:text-gray-600 transition text-2xl p-2">&times;</button>
                        </div>

                        <div className="overflow-y-auto flex-1 space-y-6 pr-2">
                            {hospitalBedsData.map((hospital, idx) => (
                                <div key={idx} className="bg-slate-50 border border-slate-100 rounded-2xl p-6 shadow-sm">
                                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b border-gray-200/60 mb-5">
                                        <div>
                                            <h3 className="font-bold text-xl text-gray-800">{hospital.name}</h3>
                                            <p className="text-xs text-gray-400 mt-0.5">Location: {hospital.city}</p>
                                        </div>
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                            hospital.status === "Available" 
                                                ? "bg-green-100 text-green-700" 
                                                : hospital.status === "Limited" 
                                                    ? "bg-amber-100 text-amber-700" 
                                                    : "bg-red-100 text-red-700"
                                        }`}>
                                            {hospital.status} Bed Status
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                                        <div className="bg-white rounded-xl p-4 border border-gray-100 text-center">
                                            <p className="text-2xl font-bold text-slate-800">{hospital.totalBeds}</p>
                                            <p className="text-xs text-gray-500 font-semibold mt-1">Total Ward Beds</p>
                                        </div>
                                        <div className="bg-white rounded-xl p-4 border border-gray-100 text-center">
                                            <p className="text-2xl font-bold text-orange-600">{hospital.occupiedBeds}</p>
                                            <p className="text-xs text-gray-500 font-semibold mt-1">Occupied Ward Beds</p>
                                        </div>
                                        <div className="bg-white rounded-xl p-4 border border-gray-100 text-center">
                                            <p className="text-2xl font-bold text-emerald-600">{hospital.availableBeds}</p>
                                            <p className="text-xs text-gray-500 font-semibold mt-1">Available Ward Beds</p>
                                        </div>
                                        <div className="bg-purple-50 rounded-xl p-4 border border-purple-100 text-center relative overflow-hidden">
                                            <div className="absolute top-0 right-0 bg-purple-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-bl">EMERGENCY</div>
                                            <p className="text-2xl font-bold text-purple-700">{hospital.availableEmergencyIcuBeds} / {hospital.emergencyIcuBeds}</p>
                                            <p className="text-xs text-purple-800 font-semibold mt-1">Available ICU Beds</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-6 mt-4 pt-3 text-sm text-gray-600 font-medium bg-white/50 p-3 rounded-xl border border-gray-100">
                                        <div className="flex items-center gap-1.5">
                                            <span>💨</span> Ventilator Support: 
                                            <span className={hospital.ventilators > 0 ? "text-green-600 font-bold" : "text-gray-400 font-normal"}>
                                                {hospital.ventilators > 0 ? `Yes (${hospital.availableVentilators} Available)` : "None"}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <span>🚑</span> Ambulance On-Duty: 
                                            <span className="text-indigo-600 font-bold">{hospital.ambulance}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 pt-4 border-t border-gray-100 flex justify-end">
                            <button onClick={() => setShowBedsModal(false)} className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-2.5 px-6 rounded-xl transition">Close Inventory</button>
                        </div>
                    </div>
                </div>
            )}

            {/* MODAL 4: Medicine Availability Stock List */}
            {showMedicinesModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity">
                    <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-4xl mx-4 transform transition-all relative overflow-hidden flex flex-col max-h-[85vh]">
                        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-sky-500 to-blue-500"></div>

                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                                    <span>💊</span> Essential Medicines Stock Registry
                                </h2>
                                <p className="text-sm text-gray-500 mt-1">Real-time availability of vital medicines in district clinics</p>
                            </div>
                            <button onClick={() => setShowMedicinesModal(false)} className="text-gray-400 hover:text-gray-600 transition text-2xl p-2">&times;</button>
                        </div>

                        <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-6">
                            <div className="flex bg-gray-100 p-1.5 rounded-xl w-full md:w-auto">
                                {[
                                    { id: "In Stock", label: "In Stock" },
                                    { id: "Low Stock", label: "Low Stock (38)" },
                                    { id: "Out of Stock", label: "Out of Stock (12)" },
                                    { id: "All", label: "All" }
                                ].map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setMedicineFilter(tab.id)}
                                        className={`flex-1 md:flex-none px-4 py-2 text-sm font-semibold rounded-lg transition-all ${
                                            medicineFilter === tab.id 
                                                ? "bg-white text-sky-600 shadow-sm" 
                                                : "text-gray-500 hover:text-gray-800"
                                        }`}
                                    >
                                        {tab.label}
                                    </button>
                                ))}
                            </div>

                            <div className="relative w-full md:w-64">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">🔍</span>
                                <input
                                    type="text"
                                    placeholder="Search medicine name..."
                                    value={medicineSearchQuery}
                                    onChange={(e) => setMedicineSearchQuery(e.target.value)}
                                    className="w-full pl-9 pr-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
                                />
                            </div>
                        </div>

                        <div className="overflow-y-auto flex-1 border border-gray-100 rounded-2xl">
                            {filteredMedicines.length === 0 ? (
                                <div className="text-center py-12 text-gray-500 bg-gray-50 h-full flex flex-col justify-center items-center">
                                    <p className="text-4xl mb-3">💊</p>
                                    <p className="text-lg font-medium">No medicines found matching "{medicineSearchQuery}"</p>
                                </div>
                            ) : (
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Medicine Name</th>
                                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Category</th>
                                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Clinic / Hospital</th>
                                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Stock Qty</th>
                                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {filteredMedicines.map((med, idx) => (
                                            <tr key={idx} className="hover:bg-slate-50 transition">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-800">{med.name}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-medium">{med.category}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex items-center gap-1.5 mt-1">
                                                    <span>🏥</span> {med.hospital}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-slate-800">{med.stock} units</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                                                        med.status === "In Stock" 
                                                            ? "bg-green-100 text-green-700" 
                                                            : med.status === "Low Stock" 
                                                                ? "bg-amber-100 text-amber-700" 
                                                                : "bg-red-100 text-red-700"
                                                    }`}>
                                                        {med.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>

                        <div className="mt-6 pt-4 border-t border-gray-100 flex justify-end">
                            <button onClick={() => setShowMedicinesModal(false)} className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-2.5 px-6 rounded-xl transition">Close Registry</button>
                        </div>
                    </div>
                </div>
            )}

            {/* MODAL 5: Appointments Queue List */}
            {showApptsQueueModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity">
                    <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-4xl mx-4 transform transition-all relative overflow-hidden flex flex-col max-h-[85vh]">
                        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-cyan-500 to-teal-500"></div>

                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                                    <span>📅</span> Live Appointments Queue Status
                                </h2>
                                <p className="text-sm text-gray-500 mt-1">Patient queue status at community clinics and general hospitals</p>
                            </div>
                            <button onClick={() => setShowApptsQueueModal(false)} className="text-gray-400 hover:text-gray-600 transition text-2xl p-2">&times;</button>
                        </div>

                        {/* Queue search and filter */}
                        <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-6">
                            <div className="flex bg-gray-100 p-1.5 rounded-xl w-full md:w-auto">
                                {[
                                    { id: "All", label: "Today's Queue (156)" },
                                    { id: "Waiting", label: "Waiting / Consulting (42)" },
                                    { id: "Completed", label: "Completed (89)" },
                                    { id: "Free Slots", label: "Free Slots Today" }
                                ].map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setApptQueueFilter(tab.id)}
                                        className={`flex-1 md:flex-none px-4 py-2 text-sm font-semibold rounded-lg transition-all ${
                                            apptQueueFilter === tab.id 
                                                ? "bg-white text-cyan-600 shadow-sm" 
                                                : "text-gray-500 hover:text-gray-800"
                                        }`}
                                    >
                                        {tab.label}
                                    </button>
                                ))}
                            </div>

                            <div className="relative w-full md:w-64">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">🔍</span>
                                <input
                                    type="text"
                                    placeholder={apptQueueFilter === "Free Slots" ? "Search free slot..." : "Search patient, doctor..."}
                                    value={apptQueueSearchQuery}
                                    onChange={(e) => setApptQueueSearchQuery(e.target.value)}
                                    className="w-full pl-9 pr-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                                />
                            </div>
                        </div>

                        {/* Queue directory list */}
                        <div className="overflow-y-auto flex-1 border border-gray-100 rounded-2xl">
                            {apptQueueFilter === "Free Slots" ? (
                                filteredFreeSlots.length === 0 ? (
                                    <div className="text-center py-12 text-gray-500 bg-gray-50 h-full flex flex-col justify-center items-center">
                                        <p className="text-4xl mb-3">⏰</p>
                                        <p className="text-lg font-medium">No free slots found matching "{apptQueueSearchQuery}"</p>
                                    </div>
                                ) : (
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Available Doctor</th>
                                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Specialty</th>
                                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Hospital/Clinic Location</th>
                                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Free Time Slot</th>
                                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {filteredFreeSlots.map((slot, idx) => (
                                                <tr key={idx} className="hover:bg-slate-50 transition">
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-800">{slot.doctor}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-teal-600 font-semibold">{slot.specialty}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{slot.hospital}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-cyan-700">{slot.time}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <button
                                                            onClick={() => {
                                                                setBookingForm(prev => ({
                                                                    ...prev,
                                                                    doctorName: slot.doctor,
                                                                    hospitalName: slot.hospital
                                                                }));
                                                                setShowApptsQueueModal(false);
                                                                setShowBookingModal(true);
                                                            }}
                                                            className="bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-bold py-1.5 px-3 rounded-lg transition"
                                                        >
                                                            Book Now
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                )
                            ) : (
                                filteredApptsQueue.length === 0 ? (
                                    <div className="text-center py-12 text-gray-500 bg-gray-50 h-full flex flex-col justify-center items-center">
                                        <p className="text-4xl mb-3">📅</p>
                                        <p className="text-lg font-medium">No appointments found matching "{apptQueueSearchQuery}"</p>
                                    </div>
                                ) : (
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Patient Name</th>
                                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Doctor</th>
                                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Hospital</th>
                                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Time</th>
                                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {filteredApptsQueue.map((appt, idx) => (
                                                <tr key={idx} className="hover:bg-slate-50 transition">
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-800">{appt.patient}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{appt.doctor}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{appt.hospital}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{appt.time}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                                                            appt.status === "Completed" 
                                                                ? "bg-green-100 text-green-700" 
                                                                : appt.status === "In Consultation" 
                                                                    ? "bg-blue-100 text-blue-700" 
                                                                    : "bg-yellow-100 text-yellow-700"
                                                        }`}>
                                                            {appt.status}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                )
                            )}
                        </div>

                        <div className="mt-6 pt-4 border-t border-gray-100 flex justify-end gap-3">
                            <button 
                                onClick={() => {
                                    setApptQueueFilter("Free Slots");
                                }}
                                className="bg-cyan-50 hover:bg-cyan-100 text-cyan-700 font-bold py-2.5 px-6 rounded-xl transition"
                            >
                                View Free Slots
                            </button>
                            <button onClick={() => setShowApptsQueueModal(false)} className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-2.5 px-6 rounded-xl transition">Close</button>
                        </div>
                    </div>
                </div>
            )}

            {/* MODAL 6: Emergency Cases List */}
            {showEmergencyModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity">
                    <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-4xl mx-4 transform transition-all relative overflow-hidden flex flex-col max-h-[85vh]">
                        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-rose-500 to-red-600"></div>

                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                                    <span>🚨</span> Emergency Cases & Ambulance Tracker
                                </h2>
                                <p className="text-sm text-gray-500 mt-1">Real-time active emergency cases across rural healthcare network</p>
                            </div>
                            <button onClick={() => setShowEmergencyModal(false)} className="text-gray-400 hover:text-gray-600 transition text-2xl p-2">&times;</button>
                        </div>

                        <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-6">
                            <div className="flex bg-gray-100 p-1.5 rounded-xl w-full md:w-auto">
                                {[
                                    { id: "All", label: "All (8)" },
                                    { id: "Critical", label: "Critical (3)" },
                                    { id: "Ambulance Requests", label: "Ambulance (5)" }
                                ].map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setEmergencyFilter(tab.id)}
                                        className={`flex-1 md:flex-none px-4 py-2 text-sm font-semibold rounded-lg transition-all ${
                                            emergencyFilter === tab.id 
                                                ? "bg-white text-rose-600 shadow-sm" 
                                                : "text-gray-500 hover:text-gray-800"
                                        }`}
                                    >
                                        {tab.label}
                                    </button>
                                ))}
                            </div>

                            <div className="relative w-full md:w-64">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">🔍</span>
                                <input
                                    type="text"
                                    placeholder="Search patient, condition..."
                                    value={emergencySearchQuery}
                                    onChange={(e) => setEmergencySearchQuery(e.target.value)}
                                    className="w-full pl-9 pr-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all"
                                />
                            </div>
                        </div>

                        <div className="overflow-y-auto flex-1 border border-gray-100 rounded-2xl">
                            {filteredEmergencyCases.length === 0 ? (
                                <div className="text-center py-12 text-gray-500 bg-gray-50 h-full flex flex-col justify-center items-center">
                                    <p className="text-4xl mb-3">🚨</p>
                                    <p className="text-lg font-medium">No emergency cases found matching "{emergencySearchQuery}"</p>
                                </div>
                            ) : (
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Patient</th>
                                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Condition</th>
                                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Village</th>
                                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Destination Hospital</th>
                                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Ambulance</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {filteredEmergencyCases.map((emg, idx) => (
                                            <tr key={idx} className={`hover:bg-slate-50 transition ${emg.critical ? "bg-rose-50/50" : ""}`}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center gap-2">
                                                        {emg.critical && <span className="text-red-600 text-lg">🔴</span>}
                                                        <span className="text-sm font-bold text-gray-800">{emg.patient}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-medium">{emg.condition}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{emg.village}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{emg.hospital}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                                                        emg.ambulance === "Requested" 
                                                            ? "bg-red-100 text-red-700" 
                                                            : emg.ambulance === "En Route" 
                                                                ? "bg-amber-100 text-amber-700"
                                                                : emg.ambulance === "Arrived"
                                                                    ? "bg-green-100 text-green-700"
                                                                    : "bg-gray-100 text-gray-600"
                                                    }`}>
                                                        {emg.ambulance}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>

                        <div className="mt-6 pt-4 border-t border-gray-100 flex justify-end">
                            <button onClick={() => setShowEmergencyModal(false)} className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-2.5 px-6 rounded-xl transition">Close Tracker</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default PatientDashboard;