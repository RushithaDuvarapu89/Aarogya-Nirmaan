// =========================================
// SHARED DATA LAYER - Connects Patient, Receptionist & Doctor Dashboards
// Uses localStorage as the shared data store
// =========================================

const STORAGE_KEYS = {
  PATIENT_REGISTRATIONS: "shared_patient_registrations",
  RECEPTIONIST_APPROVALS: "shared_receptionist_approvals",
  DOCTOR_APPOINTMENTS: "shared_doctor_appointments",
  TOKEN_COUNTER: "shared_token_counter",
};

// ─── TOKEN GENERATION ─────────────────────────────────
// Generates a token number based on doctor + hospital + date + time
// If more than 5 patients have the same combo, assigns sequential tokens
function generateToken(doctorName, hospitalName, date, time) {
  const key = `${doctorName}|${hospitalName}|${date}|${time}`;
  const counter = JSON.parse(localStorage.getItem(STORAGE_KEYS.TOKEN_COUNTER) || "{}");
  
  if (!counter[key]) {
    counter[key] = 0;
  }
  counter[key] += 1;
  localStorage.setItem(STORAGE_KEYS.TOKEN_COUNTER, JSON.stringify(counter));
  
  return {
    tokenNumber: counter[key],
    totalForSlot: counter[key],
    tokenDisplay: `T${String(counter[key]).padStart(3, "0")}`,
    isOverflow: counter[key] > 5, // More than 5 patients = overflow slot
  };
}

// ─── PATIENT REGISTRATIONS ────────────────────────────
// When a patient books an appointment, it goes here
// Receptionist reads from here

export function addPatientRegistration(registration) {
  const registrations = JSON.parse(localStorage.getItem(STORAGE_KEYS.PATIENT_REGISTRATIONS) || "[]");
  
  const token = generateToken(
    registration.doctorName,
    registration.hospitalName,
    registration.date,
    registration.time
  );
  
  const newReg = {
    id: Date.now(),
    ...registration,
    token: token.tokenDisplay,
    tokenNumber: token.tokenNumber,
    totalForSlot: token.totalForSlot,
    isOverflow: token.isOverflow,
    status: "pending", // pending → approved → in-consultation → completed
    registeredAt: new Date().toISOString(),
    approvedAt: null,
  };
  
  registrations.push(newReg);
  localStorage.setItem(STORAGE_KEYS.PATIENT_REGISTRATIONS, JSON.stringify(registrations));
  
  // Also add to doctor appointments (so doctor can see pending)
  addDoctorAppointment(newReg);
  
  return newReg;
}

export function getPatientRegistrations() {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.PATIENT_REGISTRATIONS) || "[]");
}

export function getPendingRegistrations() {
  return getPatientRegistrations().filter(r => r.status === "pending");
}

// ─── RECEPTIONIST ACTIONS ─────────────────────────────
// Receptionist approves/rejects registrations

export function approveRegistration(id) {
  const registrations = getPatientRegistrations();
  const updated = registrations.map(r => {
    if (r.id === id) {
      return { 
        ...r, 
        status: "approved", 
        approvedAt: new Date().toISOString() 
      };
    }
    return r;
  });
  localStorage.setItem(STORAGE_KEYS.PATIENT_REGISTRATIONS, JSON.stringify(updated));
  
  // Update doctor appointments
  updateDoctorAppointmentStatus(id, "approved");
  return updated;
}

export function rejectRegistration(id) {
  const registrations = getPatientRegistrations();
  const updated = registrations.map(r => {
    if (r.id === id) {
      return { 
        ...r, 
        status: "rejected", 
        approvedAt: new Date().toISOString() 
      };
    }
    return r;
  });
  localStorage.setItem(STORAGE_KEYS.PATIENT_REGISTRATIONS, JSON.stringify(updated));
  
  // Update doctor appointments
  updateDoctorAppointmentStatus(id, "rejected");
  return updated;
}

export function markInConsultation(id) {
  const registrations = getPatientRegistrations();
  const updated = registrations.map(r => {
    if (r.id === id) {
      return { ...r, status: "in-consultation" };
    }
    return r;
  });
  localStorage.setItem(STORAGE_KEYS.PATIENT_REGISTRATIONS, JSON.stringify(updated));
  updateDoctorAppointmentStatus(id, "in-consultation");
  return updated;
}

export function markCompleted(id) {
  const registrations = getPatientRegistrations();
  const updated = registrations.map(r => {
    if (r.id === id) {
      return { ...r, status: "completed" };
    }
    return r;
  });
  localStorage.setItem(STORAGE_KEYS.PATIENT_REGISTRATIONS, JSON.stringify(updated));
  updateDoctorAppointmentStatus(id, "completed");
  return updated;
}

// ─── DOCTOR APPOINTMENTS ──────────────────────────────
// Doctor sees approved appointments here

function addDoctorAppointment(registration) {
  const appointments = JSON.parse(localStorage.getItem(STORAGE_KEYS.DOCTOR_APPOINTMENTS) || "[]");
  appointments.push({
    id: registration.id,
    patientName: registration.patientName,
    doctorName: registration.doctorName,
    hospitalName: registration.hospitalName,
    date: registration.date,
    time: registration.time,
    reason: registration.reason || "",
    token: registration.token,
    tokenNumber: registration.tokenNumber,
    totalForSlot: registration.totalForSlot,
    isOverflow: registration.isOverflow,
    status: "pending",
    registeredAt: registration.registeredAt,
  });
  localStorage.setItem(STORAGE_KEYS.DOCTOR_APPOINTMENTS, JSON.stringify(appointments));
}

function updateDoctorAppointmentStatus(id, status) {
  const appointments = JSON.parse(localStorage.getItem(STORAGE_KEYS.DOCTOR_APPOINTMENTS) || "[]");
  const updated = appointments.map(a => {
    if (a.id === id) {
      return { ...a, status };
    }
    return a;
  });
  localStorage.setItem(STORAGE_KEYS.DOCTOR_APPOINTMENTS, JSON.stringify(updated));
}

export function getDoctorAppointments(doctorName) {
  const appointments = JSON.parse(localStorage.getItem(STORAGE_KEYS.DOCTOR_APPOINTMENTS) || "[]");
  if (doctorName) {
    return appointments.filter(a => a.doctorName === doctorName);
  }
  return appointments;
}

export function getApprovedAppointments(doctorName) {
  const appointments = getDoctorAppointments(doctorName);
  return appointments.filter(a => a.status === "approved" || a.status === "in-consultation");
}

// ─── STATS ────────────────────────────────────────────
export function getDashboardStats() {
  const registrations = getPatientRegistrations();
  return {
    total: registrations.length,
    pending: registrations.filter(r => r.status === "pending").length,
    approved: registrations.filter(r => r.status === "approved").length,
    inConsultation: registrations.filter(r => r.status === "in-consultation").length,
    completed: registrations.filter(r => r.status === "completed").length,
    rejected: registrations.filter(r => r.status === "rejected").length,
    overflowPatients: registrations.filter(r => r.isOverflow).length,
  };
}

// ─── MASTER DOCTORS LIST ─────────────────────────────
// Single source of truth - used by Patient, Receptionist & Doctor Dashboards
// First 15 are Available (shown in Patient Dashboard), last 5 are Unavailable (shown in Receptionist & Doctor Dashboards)
export const MASTER_DOCTORS = [
  // ── 15 Available Doctors (shown in Patient Dashboard) ──
  { name: "Dr. Rajesh Kumar", specialty: "Cardiologist", hospital: "Government CHC Chevella", status: "Available", phone: "+91 98765 43210" },
  { name: "Dr. Anita Sharma", specialty: "Pediatrician", hospital: "Government PHC Shabad", status: "Available", phone: "+91 87654 32109" },
  { name: "Dr. Vikram Reddy", specialty: "Orthopedic Surgeon", hospital: "Govt Area Hospital, Kondapur", status: "Available", phone: "+91 76543 21098" },
  { name: "Dr. Priya Patel", specialty: "General Physician", hospital: "Government CHC Chevella", status: "Available", phone: "+91 65432 10987" },
  { name: "Dr. Sanjay Dutt", specialty: "Neurologist", hospital: "Government PHC Shabad", status: "Available", phone: "+91 54321 09876" },
  { name: "Dr. Meera Sen", specialty: "Gynecologist", hospital: "Govt Area Hospital, Kondapur", status: "Available", phone: "+91 43210 98765" },
  { name: "Dr. Amit Verma", specialty: "Dermatologist", hospital: "Government CHC Chevella", status: "Available", phone: "+91 32109 87654" },
  { name: "Dr. Shalini Gupta", specialty: "Ophthalmologist", hospital: "Government PHC Shabad", status: "Available", phone: "+91 21098 76543" },
  { name: "Dr. Rohan Das", specialty: "ENT Specialist", hospital: "Govt Area Hospital, Kondapur", status: "Available", phone: "+91 10987 65432" },
  { name: "Dr. Sunita Rao", specialty: "Oncologist", hospital: "Government CHC Chevella", status: "Available", phone: "+91 99887 76655" },
  { name: "Dr. Alok Mishra", specialty: "Psychiatrist", hospital: "Government PHC Shabad", status: "Available", phone: "+91 88776 65544" },
  { name: "Dr. Neha Kapoor", specialty: "Endocrinologist", hospital: "Govt Area Hospital, Kondapur", status: "Available", phone: "+91 77665 54433" },
  { name: "Dr. Sandeep Singh", specialty: "Urologist", hospital: "Government CHC Chevella", status: "Available", phone: "+91 66554 43322" },
  { name: "Dr. Divya Teja", specialty: "Nephrologist", hospital: "Government PHC Shabad", status: "Available", phone: "+91 55443 32211" },
  { name: "Dr. Manoj Bajpayee", specialty: "Gastroenterologist", hospital: "Govt Area Hospital, Kondapur", status: "Available", phone: "+91 44332 21100" },
  // ── 5 Unavailable Doctors (shown only in Receptionist & Doctor Dashboards) ──
  { name: "Dr. Kiran Bedi", specialty: "Pulmonologist", hospital: "Government CHC Chevella", status: "In Surgery", phone: "+91 33221 10099" },
  { name: "Dr. Harish Rao", specialty: "Rheumatologist", hospital: "Government PHC Shabad", status: "In Consultation", phone: "+91 22110 09988" },
  { name: "Dr. Preeti Shenoy", specialty: "Dentist", hospital: "Govt Area Hospital, Kondapur", status: "Offline", phone: "+91 11009 98877" },
  { name: "Dr. Arjun Reddy", specialty: "Cardiologist", hospital: "Gandhi Government Hospital, Hyderabad", status: "In Surgery", phone: "+91 98765 43210" },
  { name: "Dr. Priya Sharma", specialty: "Cardiologist", hospital: "Government General Hospital, Hyderabad", status: "Offline", phone: "+91 98765 43211" },
];

// ─── SEED DEMO DATA ───────────────────────────────────
export function seedSharedDemoData() {
  const existing = localStorage.getItem(STORAGE_KEYS.PATIENT_REGISTRATIONS);
  if (existing && JSON.parse(existing).length > 0) return; // Already seeded
  
  const demoPatients = [
    { patientName: "Ravi Kumar", doctorName: "Dr. Rajesh Kumar", hospitalName: "Government CHC Chevella", date: "2026-07-11", time: "09:00", reason: "Chest pain follow-up" },
    { patientName: "Priya Sharma", doctorName: "Dr. Anita Sharma", hospitalName: "Government PHC Shabad", date: "2026-07-11", time: "10:00", reason: "Child vaccination" },
    { patientName: "Amit Singh", doctorName: "Dr. Rajesh Kumar", hospitalName: "Government CHC Chevella", date: "2026-07-11", time: "09:00", reason: "BP checkup" },
    { patientName: "Sneha Patel", doctorName: "Dr. Rajesh Kumar", hospitalName: "Government CHC Chevella", date: "2026-07-11", time: "09:00", reason: "Heart checkup" },
    { patientName: "Vikram Joshi", doctorName: "Dr. Rajesh Kumar", hospitalName: "Government CHC Chevella", date: "2026-07-11", time: "09:00", reason: "Post-surgery follow-up" },
    { patientName: "Anita Desai", doctorName: "Dr. Rajesh Kumar", hospitalName: "Government CHC Chevella", date: "2026-07-11", time: "09:00", reason: "Chest discomfort" },
    { patientName: "Manoj Gupta", doctorName: "Dr. Vikram Reddy", hospitalName: "Govt Area Hospital, Kondapur", date: "2026-07-11", time: "11:00", reason: "Orthopedic consultation" },
    { patientName: "Lakshmi Devi", doctorName: "Dr. Priya Patel", hospitalName: "Government CHC Chevella", date: "2026-07-11", time: "14:00", reason: "General checkup" },
  ];
  
  demoPatients.forEach(p => {
    addPatientRegistration(p);
  });
}
