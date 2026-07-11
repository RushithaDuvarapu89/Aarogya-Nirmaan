import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  UserPlus,
  Calendar,
  Stethoscope,
  Send,
  Megaphone,
  Phone,
  Settings,
  LogOut,
  Building2,
  ChevronLeft,
  ChevronRight,
  Search,
  Plus,
  X,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Printer,
  RefreshCw,
  Users,
  Activity,
  User,
  PhoneCall,
  Ambulance,
  Droplets,
  Flame,
  Shield,
  Moon,
  Sun,
  Save,
  ArrowRight,
  CalendarPlus,
  FileText,
  MapPin,
  Clock as ClockIcon,
  Stethoscope as StethoscopeIcon,
  Bell,
  List,
  Check,
  AlertTriangle,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";

import {
  getPendingRegistrations,
  approveRegistration,
  rejectRegistration,
  MASTER_DOCTORS,
} from "../utils/sharedData";

function ReceptionistDashboard() {
  const [collapsed, setCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [pendingRegistrations, setPendingRegistrations] = useState([]);
  
  // Load pending registrations from shared store
  useEffect(() => {
    setPendingRegistrations(getPendingRegistrations());
  }, []);
  
  // Refresh when tab changes to dashboard
  useEffect(() => {
    if (activeTab === "dashboard" || activeTab === "registration") {
      setPendingRegistrations(getPendingRegistrations());
    }
  }, [activeTab]);
  
  // Override todayPatients to include shared data
  const sharedPending = pendingRegistrations.length;
  
  const handleApproveRegistration = (id) => {
    approveRegistration(id);
    setPendingRegistrations(getPendingRegistrations());
  };
  
  const handleRejectRegistration = (id) => {
    rejectRegistration(id);
    setPendingRegistrations(getPendingRegistrations());
  };

  // ─── HOSPITAL INFO ─────────────────────────────────────────
  const hospitalName = "Government General Hospital, Hyderabad";
  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return "Good Morning";
    if (h < 17) return "Good Afternoon";
    return "Good Evening";
  };

  // ─── PATIENTS DATA ─────────────────────────────────────────
  const [patients, setPatients] = useState([
    { id: 1, name: "Rajesh Kumar", age: 55, gender: "Male", phone: "+91-9876543234", blood: "B+", department: "Cardiology", regTime: "08:30 AM", date: "2026-07-10" },
    { id: 2, name: "Sunita Patel", age: 42, gender: "Female", phone: "+91-9876543235", blood: "O+", department: "Orthopedics", regTime: "08:45 AM", date: "2026-07-10" },
    { id: 3, name: "Amit Singh", age: 30, gender: "Male", phone: "+91-9876543236", blood: "A+", department: "Neurology", regTime: "09:00 AM", date: "2026-07-10" },
    { id: 4, name: "Lakshmi Devi", age: 65, gender: "Female", phone: "+91-9876543237", blood: "AB+", department: "Cardiology", regTime: "09:15 AM", date: "2026-07-10" },
    { id: 5, name: "Vikram Joshi", age: 28, gender: "Male", phone: "+91-9876543238", blood: "B-", department: "General Medicine", regTime: "09:30 AM", date: "2026-07-10" },
  ]);

  // ─── APPOINTMENTS DATA ─────────────────────────────────────
  const [appointments, setAppointments] = useState([
    { id: 1, token: "A001", patientName: "Rajesh Kumar", age: 55, gender: "Male", phone: "+91-9876543234", doctor: "Dr. Priya Sharma", department: "Cardiology", symptoms: "Chest Pain", time: "09:15 AM", status: "waiting", priority: "HIGH", notes: "History of hypertension" },
    { id: 2, token: "A002", patientName: "Sunita Patel", age: 42, gender: "Female", phone: "+91-9876543235", doctor: "Dr. Suresh Reddy", department: "Orthopedics", symptoms: "Fractured Leg", time: "09:30 AM", status: "in-consultation", priority: "MEDIUM", notes: "X-ray required" },
    { id: 3, token: "A003", patientName: "Amit Singh", age: 30, gender: "Male", phone: "+91-9876543236", doctor: "Dr. Meena Gupta", department: "Neurology", symptoms: "Severe Headache", time: "08:45 AM", status: "completed", priority: "LOW", notes: "" },
    { id: 4, token: "A004", patientName: "Lakshmi Devi", age: 65, gender: "Female", phone: "+91-9876543237", doctor: "Dr. Priya Sharma", department: "Cardiology", symptoms: "Breathing Difficulty", time: "09:45 AM", status: "waiting", priority: "HIGH", notes: "Oxygen support needed" },
    { id: 5, token: "A005", patientName: "Vikram Joshi", age: 28, gender: "Male", phone: "+91-9876543238", doctor: "Dr. Rajesh Verma", department: "General Medicine", symptoms: "Food Poisoning", time: "08:00 AM", status: "completed", priority: "MEDIUM", notes: "Discharged" },
  ]);

  const nextToken = () => {
    const nums = appointments.map(a => parseInt(a.token.replace("A", ""))).filter(n => !isNaN(n));
    return `A${String(Math.max(0, ...nums) + 1).padStart(3, "0")}`;
  };

  // ─── DOCTORS DATA (from shared master list) ──────────────
  const [doctors] = useState(() => 
    MASTER_DOCTORS.map((doc, index) => ({
      id: index + 1,
      name: doc.name,
      specialization: doc.specialty,
      department: doc.specialty,
      available: doc.status === "Available",
      timings: "9:00 AM - 5:00 PM",
      room: `${100 + index + 1}`,
    }))
  );

  // ─── REFERRALS DATA ────────────────────────────────────────
  const [referrals, setReferrals] = useState([
    { id: "REF-1001", patientName: "Rajesh Kumar", age: 55, gender: "Male", createdBy: "Dr. Priya Sharma", dept: "Cardiology", destination: "CARE Hospital, Hyderabad", specialty: "Cardiology", requiredDoctor: "Dr. Vikram Patel", bed: "ICU Bed", reason: "Complex angioplasty - not available here", priority: "URGENT", status: "pending", createdAt: "09:15 AM", ambulance: true },
    { id: "REF-1002", patientName: "Sunita Patel", age: 42, gender: "Female", createdBy: "Dr. Suresh Reddy", dept: "Orthopedics", destination: "Apollo Hospital, Hyderabad", specialty: "Orthopedic Surgery", requiredDoctor: "Dr. Anil Kumar", bed: "General Ward", reason: "Complex fracture requiring specialized surgery", priority: "NORMAL", status: "sent", createdAt: "09:30 AM", ambulance: false },
    { id: "REF-1003", patientName: "Amit Singh", age: 30, gender: "Male", createdBy: "Dr. Meena Gupta", dept: "Neurology", destination: "Yashoda Hospital, Hyderabad", specialty: "Neurology", requiredDoctor: "Dr. Ravi Shankar", bed: "ICU Bed", reason: "Suspected stroke - advanced neuro-imaging needed", priority: "EMERGENCY", status: "accepted", createdAt: "08:45 AM", ambulance: true },
    { id: "REF-1004", patientName: "Lakshmi Devi", age: 65, gender: "Female", createdBy: "Dr. Priya Sharma", dept: "Cardiology", destination: "CARE Hospital, Hyderabad", specialty: "Cardiology", requiredDoctor: "Dr. Vikram Patel", bed: "ICU Bed", reason: "Acute heart failure - needs ICU monitoring", priority: "URGENT", status: "rejected", createdAt: "07:30 AM", ambulance: true },
  ]);

  // ─── ANNOUNCEMENTS DATA ────────────────────────────────────
  const [announcements] = useState([
    { id: 1, title: "Blood Donation Camp", desc: "Blood donation camp organized by Red Cross on July 15th, 2026. All staff and visitors are encouraged to participate.", date: "2026-07-15", type: "event", icon: <Droplets size={16} /> },
    { id: 2, title: "OP Closed on Sunday", desc: "The Outpatient Department will remain closed on Sunday, July 12th. Emergency services will be available 24/7.", date: "2026-07-12", type: "notice", icon: <AlertCircle size={16} /> },
    { id: 3, title: "Dr. Meena Gupta on Leave", desc: "Dr. Meena Gupta (Neurology) will be on leave from July 14th to July 16th. Patients may be rescheduled.", date: "2026-07-14", type: "leave", icon: <User size={16} /> },
    { id: 4, title: "Vaccination Camp", desc: "Free COVID-19 vaccination camp for all citizens above 18 years. Walk-ins welcome.", date: "2026-07-20", type: "event", icon: <Shield size={16} /> },
    { id: 5, title: "New Equipment Installed", desc: "New MRI machine installed in Radiology department. Enhanced imaging services now available.", date: "2026-07-10", type: "info", icon: <Activity size={16} /> },
  ]);

  // ─── EMERGENCY CONTACTS ────────────────────────────────────
  const emergencyContacts = [
    { name: "Ambulance", number: "108", icon: <Ambulance size={24} />, color: "bg-red-500" },
    { name: "Police", number: "100", icon: <Shield size={24} />, color: "bg-blue-600" },
    { name: "Fire", number: "101", icon: <Flame size={24} />, color: "bg-orange-500" },
    { name: "District Hospital", number: "040-23231000", icon: <Building2 size={24} />, color: "bg-emerald-600" },
    { name: "Blood Bank", number: "040-24651111", icon: <Droplets size={24} />, color: "bg-red-600" },
    { name: "Disaster Management", number: "1070", icon: <AlertTriangle size={24} />, color: "bg-yellow-600" },
  ];

  // ─── SETTINGS ──────────────────────────────────────────────
  const [settings, setSettings] = useState({
    language: "English",
    darkMode: false,
    notifications: true,
  });

  // ─── FORMS STATE ───────────────────────────────────────────
  const [showRegForm, setShowRegForm] = useState(false);
  const [showApptForm, setShowApptForm] = useState(false);
  const [showReferralForm, setShowReferralForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedItem, setExpandedItem] = useState(null);

  const [regForm, setRegForm] = useState({ name: "", age: "", gender: "", phone: "", blood: "", department: "", address: "" });
  const [apptForm, setApptForm] = useState({ patientName: "", age: "", gender: "", phone: "", symptoms: "", doctorId: "", time: "", notes: "" });
  const [refForm, setRefForm] = useState({ patientName: "", age: "", gender: "", destination: "", specialty: "", reason: "", bed: "", ambulance: false });

  // ─── HANDLERS ──────────────────────────────────────────────
  const handleRegisterPatient = () => {
    if (!regForm.name || !regForm.department) { alert("Fill required fields"); return; }
    const now = new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
    setPatients([{
      id: patients.length + 1, name: regForm.name, age: parseInt(regForm.age) || 0, gender: regForm.gender || "N/A",
      phone: regForm.phone || "N/A", blood: regForm.blood || "Unknown", department: regForm.department,
      regTime: now, date: new Date().toISOString().split("T")[0],
    }, ...patients]);
    setShowRegForm(false);
    setRegForm({ name: "", age: "", gender: "", phone: "", blood: "", department: "", address: "" });
  };

  const handleBookAppointment = () => {
    if (!apptForm.patientName || !apptForm.symptoms || !apptForm.doctorId) { alert("Fill required fields"); return; }
    const doc = doctors.find(d => d.id === parseInt(apptForm.doctorId));
    if (!doc) return;
    const now = new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
    setAppointments([{
      id: appointments.length + 1, token: nextToken(), patientName: apptForm.patientName, age: parseInt(apptForm.age) || 0,
      gender: apptForm.gender || "N/A", phone: apptForm.phone || "N/A", doctor: doc.name, department: doc.department,
      symptoms: apptForm.symptoms, time: apptForm.time || now, status: "waiting", priority: "MEDIUM", notes: apptForm.notes || "",
    }, ...appointments]);
    setShowApptForm(false);
    setApptForm({ patientName: "", age: "", gender: "", phone: "", symptoms: "", doctorId: "", time: "", notes: "" });
  };

  const handleCreateReferral = () => {
    if (!refForm.patientName || !refForm.destination || !refForm.specialty) { alert("Fill required fields"); return; }
    const now = new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
    const refId = `REF-${String(referrals.length + 1001)}`;
    setReferrals([{
      id: refId, patientName: refForm.patientName, age: parseInt(refForm.age) || 0, gender: refForm.gender || "N/A",
      createdBy: "Receptionist", dept: "Reception", destination: refForm.destination, specialty: refForm.specialty,
      requiredDoctor: "To be assigned", bed: refForm.bed || "General Ward", reason: refForm.reason,
      priority: "NORMAL", status: "pending", createdAt: now, ambulance: refForm.ambulance,
    }, ...referrals]);
    setShowReferralForm(false);
    setRefForm({ patientName: "", age: "", gender: "", destination: "", specialty: "", reason: "", bed: "", ambulance: false });
  };

  const handleSendReferral = (id) => {
    setReferrals(referrals.map(r => r.id === id ? { ...r, status: "sent" } : r));
  };

  // ─── BADGES ────────────────────────────────────────────────
  const priorityBadge = (p) => {
    if (p === "EMERGENCY") return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-100 text-red-800">🚨 EMERGENCY</span>;
    if (p === "URGENT") return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-orange-100 text-orange-800">⚡ URGENT</span>;
    if (p === "HIGH") return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-100 text-red-800">HIGH</span>;
    if (p === "MEDIUM") return <span className="px-2 py-0.5 rounded-full text-[10px] bg-yellow-100 text-yellow-800">MEDIUM</span>;
    if (p === "LOW") return <span className="px-2 py-0.5 rounded-full text-[10px] bg-green-100 text-green-800">LOW</span>;
    return <span className="px-2 py-0.5 rounded-full text-[10px] bg-blue-100 text-blue-800">NORMAL</span>;
  };

  const statusBadge = (s) => {
    const map = {
      waiting: ["bg-yellow-100 text-yellow-800", "⏳ Waiting"],
      "in-consultation": ["bg-purple-100 text-purple-800", "🩺 In Consultation"],
      completed: ["bg-green-100 text-green-800", "✓ Completed"],
      cancelled: ["bg-red-100 text-red-800", "✕ Cancelled"],
      pending: ["bg-yellow-100 text-yellow-800", "⏳ Pending"],
      sent: ["bg-blue-100 text-blue-800", "📤 Sent"],
      accepted: ["bg-emerald-100 text-emerald-800", "✅ Accepted"],
      rejected: ["bg-red-100 text-red-800", "❌ Rejected"],
    };
    const [c, l] = map[s] || ["bg-gray-100", s];
    return <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${c}`}>{l}</span>;
  };

  const docAvailBadge = (avail) => {
    return avail
      ? <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-100 text-emerald-700 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block"></span> Available</span>
      : <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-red-100 text-red-700 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block"></span> Busy</span>;
  };

  const announcementTypeIcon = (type) => {
    const map = { event: "bg-purple-100 text-purple-700", notice: "bg-blue-100 text-blue-700", leave: "bg-orange-100 text-orange-700", info: "bg-gray-100 text-gray-700" };
    return map[type] || "bg-gray-100 text-gray-700";
  };

  // ─── STATS ─────────────────────────────────────────────────
  const todayPatients = patients.length + getPendingRegistrations().filter(r => r.status === "approved").length;
  const todayAppts = appointments.length;
  const availDoctors = doctors.filter(d => d.available).length;
  const pendingReferrals = referrals.filter(r => r.status === "pending").length;
  const emergencyCases = appointments.filter(a => a.priority === "HIGH" || a.priority === "EMERGENCY").length;

  // ─── SIDEBAR ───────────────────────────────────────────────
  const menuItems = [
    { key: "dashboard", label: "Dashboard", icon: <LayoutDashboard size={20} /> },
    { key: "registration", label: "Patient Registration", icon: <UserPlus size={20} /> },
    { key: "appointments", label: "Appointments", icon: <Calendar size={20} /> },
    { key: "doctors", label: "Doctors Availability", icon: <Stethoscope size={20} /> },
    { key: "referrals", label: "Referrals", icon: <Send size={20} /> },
    { key: "announcements", label: "Announcements", icon: <Megaphone size={20} /> },
    { key: "emergency", label: "Emergency Contacts", icon: <Phone size={20} /> },
    { key: "settings", label: "Settings", icon: <Settings size={20} /> },
  ];

  const renderSidebar = () => (
    <div className={`fixed left-0 top-0 h-screen bg-slate-900 text-white transition-all duration-300 z-50 flex flex-col ${collapsed ? "w-16" : "w-64"}`}>
      <div className="flex items-center gap-2 p-3 border-b border-slate-700 min-h-[60px]">
        <div className="w-9 h-9 bg-emerald-500 rounded-lg flex items-center justify-center text-white font-bold flex-shrink-0">AN</div>
        {!collapsed && (
          <div className="overflow-hidden">
            <h1 className="text-base font-bold leading-tight">AROGYA</h1>
            <p className="text-[10px] text-emerald-400 leading-tight">NIRMAAN</p>
          </div>
        )}
        <button onClick={() => setCollapsed(!collapsed)} className="ml-auto p-1 hover:bg-slate-700 rounded-lg transition">
          {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </div>

      {!collapsed && (
        <div className="px-3 py-2 border-b border-slate-800">
          <p className="text-[10px] text-slate-400"><Building2 size={10} className="inline mr-1" />Receptionist Panel</p>
        </div>
      )}

      <div className="flex-1 overflow-y-auto py-2 px-1.5 space-y-0.5">
        {menuItems.map((item) => (
          <button
            key={item.key}
            onClick={() => { setActiveTab(item.key); setShowMobileMenu(false); }}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg transition-all duration-200 text-xs ${
              activeTab === item.key
                ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/20"
                : "text-slate-300 hover:bg-slate-800 hover:text-white"
            }`}
            title={collapsed ? item.label : ""}
          >
            <span className="flex-shrink-0">{item.icon}</span>
            {!collapsed && <span className="truncate text-xs font-medium">{item.label}</span>}
            {!collapsed && item.key === "referrals" && pendingReferrals > 0 && (
              <span className="ml-auto bg-red-500 text-white text-[9px] px-1.5 py-0.5 rounded-full">{pendingReferrals}</span>
            )}
          </button>
        ))}
      </div>

      <div className="border-t border-slate-700 p-1.5">
        <button onClick={() => setActiveTab("login")} className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all" title={collapsed ? "Logout" : ""}>
          <LogOut size={18} />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );

  // ==========================================================================
  //  1. DASHBOARD
  // ==========================================================================
  const renderDashboard = () => (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">{greeting()}, Receptionist</h1>
        <p className="text-sm text-gray-500 mt-1">{hospitalName} · {new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</p>
      </div>

      {/* Shared Pending Registrations Banner */}
      {pendingRegistrations.length > 0 && (
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-4 mb-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <AlertCircle size={20} className="text-amber-600" />
              <h3 className="font-semibold text-amber-800">
                {pendingRegistrations.length} Pending Registration(s) from Patients
              </h3>
            </div>
            <span className="text-xs text-amber-600">Click ✓ to approve or ✗ to reject</span>
          </div>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {pendingRegistrations.map((reg) => (
              <div key={reg.id} className="bg-white rounded-lg p-3 flex items-center justify-between shadow-sm border border-amber-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center text-amber-700 font-bold text-xs">
                    {reg.patientName.split(" ").map(n => n[0]).join("").slice(0, 2)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{reg.patientName}</p>
                    <p className="text-[10px] text-gray-500">{reg.doctorName} · {reg.hospitalName} · {reg.date} {reg.time}</p>
                    {reg.recommendedHospital && (
                      <div className="mt-2 rounded-md border border-emerald-200 bg-emerald-50 px-2 py-2 text-[10px] text-emerald-700">
                        <div className="font-semibold">Best Hospital: {reg.recommendedHospital.name}</div>
                        <div>{reg.recommendedHospital.city}</div>
                        <div>ICU {reg.recommendedHospital.availableEmergencyIcuBeds} · Beds {reg.recommendedHospital.availableBeds} · Vent {reg.recommendedHospital.ventilators}</div>
                      </div>
                    )}
                    {reg.isOverflow && (
                      <span className="text-[10px] bg-orange-100 text-orange-700 px-1.5 py-0.5 rounded font-medium">
                        🎫 Token #{reg.token} (Overflow slot)
                      </span>
                    )}
                    {!reg.isOverflow && reg.token && (
                      <span className="text-[10px] bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded font-medium">
                        🎫 Token #{reg.token}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleApproveRegistration(reg.id)}
                    className="bg-green-500 hover:bg-green-600 text-white p-1.5 rounded-lg transition"
                    title="Approve"
                  >
                    <ThumbsUp size={16} />
                  </button>
                  <button
                    onClick={() => handleRejectRegistration(reg.id)}
                    className="bg-red-500 hover:bg-red-600 text-white p-1.5 rounded-lg transition"
                    title="Reject"
                  >
                    <ThumbsDown size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-5 text-white shadow-lg hover:shadow-xl transition cursor-pointer" onClick={() => setActiveTab("registration")}>
          <div className="flex items-center gap-3 mb-3"><Users size={24} /><p className="text-sm font-medium opacity-90">Registered Patients</p></div>
          <p className="text-4xl font-bold">{todayPatients}</p>
          <p className="text-xs opacity-75 mt-1">Today's registrations</p>
        </div>
        <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl p-5 text-white shadow-lg hover:shadow-xl transition cursor-pointer" onClick={() => setActiveTab("appointments")}>
          <div className="flex items-center gap-3 mb-3"><Calendar size={24} /><p className="text-sm font-medium opacity-90">Appointments</p></div>
          <p className="text-4xl font-bold">{todayAppts}</p>
          <p className="text-xs opacity-75 mt-1">Today's appointments</p>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-5 text-white shadow-lg hover:shadow-xl transition cursor-pointer" onClick={() => setActiveTab("doctors")}>
          <div className="flex items-center gap-3 mb-3"><Stethoscope size={24} /><p className="text-sm font-medium opacity-90">Available Doctors</p></div>
          <p className="text-4xl font-bold">{availDoctors}/{doctors.length}</p>
          <p className="text-xs opacity-75 mt-1">Currently available</p>
        </div>
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-5 text-white shadow-lg hover:shadow-xl transition cursor-pointer" onClick={() => setActiveTab("referrals")}>
          <div className="flex items-center gap-3 mb-3"><Send size={24} /><p className="text-sm font-medium opacity-90">Pending Referrals</p></div>
          <p className="text-4xl font-bold">{pendingReferrals}</p>
          <p className="text-xs opacity-75 mt-1">Needs action</p>
        </div>
        <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl p-5 text-white shadow-lg hover:shadow-xl transition cursor-pointer" onClick={() => setActiveTab("appointments")}>
          <div className="flex items-center gap-3 mb-3"><AlertCircle size={24} /><p className="text-sm font-medium opacity-90">Emergency Cases</p></div>
          <p className="text-4xl font-bold">{emergencyCases}</p>
          <p className="text-xs opacity-75 mt-1">High priority</p>
        </div>
      </div>

      {/* Today's Appointments + Available Doctors */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Today's Appointments */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-4 border-b flex items-center justify-between">
            <h2 className="font-semibold text-gray-900 flex items-center gap-2"><Calendar size={16} className="text-blue-500" /> Today's Appointments</h2>
            <button onClick={() => setActiveTab("appointments")} className="text-xs text-blue-600 hover:text-blue-800 font-medium">View All →</button>
          </div>
          <div className="p-3 space-y-2">
            {appointments.slice(0, 4).map((a) => (
              <div key={a.id} className="flex items-center justify-between p-2.5 bg-gray-50 rounded-lg hover:bg-blue-50 transition">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold text-blue-600 bg-blue-100 px-2 py-1 rounded">{a.token}</span>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{a.patientName}</p>
                    <p className="text-[10px] text-gray-500">{a.doctor} · {a.department}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">{statusBadge(a.status)}<span className="text-xs text-gray-500">{a.time}</span></div>
              </div>
            ))}
            {appointments.length === 0 && <p className="text-xs text-gray-500 text-center py-4">No appointments today.</p>}
          </div>
        </div>

        {/* Available Doctors */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-4 border-b flex items-center justify-between">
            <h2 className="font-semibold text-gray-900 flex items-center gap-2"><Stethoscope size={16} className="text-emerald-500" /> Available Doctors</h2>
            <button onClick={() => setActiveTab("doctors")} className="text-xs text-blue-600 hover:text-blue-800 font-medium">View All →</button>
          </div>
          <div className="p-3 space-y-2">
            {doctors.filter(d => d.available).slice(0, 4).map((d) => (
              <div key={d.id} className="flex items-center justify-between p-2.5 bg-gray-50 rounded-lg hover:bg-emerald-50 transition">
                <div>
                  <p className="text-sm font-medium text-gray-900">{d.name}</p>
                  <p className="text-[10px] text-gray-500">{d.specialization} · Room {d.room}</p>
                </div>
                {docAvailBadge(d.available)}
              </div>
            ))}
            {doctors.filter(d => d.available).length === 0 && <p className="text-xs text-gray-500 text-center py-4">No doctors available.</p>}
          </div>
        </div>
      </div>

      {/* Recent Registrations */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="font-semibold text-gray-900 flex items-center gap-2"><UserPlus size={16} className="text-blue-500" /> Recent Registrations</h2>
          <button onClick={() => setActiveTab("registration")} className="text-xs text-blue-600 hover:text-blue-800 font-medium">View All →</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="text-left p-3 text-[10px] text-gray-500 uppercase">Token</th>
                <th className="text-left p-3 text-[10px] text-gray-500 uppercase">Patient</th>
                <th className="text-left p-3 text-[10px] text-gray-500 uppercase">Age</th>
                <th className="text-left p-3 text-[10px] text-gray-500 uppercase">Department</th>
                <th className="text-left p-3 text-[10px] text-gray-500 uppercase">Time</th>
              </tr>
            </thead>
            <tbody>
              {patients.slice(0, 5).map((p) => (
                <tr key={p.id} className="border-b hover:bg-gray-50">
                  <td className="p-3 font-mono text-blue-600 font-bold">{String(p.id).padStart(3, "0")}</td>
                  <td className="p-3 font-medium">{p.name}</td>
                  <td className="p-3 text-gray-600">{p.age}</td>
                  <td className="p-3">{p.department}</td>
                  <td className="p-3 text-gray-500">{p.regTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // ==========================================================================
  //  2. PATIENT REGISTRATION
  // ==========================================================================
  const renderRegistration = () => (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2"><UserPlus size={22} className="text-blue-600" /> Patient Registration</h1>
        <button onClick={() => setShowRegForm(true)} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-xs flex items-center gap-1.5 transition">
          <Plus size={14} /> Register New Patient
        </button>
      </div>

      {/* Search */}
      <div className="mb-4 relative max-w-md">
        <Search size={14} className="absolute left-3 top-2.5 text-gray-400" />
        <input type="text" placeholder="Search patient by name or phone..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="border border-gray-200 rounded-lg pl-9 pr-3 py-2 w-full text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
      </div>

      {/* Patients Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="text-left p-3 text-[10px] text-gray-500 uppercase">ID</th>
              <th className="text-left p-3 text-[10px] text-gray-500 uppercase">Patient Name</th>
              <th className="text-left p-3 text-[10px] text-gray-500 uppercase">Age/Gender</th>
              <th className="text-left p-3 text-[10px] text-gray-500 uppercase">Phone</th>
              <th className="text-left p-3 text-[10px] text-gray-500 uppercase">Blood</th>
              <th className="text-left p-3 text-[10px] text-gray-500 uppercase">Department</th>
              <th className="text-left p-3 text-[10px] text-gray-500 uppercase">Time</th>
              <th className="text-left p-3 text-[10px] text-gray-500 uppercase">Action</th>
            </tr>
          </thead>
          <tbody>
            {patients.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.phone.includes(searchQuery)).map((p) => (
              <tr key={p.id} className="border-b hover:bg-blue-50 transition">
                <td className="p-3 font-mono text-blue-600 font-bold">{String(p.id).padStart(3, "0")}</td>
                <td className="p-3 font-medium">{p.name}</td>
                <td className="p-3 text-gray-600">{p.age}yrs / {p.gender}</td>
                <td className="p-3 text-gray-600">{p.phone}</td>
                <td className="p-3"><span className="px-2 py-0.5 bg-red-50 text-red-700 rounded text-[10px] font-medium">{p.blood}</span></td>
                <td className="p-3">{p.department}</td>
                <td className="p-3 text-gray-500">{p.regTime}</td>
                <td className="p-3">
                  <button className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-[10px] font-medium"><Printer size={12} /> Slip</button>
                </td>
              </tr>
            ))}
            {patients.length === 0 && <tr><td colSpan="8" className="p-6 text-center text-gray-500 text-xs">No patients registered.</td></tr>}
          </tbody>
        </table>
      </div>

      {/* Registration Modal */}
      {showRegForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="text-base font-bold">Register New Patient</h2>
              <button onClick={() => setShowRegForm(false)} className="p-1 hover:bg-gray-100 rounded"><X size={18} className="text-gray-500" /></button>
            </div>
            <div className="p-4 space-y-3">
              <p className="text-[10px] text-blue-600 bg-blue-50 p-2 rounded-lg font-medium">{hospitalName}</p>
              <input type="text" placeholder="Full Name *" value={regForm.name} onChange={(e) => setRegForm({ ...regForm, name: e.target.value })} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <div className="grid grid-cols-2 gap-3">
                <input type="number" placeholder="Age" value={regForm.age} onChange={(e) => setRegForm({ ...regForm, age: e.target.value })} className="border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <select value={regForm.gender} onChange={(e) => setRegForm({ ...regForm, gender: e.target.value })} className="border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"><option value="">Gender</option><option>Male</option><option>Female</option><option>Other</option></select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <input type="text" placeholder="Phone" value={regForm.phone} onChange={(e) => setRegForm({ ...regForm, phone: e.target.value })} className="border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <select value={regForm.blood} onChange={(e) => setRegForm({ ...regForm, blood: e.target.value })} className="border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"><option value="">Blood Group</option><option>A+</option><option>A-</option><option>B+</option><option>B-</option><option>O+</option><option>O-</option><option>AB+</option><option>AB-</option></select>
              </div>
              <select value={regForm.department} onChange={(e) => setRegForm({ ...regForm, department: e.target.value })} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Select Department *</option>
                {[...new Set(doctors.map(d => d.department))].map((dept) => <option key={dept} value={dept}>{dept}</option>)}
              </select>
              <textarea placeholder="Address (optional)" value={regForm.address} onChange={(e) => setRegForm({ ...regForm, address: e.target.value })} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500" rows="2" />
            </div>
            <div className="p-4 border-t flex justify-end gap-2">
              <button onClick={() => setShowRegForm(false)} className="px-3 py-2 border border-gray-200 rounded-lg text-xs text-gray-600 hover:bg-gray-50">Cancel</button>
              <button onClick={handleRegisterPatient} className="px-3 py-2 bg-blue-600 text-white rounded-lg text-xs flex items-center gap-1.5 hover:bg-blue-700 transition"><UserPlus size={14} /> Register</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // ==========================================================================
  //  3. APPOINTMENTS
  // ==========================================================================
  const renderAppointments = () => (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2"><Calendar size={22} className="text-emerald-600" /> Appointments</h1>
        <button onClick={() => setShowApptForm(true)} className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-xs flex items-center gap-1.5 transition">
          <CalendarPlus size={14} /> Book Appointment
        </button>
      </div>

      {/* Search */}
      <div className="mb-4 relative max-w-md">
        <Search size={14} className="absolute left-3 top-2.5 text-gray-400" />
        <input type="text" placeholder="Search patient or doctor..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="border border-gray-200 rounded-lg pl-9 pr-3 py-2 w-full text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent" />
      </div>

      {/* Appointments List */}
      <div className="space-y-2">
        {appointments.filter(a => a.patientName.toLowerCase().includes(searchQuery.toLowerCase()) || a.doctor.toLowerCase().includes(searchQuery.toLowerCase())).map((a) => (
          <div key={a.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 hover:shadow-md transition">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1.5 rounded-lg border border-emerald-200">{a.token}</span>
                <div className="w-9 h-9 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 font-bold text-xs">
                  {a.patientName.split(" ").map(n => n[0]).join("").slice(0, 2)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{a.patientName}</p>
                  <p className="text-[10px] text-gray-500">{a.age}yrs · {a.gender} · {a.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-gray-600">{a.time}</span>
                {priorityBadge(a.priority)}
                {statusBadge(a.status)}
                <button onClick={() => setExpandedItem(expandedItem === a.id ? null : a.id)} className="p-1 hover:bg-gray-100 rounded-lg">
                  {expandedItem === a.id ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </button>
              </div>
            </div>
            {expandedItem === a.id && (
              <div className="mt-3 pt-3 border-t border-gray-100 text-xs">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-3">
                  <div className="p-2 bg-gray-50 rounded-lg"><p className="text-[10px] text-gray-500">Doctor</p><p className="font-medium">{a.doctor}</p></div>
                  <div className="p-2 bg-gray-50 rounded-lg"><p className="text-[10px] text-gray-500">Department</p><p className="font-medium">{a.department}</p></div>
                  <div className="p-2 bg-gray-50 rounded-lg"><p className="text-[10px] text-gray-500">Symptoms</p><p className="font-medium">{a.symptoms}</p></div>
                  <div className="p-2 bg-gray-50 rounded-lg"><p className="text-[10px] text-gray-500">Notes</p><p className="font-medium">{a.notes || "—"}</p></div>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {a.status === "waiting" && (
                    <>
                      <button onClick={() => setAppointments(appointments.map(ap => ap.id === a.id ? { ...ap, status: "in-consultation" } : ap))} className="bg-purple-600 text-white px-3 py-1.5 rounded-lg text-[10px] hover:bg-purple-700 transition">Start Consultation</button>
                      <button onClick={() => setAppointments(appointments.map(ap => ap.id === a.id ? { ...ap, status: "completed" } : ap))} className="bg-emerald-600 text-white px-3 py-1.5 rounded-lg text-[10px] hover:bg-emerald-700 transition">Mark Completed</button>
                      <button onClick={() => setAppointments(appointments.map(ap => ap.id === a.id ? { ...ap, status: "cancelled" } : ap))} className="bg-red-100 text-red-700 px-3 py-1.5 rounded-lg text-[10px] hover:bg-red-200 transition">Cancel</button>
                    </>
                  )}
                  {a.status === "in-consultation" && (
                    <button onClick={() => setAppointments(appointments.map(ap => ap.id === a.id ? { ...ap, status: "completed" } : ap))} className="bg-emerald-600 text-white px-3 py-1.5 rounded-lg text-[10px] hover:bg-emerald-700 transition"><CheckCircle size={12} className="inline mr-1" /> Mark Completed</button>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
        {appointments.length === 0 && <p className="text-center py-8 text-gray-500 text-xs">No appointments scheduled.</p>}
      </div>

      {/* Book Appointment Modal */}
      {showApptForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="text-base font-bold">Book OPD Appointment</h2>
              <button onClick={() => setShowApptForm(false)} className="p-1 hover:bg-gray-100 rounded"><X size={18} className="text-gray-500" /></button>
            </div>
            <div className="p-4 space-y-3">
              <p className="text-[10px] text-emerald-600 bg-emerald-50 p-2 rounded-lg font-medium">{hospitalName} · OPD Consultation</p>
              <input type="text" placeholder="Patient Name *" value={apptForm.patientName} onChange={(e) => setApptForm({ ...apptForm, patientName: e.target.value })} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500" />
              <div className="grid grid-cols-2 gap-3">
                <input type="number" placeholder="Age" value={apptForm.age} onChange={(e) => setApptForm({ ...apptForm, age: e.target.value })} className="border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                <select value={apptForm.gender} onChange={(e) => setApptForm({ ...apptForm, gender: e.target.value })} className="border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"><option value="">Gender</option><option>Male</option><option>Female</option></select>
              </div>
              <input type="text" placeholder="Phone" value={apptForm.phone} onChange={(e) => setApptForm({ ...apptForm, phone: e.target.value })} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500" />
              <input type="text" placeholder="Symptoms *" value={apptForm.symptoms} onChange={(e) => setApptForm({ ...apptForm, symptoms: e.target.value })} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500" />
              <select value={apptForm.doctorId} onChange={(e) => setApptForm({ ...apptForm, doctorId: e.target.value })} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500">
                <option value="">Select Doctor *</option>
                {doctors.map((d) => <option key={d.id} value={d.id}>{d.name} - {d.specialization} ({d.available ? "Available" : "Busy"})</option>)}
              </select>
              {apptForm.doctorId && (
                <div>
                  <p className="text-[10px] text-gray-500 mb-1">Time Slot:</p>
                  <input type="time" value={apptForm.time} onChange={(e) => setApptForm({ ...apptForm, time: e.target.value })} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                </div>
              )}
              <textarea placeholder="Notes (optional)" value={apptForm.notes} onChange={(e) => setApptForm({ ...apptForm, notes: e.target.value })} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500" rows="2" />
            </div>
            <div className="p-4 border-t flex justify-end gap-2">
              <button onClick={() => setShowApptForm(false)} className="px-3 py-2 border border-gray-200 rounded-lg text-xs text-gray-600 hover:bg-gray-50">Cancel</button>
              <button onClick={handleBookAppointment} className="px-3 py-2 bg-emerald-600 text-white rounded-lg text-xs flex items-center gap-1.5 hover:bg-emerald-700 transition"><CalendarPlus size={14} /> Book</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // ==========================================================================
  //  4. DOCTORS AVAILABILITY
  // ==========================================================================
  const renderDoctors = () => (
    <div>
      <h1 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2"><Stethoscope size={22} className="text-purple-600" /> Doctors Availability</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {doctors.map((d) => (
          <div key={d.id} className={`bg-white rounded-xl shadow-sm border p-4 hover:shadow-md transition ${d.available ? "border-emerald-200" : "border-red-200"}`}>
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold text-sm">
                {d.name.split(" ").slice(1).map(n => n[0]).join("")}
              </div>
              {docAvailBadge(d.available)}
            </div>
            <h3 className="font-semibold text-sm text-gray-900">{d.name}</h3>
            <p className="text-[10px] text-gray-500 mb-3">{d.specialization} · {d.department}</p>
            <div className="space-y-1.5 text-[10px]">
              <div className="flex items-center gap-2 text-gray-600">
                <ClockIcon size={12} /><span>{d.timings}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin size={12} /><span>Room {d.room}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // ==========================================================================
  //  5. REFERRALS
  // ==========================================================================
  const renderReferrals = () => (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2"><Send size={22} className="text-orange-600" /> Referrals</h1>
        <button onClick={() => setShowReferralForm(true)} className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-xs flex items-center gap-1.5 transition">
          <Plus size={14} /> Create Referral
        </button>
      </div>

      {/* Search */}
      <div className="mb-4 relative max-w-md">
        <Search size={14} className="absolute left-3 top-2.5 text-gray-400" />
        <input type="text" placeholder="Search referral by patient or hospital..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="border border-gray-200 rounded-lg pl-9 pr-3 py-2 w-full text-xs focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent" />
      </div>

      <div className="space-y-2">
        {referrals.filter(r => r.patientName.toLowerCase().includes(searchQuery.toLowerCase()) || r.destination.toLowerCase().includes(searchQuery.toLowerCase())).map((r) => (
          <div key={r.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 hover:shadow-md transition">
            <div className="flex items-start justify-between">
              <div className="flex gap-3">
                <div className="w-9 h-9 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-bold text-xs">
                  {r.patientName.split(" ").map(n => n[0]).join("").slice(0, 2)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold">{r.patientName}</p>
                    <span className="text-[10px] text-gray-400 font-mono">{r.id}</span>
                  </div>
                  <p className="text-[10px] text-gray-600"><span className="font-medium">From:</span> {r.createdBy} ({r.dept})</p>
                  <p className="text-[10px] text-gray-600"><span className="font-medium">To:</span> {r.destination} | {r.specialty}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="text-right space-y-1">
                  {priorityBadge(r.priority)}
                  <div>{statusBadge(r.status)}</div>
                </div>
                <button onClick={() => setExpandedItem(expandedItem === r.id ? null : r.id)} className="p-1 hover:bg-gray-100 rounded">
                  {expandedItem === r.id ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </button>
              </div>
            </div>
            {expandedItem === r.id && (
              <div className="mt-3 pt-3 border-t border-gray-100 space-y-2 text-xs">
                <div className="bg-gray-50 p-2.5 rounded-lg"><p className="text-[10px] text-gray-500 mb-0.5">Reason</p><p>{r.reason}</p></div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="p-2 bg-gray-50 rounded-lg"><p className="text-[10px] text-gray-500">Bed</p><p className="font-medium">{r.bed}</p></div>
                  <div className="p-2 bg-gray-50 rounded-lg"><p className="text-[10px] text-gray-500">Ambulance</p><p className="font-medium">{r.ambulance ? "Required" : "Not needed"}</p></div>
                  <div className="p-2 bg-gray-50 rounded-lg"><p className="text-[10px] text-gray-500">Required Doctor</p><p className="font-medium">{r.requiredDoctor}</p></div>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {r.status === "pending" && (
                    <button onClick={() => handleSendReferral(r.id)} className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg text-[10px] flex items-center gap-1 transition">
                      <Send size={12} /> Send Referral
                    </button>
                  )}
                  {r.status === "sent" && <span className="text-blue-600 text-[10px] font-medium flex items-center gap-1"><CheckCircle size={12} /> Referral sent to hospital</span>}
                  {r.status === "accepted" && <span className="text-emerald-600 text-[10px] font-medium flex items-center gap-1"><CheckCircle size={12} /> Accepted by hospital</span>}
                  {r.status === "rejected" && <span className="text-red-600 text-[10px] font-medium flex items-center gap-1"><XCircle size={12} /> Rejected</span>}
                </div>
              </div>
            )}
          </div>
        ))}
        {referrals.length === 0 && <p className="text-center py-8 text-gray-500 text-xs">No referrals.</p>}
      </div>

      {/* Create Referral Modal */}
      {showReferralForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="text-base font-bold">Create Referral</h2>
              <button onClick={() => setShowReferralForm(false)} className="p-1 hover:bg-gray-100 rounded"><X size={18} className="text-gray-500" /></button>
            </div>
            <div className="p-4 space-y-3">
              <input type="text" placeholder="Patient Name *" value={refForm.patientName} onChange={(e) => setRefForm({ ...refForm, patientName: e.target.value })} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-orange-500" />
              <div className="grid grid-cols-2 gap-3">
                <input type="number" placeholder="Age" value={refForm.age} onChange={(e) => setRefForm({ ...refForm, age: e.target.value })} className="border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-orange-500" />
                <select value={refForm.gender} onChange={(e) => setRefForm({ ...refForm, gender: e.target.value })} className="border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-orange-500"><option value="">Gender</option><option>Male</option><option>Female</option></select>
              </div>
              <input type="text" placeholder="Destination Hospital *" value={refForm.destination} onChange={(e) => setRefForm({ ...refForm, destination: e.target.value })} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-orange-500" />
              <input type="text" placeholder="Required Specialty *" value={refForm.specialty} onChange={(e) => setRefForm({ ...refForm, specialty: e.target.value })} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-orange-500" />
              <select value={refForm.bed} onChange={(e) => setRefForm({ ...refForm, bed: e.target.value })} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-orange-500">
                <option value="">Bed Requirement</option>
                <option>General Ward</option>
                <option>ICU Bed</option>
                <option>Private Room</option>
              </select>
              <textarea placeholder="Reason for Referral *" value={refForm.reason} onChange={(e) => setRefForm({ ...refForm, reason: e.target.value })} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-orange-500" rows="2" />
              <label className="flex items-center gap-2 text-xs text-gray-600">
                <input type="checkbox" checked={refForm.ambulance} onChange={(e) => setRefForm({ ...refForm, ambulance: e.target.checked })} className="rounded border-gray-300" />
                Ambulance Required
              </label>
            </div>
            <div className="p-4 border-t flex justify-end gap-2">
              <button onClick={() => setShowReferralForm(false)} className="px-3 py-2 border border-gray-200 rounded-lg text-xs text-gray-600 hover:bg-gray-50">Cancel</button>
              <button onClick={handleCreateReferral} className="px-3 py-2 bg-orange-500 text-white rounded-lg text-xs flex items-center gap-1.5 hover:bg-orange-600 transition"><Send size={14} /> Create Referral</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // ==========================================================================
  //  6. ANNOUNCEMENTS
  // ==========================================================================
  const renderAnnouncements = () => (
    <div>
      <h1 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2"><Megaphone size={22} className="text-purple-600" /> Announcements</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {announcements.map((a) => (
          <div key={a.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition">
            <div className="flex items-start gap-3">
              <div className={`p-2.5 rounded-lg flex-shrink-0 ${announcementTypeIcon(a.type)}`}>{a.icon}</div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold text-sm text-gray-900">{a.title}</h3>
                  <span className="text-[10px] text-gray-400 bg-gray-100 px-2 py-0.5 rounded">{a.date}</span>
                </div>
                <p className="text-xs text-gray-600">{a.desc}</p>
                <div className="mt-2">
                  <span className={`text-[10px] px-2 py-0.5 rounded font-medium ${a.type === "event" ? "bg-purple-100 text-purple-700" : a.type === "notice" ? "bg-blue-100 text-blue-700" : a.type === "leave" ? "bg-orange-100 text-orange-700" : "bg-gray-100 text-gray-700"}`}>
                    {a.type.charAt(0).toUpperCase() + a.type.slice(1)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // ==========================================================================
  //  7. EMERGENCY CONTACTS
  // ==========================================================================
  const renderEmergency = () => (
    <div>
      <h1 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2"><Phone size={22} className="text-red-600" /> Emergency Contacts</h1>
      <p className="text-xs text-gray-500 mb-4">Quick access to emergency services. Click to call on mobile devices.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {emergencyContacts.map((c, i) => (
          <a key={i} href={`tel:${c.number}`} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition group cursor-pointer">
            <div className="flex items-center gap-4">
              <div className={`${c.color} p-3 rounded-xl text-white group-hover:scale-110 transition`}>
                {c.icon}
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">{c.name}</p>
                <p className="text-lg font-bold text-gray-900 mt-0.5">{c.number}</p>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );

  // ==========================================================================
  //  8. SETTINGS
  // ==========================================================================
  const renderSettings = () => (
    <div>
      <h1 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2"><Settings size={22} className="text-gray-600" /> Settings</h1>
      <div className="max-w-lg space-y-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <h2 className="font-semibold text-sm text-gray-900 mb-3">Preferences</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-700">Language</p>
                <p className="text-[10px] text-gray-500">Choose your preferred language</p>
              </div>
              <select value={settings.language} onChange={(e) => setSettings({ ...settings, language: e.target.value })} className="border border-gray-200 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>English</option>
                <option>తెలుగు (Telugu)</option>
                <option>हिन्दी (Hindi)</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-700">Theme</p>
                <p className="text-[10px] text-gray-500">Toggle dark mode</p>
              </div>
              <button onClick={() => setSettings({ ...settings, darkMode: !settings.darkMode })} className={`relative w-12 h-6 rounded-full transition ${settings.darkMode ? "bg-blue-600" : "bg-gray-300"}`}>
                <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition flex items-center justify-center ${settings.darkMode ? "left-6.5" : "left-0.5"}`}>
                  {settings.darkMode ? <Moon size={10} className="text-blue-600" /> : <Sun size={10} className="text-yellow-500" />}
                </span>
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-700">Notifications</p>
                <p className="text-[10px] text-gray-500">Receive notification alerts</p>
              </div>
              <button onClick={() => setSettings({ ...settings, notifications: !settings.notifications })} className={`relative w-12 h-6 rounded-full transition ${settings.notifications ? "bg-blue-600" : "bg-gray-300"}`}>
                <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition ${settings.notifications ? "left-6.5" : "left-0.5"}`}></span>
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <h2 className="font-semibold text-sm text-gray-900 mb-3">Account</h2>
          <div className="space-y-3">
            <button className="w-full text-left px-3 py-2.5 bg-gray-50 rounded-lg text-sm text-gray-700 hover:bg-gray-100 transition flex items-center justify-between">
              <span>Change Password</span>
              <ArrowRight size={14} className="text-gray-400" />
            </button>
            <button className="w-full text-left px-3 py-2.5 bg-red-50 rounded-lg text-sm text-red-700 hover:bg-red-100 transition flex items-center justify-between">
              <span>Logout</span>
              <LogOut size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // ==========================================================================
  // MAIN RENDER
  // ==========================================================================
  return (
    <div className="bg-gray-100 min-h-screen">
      {renderSidebar()}

      <div className={`transition-all duration-300 ${collapsed ? "ml-16" : "ml-64"}`}>
        {/* Top Bar */}
        <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button onClick={() => setShowMobileMenu(!showMobileMenu)} className="lg:hidden p-1.5 hover:bg-gray-100 rounded-lg">
              <List size={18} />
            </button>
            <Building2 size={16} className="text-blue-600" />
            <p className="text-sm font-semibold text-gray-900">{hospitalName}</p>
            <span className="text-[10px] text-gray-500">· Reception Desk</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-[10px] text-gray-500">
              <RefreshCw size={12} />
              <span>{new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}</span>
            </div>
            <div className="flex items-center gap-1 text-[10px] text-gray-500">
              <Calendar size={12} />
              <span>{new Date().toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}</span>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-2">
            <div className="grid grid-cols-4 gap-2">
              {menuItems.map((item) => (
                <button key={item.key} onClick={() => { setActiveTab(item.key); setShowMobileMenu(false); }}
                  className={`p-2 rounded-lg text-[10px] font-medium text-center transition ${activeTab === item.key ? "bg-emerald-600 text-white" : "bg-gray-50 text-gray-600 hover:bg-gray-100"}`}>
                  <div className="flex justify-center mb-1">{item.icon}</div>
                  <span className="block truncate">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Page Content */}
        <div className="p-6">
          {activeTab === "dashboard" && renderDashboard()}
          {activeTab === "registration" && renderRegistration()}
          {activeTab === "appointments" && renderAppointments()}
          {activeTab === "doctors" && renderDoctors()}
          {activeTab === "referrals" && renderReferrals()}
          {activeTab === "announcements" && renderAnnouncements()}
          {activeTab === "emergency" && renderEmergency()}
          {activeTab === "settings" && renderSettings()}
          {activeTab === "login" && (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <p className="text-lg font-semibold text-gray-900">Logged out successfully</p>
                <p className="text-xs text-gray-500 mt-1">Redirecting to login page...</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ReceptionistDashboard;