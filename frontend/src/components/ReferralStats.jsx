import {
    ClipboardList,
    Clock3,
    CheckCircle2,
    Ambulance,
} from "lucide-react";

function ReferralStats() {

    // Dummy data (Later we'll connect to backend)

    const stats = [

        {
            title: "Total Referrals",
            value: 24,
            icon: <ClipboardList size={30} />,
            color: "from-blue-500 to-indigo-600",
        },

        {
            title: "Pending",
            value: 6,
            icon: <Clock3 size={30} />,
            color: "from-yellow-400 to-orange-500",
        },

        {
            title: "Accepted",
            value: 15,
            icon: <CheckCircle2 size={30} />,
            color: "from-green-500 to-emerald-600",
        },

        {
            title: "In Transit",
            value: 3,
            icon: <Ambulance size={30} />,
            color: "from-red-500 to-pink-600",
        },

    ];

    return (

        <div className="grid grid-cols-4 gap-6">

            {

                stats.map((item) => (

                    <div

                        key={item.title}

                        className={`bg-gradient-to-r ${item.color}
                        rounded-2xl
                        shadow-lg
                        p-6
                        text-white
                        hover:scale-105
                        hover:shadow-2xl
                        transition-all duration-300`}

                    >

                        <div className="flex justify-between items-center">

                            <div>

                                <p className="text-sm opacity-90">

                                    {item.title}

                                </p>

                                <h2 className="text-4xl font-bold mt-3">

                                    {item.value}

                                </h2>

                            </div>

                            {item.icon}

                        </div>

                    </div>

                ))

            }

        </div>

    );

}

export default ReferralStats;