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
    recommendedHospital: registration.recommendedHospital || null,
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
// Only the three doctors below are available for patient registration and doctor login
export const DOCTOR_LOGIN_ACCOUNTS = [
  { id: 1, name: "Dr. Rajesh Kumar", specialty: "Cardiologist", hospital: "Government CHC Chevella", status: "Available", phone: "+91 98765 43210", mobile: "9876543210", otp: "123456" },
  { id: 2, name: "Dr. Anita Sharma", specialty: "Pediatrician", hospital: "Government PHC Shabad", status: "Available", phone: "+91 87654 32109", mobile: "9876543211", otp: "234567" },
  { id: 3, name: "Dr. Vikram Reddy", specialty: "Orthopedic Surgeon", hospital: "Govt Area Hospital, Kondapur", status: "Available", phone: "+91 76543 21098", mobile: "9876543212", otp: "345678" },
];

export const MASTER_DOCTORS = DOCTOR_LOGIN_ACCOUNTS;

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
    { patientName: "Lakshmi Devi", doctorName: "Dr. Anita Sharma", hospitalName: "Government PHC Shabad", date: "2026-07-11", time: "14:00", reason: "General checkup" },
  ];
  
  demoPatients.forEach(p => {
    addPatientRegistration(p);
  });
}
