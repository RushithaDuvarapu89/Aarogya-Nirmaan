import media1 from "../assets/media1.jpg";
import media2 from "../assets/media2.jpg";
import media3 from "../assets/media3.jpg";
import media4 from "../assets/media4.jpg";

const media = [
    {
        image: media1,
        title: "AI Hospital Recommendation",
        description:
            "Artificial Intelligence analyzes nearby hospitals and recommends the most suitable hospital based on doctor availability, ICU beds, ambulances, ventilators and medicines."
    },
    {
        image: media2,
        title: "Emergency Patient Care",
        description:
            "Patients receive immediate treatment through our intelligent referral system, reducing delays during emergencies."
    },
    {
        image: media3,
        title: "24×7 Ambulance Services",
        description:
            "Locate the nearest available ambulance with estimated arrival time to provide rapid emergency transportation."
    },
    {
        image: media4,
        title: "Healthcare Analytics",
        description:
            "Hospitals monitor referrals, bed occupancy, medicine availability and emergency statistics through interactive dashboards."
    }
];

function Media() {

    return (

        <div className="min-h-screen bg-gray-100 py-20">

            <div className="max-w-7xl mx-auto px-8">

                <h1 className="text-5xl font-bold text-center text-blue-700">

                    Media Gallery

                </h1>

                <p className="text-center text-gray-600 mt-5 text-lg">

                    Explore how Aarogya Nirmaan transforms healthcare using Artificial Intelligence.

                </p>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">

                    {media.map((item, index) => (

                        <div
                            key={index}
                            className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 hover:-translate-y-2"
                        >

                            <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-60 object-cover"
                            />

                            <div className="p-6">

                                <h2 className="text-xl font-bold mb-3">

                                    {item.title}

                                </h2>

                                <p className="text-gray-600 leading-7">

                                    {item.description}

                                </p>

                            </div>

                        </div>

                    ))}

                </div>

            </div>

        </div>

    );

}

export default Media;