import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Smartphone,
    ShieldCheck,
    ArrowLeft
} from "lucide-react";

function PatientLogin() {

    const navigate = useNavigate();

    const [mobile, setMobile] = useState("");
    const [otp, setOtp] = useState("");
    const [showOTP, setShowOTP] = useState(false);

    function sendOTP(e) {

        e.preventDefault();

        if (mobile.length !== 10) {

            alert("Please enter a valid 10-digit mobile number.");
            return;

        }

        // Temporary OTP (Later we'll connect Firebase/Twilio)

        alert("OTP Sent Successfully!");

        setShowOTP(true);

    }

    function verifyOTP(e) {

        e.preventDefault();

        if (otp.length !== 6) {

            alert("Enter a valid 6-digit OTP.");
            return;

        }

        alert("Login Successful!");

        // Redirect to Patient Dashboard

        navigate("/dashboard");

    }

    return (

        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-green-100 flex justify-center items-center">

            <div className="bg-white w-[450px] rounded-3xl shadow-2xl p-10">

                {/* Back Button */}

                <button

                    onClick={() => navigate("/roles")}

                    className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6"

                >

                    <ArrowLeft size={20} />

                    Back

                </button>

                {/* Heading */}

                <div className="text-center">

                    <Smartphone

                        className="mx-auto text-blue-600"

                        size={60}

                    />

                    <h1 className="text-3xl font-bold mt-4">

                        Patient Login

                    </h1>

                    <p className="text-gray-500 mt-2">

                        Login using your Mobile Number

                    </p>

                </div>

                {/* Form */}

                {!showOTP ? (

                    <form

                        onSubmit={sendOTP}

                        className="mt-8 space-y-5"

                    >

                        <div>

                            <label className="font-semibold">

                                Mobile Number

                            </label>

                            <input

                                type="tel"

                                maxLength={10}

                                value={mobile}

                                onChange={(e) => setMobile(e.target.value)}

                                placeholder="Enter Mobile Number"

                                className="w-full border rounded-xl p-4 mt-2"

                                required

                            />

                        </div>

                        <button

                            className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-4 font-semibold"

                        >

                            Send OTP

                        </button>

                    </form>

                ) : (

                    <form

                        onSubmit={verifyOTP}

                        className="mt-8 space-y-5"

                    >

                        <div className="text-center">

                            <ShieldCheck

                                size={55}

                                className="mx-auto text-green-600"

                            />

                        </div>

                        <div>

                            <label className="font-semibold">

                                OTP

                            </label>

                            <input

                                type="text"

                                maxLength={6}

                                value={otp}

                                onChange={(e) => setOtp(e.target.value)}

                                placeholder="Enter 6-digit OTP"

                                className="w-full border rounded-xl p-4 mt-2"

                                required

                            />

                        </div>

                        <button

                            className="w-full bg-green-600 hover:bg-green-700 text-white rounded-xl py-4 font-semibold"

                        >

                            Verify OTP

                        </button>

                    </form>

                )}

            </div>

        </div>

    );

}

export default PatientLogin;