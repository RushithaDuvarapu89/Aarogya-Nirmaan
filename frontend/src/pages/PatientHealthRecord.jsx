import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    ArrowLeft,
    Download,
    Plus,
    Calendar,
    Activity,
    FileText,
    Pill,
    Heart,
    Thermometer,
    Stethoscope,
    ClipboardList,
    CheckCircle,
    X,
    AlertCircle,
    Clock,
    User,
    Phone,
    Mail,
    Droplets,
    Weight,
    Ruler,
    Syringe,
    Eye,
} from "lucide-react";

// =========================================
// RECEPTIONIST NOTIFICATION SYSTEM
// =========================================
function sendPrescriptionToReception(prescription) {
    try {
        const existing = JSON.parse(localStorage.getItem("receptionist_notifications") || "[]");
        existing.push({
            id: Date.now(),
            ...prescription,
            timestamp: new Date().toISOString(),
            status: "pending"
        });
        localStorage.setItem("receptionist_notifications", JSON.stringify(existing));
        // Also add to prescription history for the patient
        const history = JSON.parse(localStorage.getItem("prescription_history") || "[]");
        history.push({
            id: Date.now(),
            ...prescription,
            timestamp: new Date().toISOString()
        });
        localStorage.setItem("prescription_history", JSON.stringify(history));
        return true;
    } catch (e) {
        console.error("Failed to send prescription:", e);
        return false;
    }
}

// =========================================
// PAST REPORT PARSING & STORAGE
// =========================================
function getPatientReports(patientId) {
    const reports = JSON.parse(localStorage.getItem(`patient_reports_${patientId}`) || "[]");
    return reports;
}

function savePatientReport(patientId, report) {
    const reports = JSON.parse(localStorage.getItem(`patient_reports_${patientId}`) || "[]");
    reports.push({
        id: Date.now(),
        ...report,
        date: new Date().toISOString().split("T")[0]
    });
    localStorage.setItem(`patient_reports_${patientId}`, JSON.stringify(reports));
}

function getPatientPrescriptions(patientId) {
    const all = JSON.parse(localStorage.getItem("prescription_history") || "[]");
    return all.filter(p => p.patientId === patientId).sort((a, b) => new Date(b.prescribed) - new Date(a.prescribed));
}

// =========================================
// SEED DEMO PATIENT DATA
// =========================================
function seedDemoPatientRecords() {
    const doctorPatientIds = [1, 2, 3, 4, 5, 6];

    doctorPatientIds.forEach(pid => {
        const existing = JSON.parse(localStorage.getItem(`patient_reports_${pid}`) || "[]");
        if (existing.length === 0) {
            const demoReports = getDemoReports(pid);
            localStorage.setItem(`patient_reports_${pid}`, JSON.stringify(demoReports));
        }
    });
}

function getDemoReports(patientId) {
    const reportsMap = {
        1: [
            { type: "Blood Report", title: "Complete Blood Count", date: "2026-06-20", doctor: "Dr. Arjun Reddy", details: "Hb: 14.2 g/dL, WBC: 7800, Platelets: 2.5L", file: "CBC_Jun20.pdf" },
            { type: "ECG", title: "Electrocardiogram", date: "2026-06-20", doctor: "Dr. Arjun Reddy", details: "Normal sinus rhythm. No ST elevation detected.", file: "ECG_Jun20.pdf" },
            { type: "Lipid Profile", title: "Cholesterol Test", date: "2026-06-10", doctor: "Dr. Priya Sharma", details: "Total Cholesterol: 180, LDL: 110, HDL: 45", file: "Lipid_Jun10.pdf" },
            { type: "Prescription", title: "Aspirin 75mg", date: "2026-07-05", doctor: "Dr. Arjun Reddy", details: "1 tablet daily after breakfast", file: "Rx_Jul05.pdf" },
        ],
        2: [
            { type: "ECG", title: "24-hour Holter Monitor", date: "2026-06-28", doctor: "Dr. Arjun Reddy", details: "Occasional PVCs. No significant arrhythmia.", file: "Holter_Jun28.pdf" },
            { type: "Blood Report", title: "Thyroid Profile", date: "2026-06-25", doctor: "Dr. Arjun Reddy", details: "TSH: 3.2, T3: 120, T4: 8.5", file: "Thyroid_Jun25.pdf" },
            { type: "Prescription", title: "Metoprolol 50mg", date: "2026-07-01", doctor: "Dr. Arjun Reddy", details: "1 tablet twice daily", file: "Rx_Jul01.pdf" },
        ],
        3: [
            { type: "Blood Report", title: "Kidney Function Test", date: "2026-06-18", doctor: "Dr. Arjun Reddy", details: "Creatinine: 0.9, BUN: 18, eGFR: 65", file: "KFT_Jun18.pdf" },
            { type: "Urine Analysis", title: "Microalbuminuria Test", date: "2026-06-18", doctor: "Dr. Arjun Reddy", details: "Albumin: 30mg/L, Normal range", file: "Urine_Jun18.pdf" },
            { type: "Prescription", title: "Amlodipine 5mg", date: "2026-06-25", doctor: "Dr. Arjun Reddy", details: "1 tablet daily", file: "Rx_Jun25.pdf" },
        ],
        4: [
            { type: "Echocardiogram", title: "2D Echo", date: "2026-07-01", doctor: "Dr. Arjun Reddy", details: "LVEF: 35%, Moderate MR. RWMA present.", file: "Echo_Jul01.pdf" },
            { type: "Blood Report", title: "BNP Test", date: "2026-07-01", doctor: "Dr. Arjun Reddy", details: "BNP: 850 pg/mL (Elevated)", file: "BNP_Jul01.pdf" },
            { type: "Chest X-Ray", title: "Chest PA View", date: "2026-06-28", doctor: "Dr. Arjun Reddy", details: "Cardiomegaly. Pulmonary congestion present.", file: "CXR_Jun28.pdf" },
            { type: "Prescription", title: "Furosemide 40mg", date: "2026-07-05", doctor: "Dr. Arjun Reddy", details: "1 tablet twice daily", file: "Rx_Jul05.pdf" },
        ],
        5: [
            { type: "ECG", title: "Stress Test ECG", date: "2026-06-25", doctor: "Dr. Arjun Reddy", details: "Positive for inducible ischemia in anterior leads.", file: "StressECG_Jun25.pdf" },
            { type: "Blood Report", title: "Cardiac Enzymes", date: "2026-06-25", doctor: "Dr. Arjun Reddy", details: "Troponin I: 0.04, CK-MB: 5.2", file: "Enzymes_Jun25.pdf" },
            { type: "Angiography", title: "Coronary Angiogram", date: "2026-06-28", doctor: "Dr. Arjun Reddy", details: "LAD: 70% stenosis. RCA: 50% stenosis.", file: "Angio_Jun28.pdf" },
            { type: "Prescription", title: "Clopidogrel 75mg", date: "2026-06-30", doctor: "Dr. Arjun Reddy", details: "1 tablet daily", file: "Rx_Jun30.pdf" },
        ],
        6: [
            { type: "Echocardiogram", title: "2D Echo", date: "2026-06-28", doctor: "Dr. Arjun Reddy", details: "Mild MVP. Trace MR. Normal LV function.", file: "Echo_Jun28.pdf" },
            { type: "ECG", title: "Resting ECG", date: "2026-06-28", doctor: "Dr. Arjun Reddy", details: "Normal sinus rhythm. No abnormalities.", file: "ECG_Jun28.pdf" },
            { type: "Prescription", title: "Propranolol 40mg", date: "2026-07-02", doctor: "Dr. Arjun Reddy", details: "1 tablet twice daily", file: "Rx_Jul02.pdf" },
        ],
    };
    return reportsMap[patientId] || [];
}

// =========================================
// PATIENT HEALTH RECORD COMPONENT
// =========================================
function PatientHealthRecord() {
    const navigate = useNavigate();
    const { patientId } = useParams();
    const pid = parseInt(patientId);

    const [activeTab, setActiveTab] = useState("reports");
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [showPrescriptionModal, setShowPrescriptionModal] = useState(false);
    const [showFullReport, setShowFullReport] = useState(null);
    const [notification, setNotification] = useState(null);

    const [patients] = useState([
        { id: 1, name: "Ravi Kumar", age: 55, gender: "Male", condition: "Coronary Artery Disease", lastVisit: "2026-06-28", status: "Active", phone: "+91 98765 43211", bloodGroup: "B+", issue: "Chest pain since 2 weeks" },
        { id: 2, name: "Priya Sharma", age: 42, gender: "Female", condition: "Arrhythmia", lastVisit: "2026-07-01", status: "Active", phone: "+91 98765 43212", bloodGroup: "A+", issue: "Palpitations and dizziness" },
        { id: 3, name: "Amit Singh", age: 38, gender: "Male", condition: "Hypertension", lastVisit: "2026-06-25", status: "Stable", phone: "+91 98765 43213", bloodGroup: "O+", issue: "Routine BP checkup" },
        { id: 4, name: "Sneha Patel", age: 60, gender: "Female", condition: "Heart Failure", lastVisit: "2026-07-05", status: "Critical", phone: "+91 98765 43214", bloodGroup: "AB+", issue: "Shortness of breath, swelling in legs" },
        { id: 5, name: "Vikram Joshi", age: 48, gender: "Male", condition: "Post-Attack Recovery", lastVisit: "2026-06-30", status: "Active", phone: "+91 98765 43215", bloodGroup: "B-", issue: "Follow-up after heart attack" },
        { id: 6, name: "Anita Desai", age: 35, gender: "Female", condition: "Mitral Valve Prolapse", lastVisit: "2026-07-02", status: "Stable", phone: "+91 98765 43216", bloodGroup: "O-", issue: "Chest discomfort on exertion" },
    ]);

    const patient = patients.find(p => p.id === pid);

    const [reports, setReports] = useState([]);
    const [prescriptions, setPrescriptions] = useState([]);

    const [newReport, setNewReport] = useState({ type: "Blood Report", title: "", details: "", file: "" });
    const [newPrescription, setNewPrescription] = useState({
        patient: patient?.name || "",
        patientId: pid,
        medicine: "",
        dosage: "",
        till: ""
    });

    // Seed demo data on first load
    useEffect(() => {
        seedDemoPatientRecords();
    }, []);

    // Load data when patient changes
    useEffect(() => {
        if (pid) {
            setReports(getPatientReports(pid));
            setPrescriptions(getPatientPrescriptions(pid));
            setNewPrescription(prev => ({ ...prev, patient: patient?.name || "", patientId: pid }));
            setNewReport({ type: "Blood Report", title: "", details: "", file: "" });
        }
    }, [pid, patient?.name]);

    function showNotification(msg, type = "success") {
        setNotification({ msg, type });
        setTimeout(() => setNotification(null), 3000);
    }

    // Upload a new report
    function handleUploadReport(e) {
        e.preventDefault();
        if (!newReport.title || !newReport.details) return;
        savePatientReport(pid, newReport);
        setReports(getPatientReports(pid));
        setNewReport({ type: "Blood Report", title: "", details: "", file: "" });
        setShowUploadModal(false);
        showNotification("Report uploaded successfully!");
    }

    // Issue prescription & send to receptionist
    function handleIssuePrescription(e) {
        e.preventDefault();
        if (!newPrescription.medicine || !newPrescription.dosage || !newPrescription.till) return;

        const prescription = {
            ...newPrescription,
            prescribed: new Date().toISOString().split("T")[0],
            doctor: "Dr. Arjun Reddy",
            hospital: "Gandhi Government Hospital, Hyderabad"
        };

        // Save prescription
        const all = JSON.parse(localStorage.getItem("prescription_history") || "[]");
        all.push({
            id: Date.now(),
            ...prescription,
            timestamp: new Date().toISOString()
        });
        localStorage.setItem("prescription_history", JSON.stringify(all));
        setPrescriptions(getPatientPrescriptions(pid));

        // Send to receptionist
        sendPrescriptionToReception(prescription);

        setNewPrescription({ ...newPrescription, medicine: "", dosage: "", till: "" });
        setShowPrescriptionModal(false);
        showNotification("✅ Prescription issued & sent to Receptionist!");
    }

    const reportTypeColors = {
        "Blood Report": "bg-red-100 text-red-700",
        "ECG": "bg-blue-100 text-blue-700",
        "Lipid Profile": "bg-yellow-100 text-yellow-700",
        "Echocardiogram": "bg-purple-100 text-purple-700",
        "Urine Analysis": "bg-orange-100 text-orange-700",
        "Chest X-Ray": "bg-indigo-100 text-indigo-700",
        "Angiography": "bg-pink-100 text-pink-700",
        "Prescription": "bg-green-100 text-green-700",
    };

    const reportIcons = {
        "Blood Report": Droplets,
        "ECG": Activity,
        "Lipid Profile": ClipboardList,
        "Echocardiogram": Heart,
        "Urine Analysis": Thermometer,
        "Chest X-Ray": FileText,
        "Angiography": Eye,
        "Prescription": Pill,
    };

    if (!patient) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="text-center">
                    <AlertCircle size={48} className="text-red-400 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-gray-800">Patient Not Found</h2>
                    <button onClick={() => navigate(-1)} className="mt-4 text-blue-600 hover:underline">Go Back</button>
                </div>
            </div>
        );
    }

    const reportTypeOptions = ["Blood Report", "ECG", "Echocardiogram", "Lipid Profile", "Urine Analysis", "Chest X-Ray", "Angiography", "Prescription"];

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            {/* Notification Toast */}
            {notification && (
                <div className={`fixed top-6 right-6 z-50 px-6 py-3 rounded-xl shadow-xl text-white font-medium flex items-center gap-2 animate-fadeIn ${notification.type === "success" ? "bg-green-600" : "bg-red-600"}`}>
                    <CheckCircle size={20} />
                    {notification.msg}
                </div>
            )}

            <div className="max-w-7xl mx-auto">
                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition"
                >
                    <ArrowLeft size={20} />
                    <span className="font-medium">Back to Dashboard</span>
                </button>

                {/* Patient Header */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                    <div className="flex items-start justify-between">
                        <div className="flex items-center gap-6">
                            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
                                {patient.name.split(" ").map(n => n[0]).join("")}
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">{patient.name}</h1>
                                <div className="flex items-center gap-3 mt-2">
                                    <span className="text-gray-500">{patient.age} yrs / {patient.gender}</span>
                                    <span className="text-gray-300">|</span>
                                    <span className="text-gray-500">Blood: {patient.bloodGroup}</span>
                                    <span className="text-gray-300">|</span>
                                    <span className={`px-3 py-0.5 rounded-full text-xs font-medium ${patient.status === "Critical" ? "bg-red-100 text-red-700" : patient.status === "Active" ? "bg-blue-100 text-blue-700" : "bg-green-100 text-green-700"}`}>
                                        {patient.status}
                                    </span>
                                </div>
                                <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                                    <div className="flex items-center gap-1"><Phone size={14} />{patient.phone}</div>
                                    <div className="flex items-center gap-1"><Activity size={14} />{patient.condition}</div>
                                </div>
                                <div className="mt-3 bg-amber-50 border border-amber-200 rounded-xl px-4 py-2.5 flex items-start gap-2">
                                    <AlertCircle size={16} className="text-amber-500 mt-0.5 flex-shrink-0" />
                                    <div>
                                        <span className="text-sm font-medium text-amber-800">Current Issue: </span>
                                        <span className="text-sm text-amber-700">{patient.issue}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full">
                            <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></div>
                            <span className="text-green-700 font-medium text-sm">Appointment Today</span>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
                    <div className="flex border-b">
                        <button
                            onClick={() => setActiveTab("reports")}
                            className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 text-sm font-medium transition ${activeTab === "reports" ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50/50" : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"}`}
                        >
                            <FileText size={18} />
                            Medical Reports ({reports.length})
                        </button>
                        <button
                            onClick={() => setActiveTab("prescriptions")}
                            className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 text-sm font-medium transition ${activeTab === "prescriptions" ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50/50" : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"}`}
                        >
                            <Pill size={18} />
                            Prescriptions ({prescriptions.length})
                        </button>
                        <button
                            onClick={() => setActiveTab("vitals")}
                            className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 text-sm font-medium transition ${activeTab === "vitals" ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50/50" : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"}`}
                        >
                            <Heart size={18} />
                            Vital Signs
                        </button>
                    </div>

                    {/* Tab Content */}
                    <div className="p-6">
                        {/* REPORTS TAB */}
                        {activeTab === "reports" && (
                            <div>
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-xl font-bold text-gray-900">Patient Medical Records</h3>
                                    <button
                                        onClick={() => setShowUploadModal(true)}
                                        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm"
                                    >
                                        <Plus size={16} />
                                        Upload Report
                                    </button>
                                </div>

                                {reports.length === 0 ? (
                                    <div className="text-center py-12 text-gray-400">
                                        <FileText size={48} className="mx-auto mb-3" />
                                        <p>No medical records found</p>
                                        <p className="text-sm">Upload reports to digitize paper records</p>
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        {reports.sort((a, b) => new Date(b.date) - new Date(a.date)).map((report, idx) => {
                                            const ReportIcon = reportIcons[report.type] || FileText;
                                            return (
                                                <div
                                                    key={report.id || idx}
                                                    className="border rounded-xl p-4 hover:shadow-md transition cursor-pointer"
                                                    onClick={() => setShowFullReport(report)}
                                                >
                                                    <div className="flex items-start justify-between">
                                                        <div className="flex items-start gap-3">
                                                            <div className={`p-2.5 rounded-xl ${reportTypeColors[report.type] || "bg-gray-100 text-gray-700"}`}>
                                                                <ReportIcon size={20} />
                                                            </div>
                                                            <div>
                                                                <h4 className="font-semibold text-gray-900">{report.title}</h4>
                                                                <p className="text-sm text-gray-500 mt-0.5">
                                                                    {report.type} • {report.date} • {report.doctor}
                                                                </p>
                                                                <p className="text-sm text-gray-600 mt-1 line-clamp-1">{report.details}</p>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <span className={`text-xs px-2 py-1 rounded-full font-medium ${reportTypeColors[report.type] || "bg-gray-100 text-gray-700"}`}>
                                                                {report.type}
                                                            </span>
                                                            {report.file && (
                                                                <Download size={16} className="text-gray-400 hover:text-blue-600 cursor-pointer"
                                                                    onClick={(e) => { e.stopPropagation(); showNotification("Report downloaded!"); }}
                                                                />
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* PRESCRIPTIONS TAB */}
                        {activeTab === "prescriptions" && (
                            <div>
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-xl font-bold text-gray-900">Prescription History</h3>
                                    <button
                                        onClick={() => {
                                            setShowPrescriptionModal(true);
                                        }}
                                        className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition text-sm"
                                    >
                                        <Plus size={16} />
                                        New Prescription
                                    </button>
                                </div>

                                {prescriptions.length === 0 ? (
                                    <div className="text-center py-12 text-gray-400">
                                        <Pill size={48} className="mx-auto mb-3" />
                                        <p>No prescriptions yet</p>
                                        <p className="text-sm">Issue a prescription to get started</p>
                                    </div>
                                ) : (
                                    <div className="overflow-x-auto">
                                        <table className="w-full">
                                            <thead>
                                                <tr className="border-b text-left text-gray-500 text-sm">
                                                    <th className="pb-3 font-medium">Medicine</th>
                                                    <th className="pb-3 font-medium">Dosage</th>
                                                    <th className="pb-3 font-medium">Prescribed</th>
                                                    <th className="pb-3 font-medium">Valid Till</th>
                                                    <th className="pb-3 font-medium">Doctor</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {prescriptions.map((pr, idx) => (
                                                    <tr key={pr.id || idx} className="border-b last:border-b-0 hover:bg-gray-50 transition">
                                                        <td className="py-4 font-medium text-gray-900">{pr.medicine}</td>
                                                        <td className="py-4 text-gray-600">{pr.dosage}</td>
                                                        <td className="py-4 text-gray-600">{pr.prescribed}</td>
                                                        <td className="py-4 text-gray-600">{pr.till}</td>
                                                        <td className="py-4 text-gray-600">{pr.doctor || "Dr. Arjun Reddy"}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* VITALS TAB */}
                        {activeTab === "vitals" && (
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-6">Vital Signs</h3>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <div className="bg-red-50 rounded-xl p-4 border border-red-100">
                                        <Heart size={24} className="text-red-500 mb-2" />
                                        <p className="text-sm text-gray-500">Heart Rate</p>
                                        <p className="text-2xl font-bold text-gray-900">72 <span className="text-sm font-normal text-gray-500">bpm</span></p>
                                    </div>
                                    <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                                        <Thermometer size={24} className="text-blue-500 mb-2" />
                                        <p className="text-sm text-gray-500">Blood Pressure</p>
                                        <p className="text-2xl font-bold text-gray-900">130/85 <span className="text-sm font-normal text-gray-500">mmHg</span></p>
                                    </div>
                                    <div className="bg-green-50 rounded-xl p-4 border border-green-100">
                                        <Weight size={24} className="text-green-500 mb-2" />
                                        <p className="text-sm text-gray-500">Weight</p>
                                        <p className="text-2xl font-bold text-gray-900">72 <span className="text-sm font-normal text-gray-500">kg</span></p>
                                    </div>
                                    <div className="bg-purple-50 rounded-xl p-4 border border-purple-100">
                                        <Ruler size={24} className="text-purple-500 mb-2" />
                                        <p className="text-sm text-gray-500">Height</p>
                                        <p className="text-2xl font-bold text-gray-900">168 <span className="text-sm font-normal text-gray-500">cm</span></p>
                                    </div>
                                    <div className="bg-orange-50 rounded-xl p-4 border border-orange-100">
                                        <Droplets size={24} className="text-orange-500 mb-2" />
                                        <p className="text-sm text-gray-500">Blood Sugar</p>
                                        <p className="text-2xl font-bold text-gray-900">110 <span className="text-sm font-normal text-gray-500">mg/dL</span></p>
                                    </div>
                                    <div className="bg-teal-50 rounded-xl p-4 border border-teal-100">
                                        <Thermometer size={24} className="text-teal-500 mb-2" />
                                        <p className="text-sm text-gray-500">Temperature</p>
                                        <p className="text-2xl font-bold text-gray-900">98.6 <span className="text-sm font-normal text-gray-500">°F</span></p>
                                    </div>
                                    <div className="bg-pink-50 rounded-xl p-4 border border-pink-100">
                                        <Activity size={24} className="text-pink-500 mb-2" />
                                        <p className="text-sm text-gray-500">Oxygen Saturation</p>
                                        <p className="text-2xl font-bold text-gray-900">97 <span className="text-sm font-normal text-gray-500">%</span></p>
                                    </div>
                                    <div className="bg-indigo-50 rounded-xl p-4 border border-indigo-100">
                                        <Syringe size={24} className="text-indigo-500 mb-2" />
                                        <p className="text-sm text-gray-500">Respiratory Rate</p>
                                        <p className="text-2xl font-bold text-gray-900">16 <span className="text-sm font-normal text-gray-500">/min</span></p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* ── Upload Report Modal ──────────────────── */}
            {showUploadModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl p-8 w-full max-w-lg mx-4 shadow-2xl">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold text-gray-900">Upload Medical Report</h3>
                            <button onClick={() => setShowUploadModal(false)} className="text-gray-400 hover:text-gray-600">
                                <X size={24} />
                            </button>
                        </div>
                        <form onSubmit={handleUploadReport} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Report Type</label>
                                <select
                                    value={newReport.type}
                                    onChange={(e) => setNewReport({ ...newReport, type: e.target.value })}
                                    className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    {reportTypeOptions.map(opt => (
                                        <option key={opt} value={opt}>{opt}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Report Title</label>
                                <input
                                    type="text"
                                    value={newReport.title}
                                    onChange={(e) => setNewReport({ ...newReport, title: e.target.value })}
                                    className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="e.g., Complete Blood Count"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Results / Details</label>
                                <textarea
                                    value={newReport.details}
                                    onChange={(e) => setNewReport({ ...newReport, details: e.target.value })}
                                    className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter test results and observations..."
                                    rows={4}
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
                            >
                                Upload Report
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* ── New Prescription Modal ──────────────────── */}
            {showPrescriptionModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl p-8 w-full max-w-lg mx-4 shadow-2xl">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h3 className="text-xl font-bold text-gray-900">New Prescription</h3>
                                <p className="text-sm text-gray-500">For: {patient.name} • Will be sent to Receptionist</p>
                            </div>
                            <button onClick={() => setShowPrescriptionModal(false)} className="text-gray-400 hover:text-gray-600">
                                <X size={24} />
                            </button>
                        </div>
                        <form onSubmit={handleIssuePrescription} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Medicine</label>
                                <input
                                    type="text"
                                    value={newPrescription.medicine}
                                    onChange={(e) => setNewPrescription({ ...newPrescription, medicine: e.target.value })}
                                    className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
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
                                    className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                                    placeholder="e.g., 1 tablet daily after breakfast"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Valid Until</label>
                                <input
                                    type="date"
                                    value={newPrescription.till}
                                    onChange={(e) => setNewPrescription({ ...newPrescription, till: e.target.value })}
                                    className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                                    required
                                />
                            </div>
                            <div className="bg-green-50 border border-green-200 rounded-xl p-3 flex items-start gap-2">
                                <CheckCircle size={16} className="text-green-600 mt-0.5" />
                                <p className="text-xs text-green-700">
                                    This prescription will be sent to the <strong>Receptionist Dashboard</strong> for processing. The patient can collect medicines after reception confirmation.
                                </p>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition font-semibold flex items-center justify-center gap-2"
                            >
                                <Pill size={18} />
                                Issue Prescription & Send to Reception
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* ── Full Report Viewer Modal ──────────────── */}
            {showFullReport && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl p-8 w-full max-w-xl mx-4 shadow-2xl">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold text-gray-900">{showFullReport.title}</h3>
                            <button onClick={() => setShowFullReport(null)} className="text-gray-400 hover:text-gray-600">
                                <X size={24} />
                            </button>
                        </div>
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-gray-50 rounded-xl p-3">
                                    <p className="text-xs text-gray-500">Type</p>
                                    <p className="font-medium">{showFullReport.type}</p>
                                </div>
                                <div className="bg-gray-50 rounded-xl p-3">
                                    <p className="text-xs text-gray-500">Date</p>
                                    <p className="font-medium">{showFullReport.date}</p>
                                </div>
                                <div className="bg-gray-50 rounded-xl p-3">
                                    <p className="text-xs text-gray-500">Doctor</p>
                                    <p className="font-medium">{showFullReport.doctor}</p>
                                </div>
                                {showFullReport.file && (
                                    <div className="bg-gray-50 rounded-xl p-3">
                                        <p className="text-xs text-gray-500">File</p>
                                        <p className="font-medium text-blue-600 flex items-center gap-1">
                                            <Download size={14} />
                                            {showFullReport.file}
                                        </p>
                                    </div>
                                )}
                            </div>
                            <div className="bg-gray-50 rounded-xl p-4">
                                <p className="text-xs text-gray-500 mb-2">Details / Results</p>
                                <p className="text-gray-800">{showFullReport.details}</p>
                            </div>
                        </div>
                        <button
                            onClick={() => { setShowFullReport(null); showNotification("Report downloaded!"); }}
                            className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold flex items-center justify-center gap-2"
                        >
                            <Download size={18} />
                            Download Report
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default PatientHealthRecord;