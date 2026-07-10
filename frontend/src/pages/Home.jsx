import { Link } from "react-router-dom";
import {
    HeartPulse,
    Hospital,
    ShieldCheck,
    ArrowRight
} from "lucide-react";

function Home() {

    return (

        <div className="min-h-screen bg-gray-50">

            {/* Navbar */}

            <nav className="bg-white shadow-md">

                <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-5">

                    <div className="flex items-center gap-3">

                        <HeartPulse
                            className="text-red-600"
                            size={34}
                        />

                        <h1 className="text-3xl font-bold text-blue-700">

                            Aarogya Nirmaan

                        </h1>

                    </div>

                    <div className="flex gap-8 text-lg font-medium">

                        <Link to="/">Home</Link>

                        <Link to="/media">Media</Link>

                        <Link to="/about">About</Link>

                        <Link to="/faq">FAQs</Link>

                        <Link to="/support">Support</Link>

                        <Link
                            to="/roles"
                            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
                        >

                            Register / Login

                        </Link>

                    </div>

                </div>

            </nav>

            {/* Hero Section */}

            <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center py-20 px-8">

                <div>

                    <h1 className="text-6xl font-bold text-blue-700 leading-tight">

                        AI Powered

                        <br />

                        Smart Hospital

                        <br />

                        Referral System

                    </h1>

                    <p className="mt-8 text-xl text-gray-600">

                        Aarogya Nirmaan helps patients find the best nearby
                        hospitals based on ICU availability, ambulances,
                        ventilators, medicines and AI recommendation.

                    </p>

                    <Link

                        to="/roles"

                        className="inline-flex items-center gap-3 mt-10 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl text-lg"

                    >

                        Get Started

                        <ArrowRight />

                    </Link>

                </div>

                <div className="flex justify-center">

                    <img

                        src="https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=900"

                        alt="Hospital"

                        className="rounded-3xl shadow-2xl"

                    />

                </div>

            </div>

            {/* Features */}

            <div className="max-w-7xl mx-auto py-16 px-8">

                <h2 className="text-4xl font-bold text-center mb-12">

                    Why Aarogya Nirmaan?

                </h2>

                <div className="grid md:grid-cols-3 gap-8">

                    <div className="bg-white p-8 rounded-2xl shadow">

                        <Hospital
                            className="text-blue-600"
                            size={45}
                        />

                        <h3 className="text-2xl font-bold mt-4">

                            Smart Referral

                        </h3>

                        <p className="mt-3 text-gray-600">

                            AI recommends the best hospital based on
                            available facilities.

                        </p>

                    </div>

                    <div className="bg-white p-8 rounded-2xl shadow">

                        <ShieldCheck
                            className="text-green-600"
                            size={45}
                        />

                        <h3 className="text-2xl font-bold mt-4">

                            Faster Emergency Care

                        </h3>

                        <p className="mt-3 text-gray-600">

                            Reduce referral delays during emergency
                            situations.

                        </p>

                    </div>

                    <div className="bg-white p-8 rounded-2xl shadow">

                        <HeartPulse
                            className="text-red-600"
                            size={45}
                        />

                        <h3 className="text-2xl font-bold mt-4">

                            Better Patient Outcomes

                        </h3>

                        <p className="mt-3 text-gray-600">

                            Connect patients with hospitals having the
                            right medical resources.

                        </p>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Home;