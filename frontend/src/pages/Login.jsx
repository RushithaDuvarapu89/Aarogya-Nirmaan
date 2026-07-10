import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
    Smartphone,
    ShieldCheck,
    ArrowLeft
} from "lucide-react";

function Login() {

    const navigate = useNavigate();
    const location = useLocation();

    const role = location.state?.role || "patient";

    const [mobile, setMobile] = useState("");
    const [otp, setOtp] = useState("");
    const [otpSent, setOtpSent] = useState(false);

    function sendOTP() {

        if (mobile.length !== 10) {
            alert("Enter a valid Mobile Number");
            return;
        }

        alert("OTP Sent Successfully!\n(Demo OTP : 123456)");

        setOtpSent(true);
    }

    function verifyOTP() {

        if (otp !== "123456") {

            alert("Invalid OTP");
            return;
        }

        alert("Login Successful");

        // Save the logged-in role to localStorage so Sidebar can read it
        localStorage.setItem("userRole", role);

        if (role === "patient") {

            navigate("/patient-dashboard");

        }

        else if (role === "doctor") {

            navigate("/doctor-dashboard");

        }

        else {

            navigate("/receptionist-dashboard");

        }

    }

    return (

        <div className="min-h-screen bg-blue-50 flex justify-center items-center">

            <div className="bg-white rounded-2xl shadow-xl w-[450px] p-8">

                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 mb-6 text-blue-600"
                >
                    <ArrowLeft size={20}/>
                    Back
                </button>

                <h1 className="text-3xl font-bold text-center mb-2">

                    {role.charAt(0).toUpperCase() + role.slice(1)} Login

                </h1>

                <p className="text-center text-gray-500 mb-8">

                    Login using Mobile Number & OTP

                </p>

                <div className="space-y-5">

                    <div>

                        <label className="font-medium">

                            Mobile Number

                        </label>

                        <div className="flex items-center border rounded-lg mt-2 p-3">

                            <Smartphone className="text-blue-600"/>

                            <input

                                type="text"

                                maxLength={10}

                                value={mobile}

                                onChange={(e)=>setMobile(e.target.value)}

                                className="ml-3 w-full outline-none"

                                placeholder="9876543210"

                            />

                        </div>

                    </div>

                    {

                        otpSent && (

                            <div>

                                <label className="font-medium">

                                    Enter OTP

                                </label>

                                <div className="flex items-center border rounded-lg mt-2 p-3">

                                    <ShieldCheck className="text-green-600"/>

                                    <input

                                        type="text"

                                        value={otp}

                                        onChange={(e)=>setOtp(e.target.value)}

                                        className="ml-3 w-full outline-none"

                                        placeholder="123456"

                                    />

                                </div>

                            </div>

                        )

                    }

                    {

                        !otpSent ?

                        (

                            <button

                                onClick={sendOTP}

                                className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg"

                            >

                                Send OTP

                            </button>

                        )

                        :

                        (

                            <button

                                onClick={verifyOTP}

                                className="w-full bg-green-600 hover:bg-green-700 text-white p-3 rounded-lg"

                            >

                                Verify OTP

                            </button>

                        )

                    }

                </div>

            </div>

        </div>

    );

}

export default Login;