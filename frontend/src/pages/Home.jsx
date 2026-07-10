import { Link } from "react-router-dom";
import {
    ArrowRight,
    HeartPulse,
    Hospital,
    ShieldCheck
} from "lucide-react";

import Navbar from "../components/Navbar";
import heroHospital from "../assets/hero-hospital.jpg";

function Home() {

    return (

        <div className="min-h-screen bg-gray-50">

            <Navbar />

            {/* Hero Section */}

            <section className="pt-36 pb-20">

                <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-2 gap-16 items-center">

                    {/* Left */}

                    <div>

                        <h1 className="text-6xl font-bold text-blue-700 leading-tight">

                            AI Powered

                            <br />

                            Smart Hospital

                            <br />

                            Referral Platform

                        </h1>

                        <p className="mt-8 text-xl text-gray-600 leading-10">

                            Aarogya Nirmaan helps patients find the best nearby
                            hospitals based on doctor's availability,
                            Bed/ICU availability, ambulances,
                            ventilators, medicines and AI-powered
                            recommendations.

                        </p>

                        <Link
                            to="/roles"
                            className="inline-flex items-center gap-3 mt-10 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl text-lg"
                        >

                            Get Started

                            <ArrowRight size={22} />

                        </Link>

                    </div>

                    {/* Right */}

                    <div>

                        <img
                            src={heroHospital}
                            alt="Hospital"
                            className="rounded-3xl shadow-2xl"
                        />

                    </div>

                </div>

            </section>

            {/* Features */}

            <section className="py-20 bg-white">

                <div className="max-w-7xl mx-auto px-8">

                    <h2 className="text-5xl font-bold text-center text-blue-700">

                        Why Aarogya Nirmaan?

                    </h2>

                    <p className="text-center text-gray-600 mt-5 text-lg">

                        Everything required during an emergency in one platform.

                    </p>

                    <div className="grid md:grid-cols-3 gap-10 mt-16">

                        {/* Card */}

                        <div className="bg-gray-50 rounded-3xl shadow-lg p-8 hover:shadow-2xl transition">

                            <Hospital
                                className="text-blue-600"
                                size={50}
                            />

                            <h3 className="text-2xl font-bold mt-6">

                                Smart Hospital Search

                            </h3>

                            <p className="mt-4 text-gray-600 leading-8">

                                Search hospitals based on doctors,
                                ICU beds, ventilators, medicines,
                                ambulances and emergency facilities.

                            </p>

                        </div>

                        {/* Card */}

                        <div className="bg-gray-50 rounded-3xl shadow-lg p-8 hover:shadow-2xl transition">

                            <ShieldCheck
                                className="text-green-600"
                                size={50}
                            />

                            <h3 className="text-2xl font-bold mt-6">

                                AI Recommendation

                            </h3>

                            <p className="mt-4 text-gray-600 leading-8">

                                AI recommends the most suitable
                                nearby hospital based on real-time
                                healthcare resource availability.

                            </p>

                        </div>

                        {/* Card */}

                        <div className="bg-gray-50 rounded-3xl shadow-lg p-8 hover:shadow-2xl transition">

                            <HeartPulse
                                className="text-red-600"
                                size={50}
                            />

                            <h3 className="text-2xl font-bold mt-6">

                                Faster Emergency Care

                            </h3>

                            <p className="mt-4 text-gray-600 leading-8">

                                Reduce referral delays and improve
                                patient outcomes through smart
                                hospital recommendations.

                            </p>

                        </div>

                    </div>

                </div>

            </section>

        </div>

    );

}

export default Home;