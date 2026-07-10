function About() {
    return (
        <section className="min-h-screen bg-gray-100 py-20">
            <div className="max-w-6xl mx-auto px-8">

                <h1 className="text-5xl font-bold text-blue-700 text-center mb-10">
                    About Aarogya Nirmaan
                </h1>

                <div className="bg-white shadow-lg rounded-2xl p-10">

                    <p className="text-lg text-gray-700 leading-9">
                        Aarogya Nirmaan is an AI-powered Smart Hospital Referral
                        Platform developed to reduce delays during medical
                        emergencies.
                    </p>

                    <br />

                    <p className="text-lg text-gray-700 leading-9">
                        The system intelligently recommends the best nearby
                        hospital based on:
                    </p>

                    <ul className="list-disc ml-8 mt-5 space-y-3 text-lg">

                        <li>Doctor Availability</li>

                        <li>Hospital Bed Availability</li>

                        <li>ICU Beds</li>

                        <li>Ventilators</li>

                        <li>Medicine Availability</li>

                        <li>Nearest Ambulance</li>

                        <li>Real-time Hospital Analytics</li>

                    </ul>

                    <div className="mt-10">

                        <h2 className="text-3xl font-bold text-blue-700 mb-4">
                            Our Mission
                        </h2>

                        <p className="text-lg text-gray-700 leading-8">
                            To ensure every patient reaches the right hospital
                            at the right time using Artificial Intelligence and
                            smart healthcare technologies.
                        </p>

                    </div>

                </div>

            </div>
        </section>
    );
}

export default About;