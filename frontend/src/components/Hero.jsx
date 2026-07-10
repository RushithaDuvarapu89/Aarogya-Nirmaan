import heroHospital from "../assets/hero-hospital.jpg";

function Hero() {

    return (

        <section
            id="home"
            className="min-h-screen bg-gradient-to-r from-blue-50 to-green-50 flex items-center pt-20"
        >

            <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-2 gap-12 items-center">

                {/* Left Side */}

                <div>

                    <h1 className="text-6xl font-extrabold text-blue-700 leading-tight">

                        Aarogya Nirmaan

                    </h1>

                    <h2 className="text-3xl font-bold mt-4 text-gray-800">

                        AI Powered Smart Hospital Referral Platform

                    </h2>

                    <p className="mt-8 text-lg text-gray-600 leading-8">

                        Aarogya Nirmaan helps patients find the best nearby hospitals
                        based on doctor availability, bed and ICU availability,
                        ambulances, ventilators, medicines, and AI-powered recommendations.

                    </p>

                    <div className="mt-10">

                        <a
                            href="#about"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg"
                        >
                            Learn More
                        </a>

                    </div>

                </div>

                {/* Right Side */}

                <div>

                    <img
                        src={heroHospital}
                        alt="Hospital"
                        className="rounded-3xl shadow-2xl"
                    />

                </div>

            </div>

        </section>

    );

}

export default Hero;