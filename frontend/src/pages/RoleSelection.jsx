import { useNavigate } from "react-router-dom";
import {
    User,
    Stethoscope,
    ClipboardList,
    ArrowLeft
} from "lucide-react";

function RoleSelection() {

    const navigate = useNavigate();

    const roles = [
        {
            title: "Patient",
            icon: <User size={50} className="text-blue-600" />,
            color: "border-blue-500",
            path: "/patient-login"
        },
        {
            title: "Doctor",
            icon: <Stethoscope size={50} className="text-green-600" />,
            color: "border-green-500",
            path: "/doctor-login"
        },
        {
            title: "Receptionist",
            icon: <ClipboardList size={50} className="text-orange-500" />,
            color: "border-orange-500",
            path: "/receptionist-login"
        }
    ];

    return (

        <div className="min-h-screen bg-gradient-to-r from-blue-50 to-green-50">

            {/* Header */}

            <div className="p-6">

                <button

                    onClick={() => navigate("/")}

                    className="flex items-center gap-2 text-blue-700 hover:text-blue-900"

                >

                    <ArrowLeft size={20} />

                    Back to Home

                </button>

            </div>

            <div className="flex flex-col items-center justify-center">

                <h1 className="text-5xl font-bold text-blue-700">

                    Aarogya Nirmaan

                </h1>

                <p className="text-gray-600 mt-4 text-lg">

                    Select your role to continue

                </p>

                <div className="grid md:grid-cols-3 gap-10 mt-16">

                    {

                        roles.map((role) => (

                            <div

                                key={role.title}

                                onClick={() => navigate(role.path)}

                                className={`
                                    cursor-pointer
                                    bg-white
                                    rounded-3xl
                                    shadow-lg
                                    p-10
                                    w-72
                                    border-4
                                    ${role.color}
                                    hover:scale-105
                                    transition-all
                                `}

                            >

                                <div className="flex justify-center">

                                    {role.icon}

                                </div>

                                <h2 className="text-3xl font-bold text-center mt-6">

                                    {role.title}

                                </h2>

                                <p className="text-center text-gray-500 mt-3">

                                    Continue as {role.title}

                                </p>

                            </div>

                        ))

                    }

                </div>

            </div>

        </div>

    );

}

export default RoleSelection;