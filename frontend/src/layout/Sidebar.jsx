 import { Link, useLocation } from "react-router-dom";

function Sidebar() {

    const location = useLocation();

    const menuItems = [

        {
            name: "Dashboard",
            path: "/dashboard",
        },

        {
            name: "Referrals",
            path: "/dashboard",
        },

        {
            name: "Hospitals",
            path: "/dashboard",
        },

        {
            name: "Ambulances",
            path: "/dashboard",
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

    return (

        <div className="fixed left-0 top-0 h-screen w-64 bg-slate-900 text-white p-6">
            <div className="p-3">
                Smart Referral
            </div>

            <h1 className="text-2xl font-bold mb-10">

                🚑 Referral Platform

            </h1>

            <div className="space-y-3">

                {

                    menuItems.map((item) => (

                        <Link

                            key={item.name}

                            to={item.path}

                            className={`block rounded-lg p-3 transition duration-200 ${location.pathname === item.path
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