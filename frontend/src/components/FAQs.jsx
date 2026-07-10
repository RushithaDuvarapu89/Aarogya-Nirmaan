function FAQs() {

    const questions = [

        {
            question: "What is Aarogya Nirmaan?",
            answer:
                "It is an AI-powered hospital referral platform that recommends the best hospital for patients."
        },

        {
            question: "Who can use this platform?",
            answer:
                "Patients, Doctors, Receptionists and Hospitals."
        },

        {
            question: "Does it provide ambulance services?",
            answer:
                "Yes. Nearby ambulance availability is shown."
        },

        {
            question: "Can hospitals update medicine availability?",
            answer:
                "Yes. Receptionists and hospital staff can update medicine stock."
        },

        {
            question: "Is this available 24×7?",
            answer:
                "Yes. Emergency support works throughout the day."
        }

    ];

    return (

        <section className="min-h-screen bg-gray-100 py-20">

            <div className="max-w-5xl mx-auto px-8">

                <h1 className="text-5xl font-bold text-blue-700 text-center mb-12">
                    Frequently Asked Questions
                </h1>

                <div className="space-y-6">

                    {questions.map((item, index) => (

                        <div
                            key={index}
                            className="bg-white shadow-lg rounded-xl p-6"
                        >

                            <h2 className="text-2xl font-semibold text-blue-700">
                                {item.question}
                            </h2>

                            <p className="mt-3 text-gray-700">
                                {item.answer}
                            </p>

                        </div>

                    ))}

                </div>

            </div>

        </section>

    );
}

export default FAQs;