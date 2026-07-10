import { Link, useLocation } from "react-router-dom";

function Sidebar() {

    const location = useLocation();
    const currPath = location.pathname;

    // Read the logged-in user's role from localStorage (persists across all pages)
    const userRole = localStorage.getItem("userRole") || "doctor";
    const isPatientRoute = userRole === "patient";

    const doctorMenuItems = [
        {
            name: "Dashboard",
            path: "/doctor-dashboard",
        },
        {
            name: "Referrals",
            path: "/referral",
        },
        {
            name: "Hospitals",
            path: "/hospitals",
        },
        {
            name: "Ambulances",
            path: "/ambulances",
        },
        {
            name: "Medicines",
            path: "/medicine",
        },
        {
            name: "Analytics",
            path: "/analytics",
        },
    ];

    const patientMenuItems = [
        {
            name: "Dashboard",
            path: "/patient-dashboard",
        },
        {
            name: "Book Appointment",
            path: "/patient-dashboard",
        },
        {
            name: "Hospitals",
            path: "/hospitals",
        },
        {
            name: "Ambulances",
            path: "/ambulances",
        },
        {
            name: "Medicines",
            path: "/medicine",
        },
    ];

    const menuItems = isPatientRoute ? patientMenuItems : doctorMenuItems;

    return (

        <div className="fixed left-0 top-0 h-screen w-64 bg-slate-900 text-white p-6">
            <div className="mb-10 text-center">

               <h1 className="text-3xl font-bold text-white">
                            🏥 Aarogya
                            </h1>

                   <h2 className="text-2xl font-semibold text-green-400">
                                  Nirmaan
                    </h2>

                   </div>
            <div className="space-y-3">

                {

                    menuItems.map((item) => (

                        <Link

                            key={item.name}

                            to={item.path}

                            className={`block rounded-lg p-3 transition duration-200 ${currPath === item.path
                                    ? "bg-slate-800"
                                    : "hover:bg-slate-700"
                                }`}

                        >

                            {item.name}

                        </Link>

                    ))

                }

            </div>

        </div>

    );

}

export default Sidebar;
