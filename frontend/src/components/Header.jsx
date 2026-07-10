import { useLocation } from "react-router-dom";

function Header() {
    const location = useLocation();
    
    // Read role from localStorage to keep consistency across all pages
    const userRole = localStorage.getItem("userRole") || "";
    const isPatientRoute = location.pathname === "/patient-dashboard" || userRole === "patient";
    const isDoctorRoute = location.pathname === "/doctor-dashboard" || userRole === "doctor";
    const isReceptionRoute = location.pathname === "/receptionist-dashboard" || userRole === "receptionist";

    let title = "Hospital Referral";
    let subtitle = "";

    if (isPatientRoute) {
        title = "Patient Dashboard";
        subtitle = "View doctors, beds, medicines & book appointments";
    } else if (isDoctorRoute) {
        title = "Doctor Dashboard";
        subtitle = "Manage patients, appointments & referrals";
    } else if (isReceptionRoute) {
        title = "Receptionist Dashboard";
        subtitle = "Manage patient registrations & queue";
    }

    return (
        <div className="bg-white shadow-sm border-b px-8 py-6 flex justify-between items-center">
            <div>
                <h1 className="text-4xl font-bold text-gray-900">
                    {title}
                </h1>
                {subtitle && (
                    <p className="text-gray-500 text-sm mt-1">{subtitle}</p>
                )}
            </div>
        </div>
    );
}

export default Header;
