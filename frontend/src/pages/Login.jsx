import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Smartphone, ShieldCheck } from "lucide-react";

function Login() {

    const { role } = useParams();
    const navigate = useNavigate();

    const [mobile, setMobile] = useState("");
    const [otp, setOtp] = useState("");
    const [otpSent, setOtpSent] = useState(false);

    function sendOTP() {

        if (mobile.length !== 10) {
            alert("Enter a valid 10-digit mobile number");
            return;
        }

        // Backend API will be added later
        alert("OTP sent successfully (Demo)");

        console.log("Generated OTP: 123456");

        setOtpSent(true);
    }

    function verifyOTP() {

        // Temporary verification
        if (otp === "123456") {

            alert("Login Successful");

            navigate("/dashboard");

        } else {

            alert("Invalid OTP");

        }

    }

    return (

        <div className="min-h-screen bg-blue-50 flex justify-center items-center">

            <div className="bg-white shadow-xl rounded-2xl p-10 w-[420px]">

                <h1 className="text-3xl font-bold text-center text-blue-700">

                    {role?.toUpperCase()} Login

                </h1>

                <p className="text-gray-500 text-center mt-2">

                    Login using Mobile OTP

                </p>

                <div className="mt-8">

                    <label className="font-medium">

                        Mobile Number

                    </label>

                    <div className="flex mt-2">

                        <span className="bg-gray-100 px-4 flex items-center rounded-l-lg">

                            +91

                        </span>

                        <input
                            type="text"
                            maxLength="10"
                            value={mobile}
                            onChange={(e) => setMobile(e.target.value)}
                            className="border flex-1 p-3 rounded-r-lg"
                            placeholder="9876543210"
                        />
                    </div>

                </div>

                {!otpSent ? (

                    <button
                        onClick={sendOTP}
                        className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg flex justify-center items-center gap-2"
                    >

                        <Smartphone size={20} />

                        Send OTP

                    </button>

                ) : (

                    <>

                        <div className="mt-6">

                            <label className="font-medium">

                                Enter OTP

                            </label>

                            <input
                                type="text"
                                maxLength="6"
                                value={otp}
                                onChange={(e)=>setOtp(e.target.value)}
                                className="border w-full p-3 rounded-lg mt-2"
                                placeholder="123456"
                            />

                        </div>

                        <button
                            onClick={verifyOTP}
                            className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white p-3 rounded-lg flex justify-center items-center gap-2"
                        >

                            <ShieldCheck size={20} />

                            Verify OTP

                        </button>

                    </>

                )}

            </div>

        </div>

    );

}

export default Login;