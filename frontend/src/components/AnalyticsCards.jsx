import {
    ClipboardList,
    CircleCheckBig,
    TriangleAlert,
    Clock3,
} from "lucide-react";

function AnalyticsCards({ referrals }) {

    const total = referrals.length;

    const completed = referrals.filter(
        (r) => r.status === "COMPLETED"
    ).length;

    const critical = referrals.filter(
        (r) => r.priority === "Critical"
    ).length;

    const inProgress = referrals.filter(
        (r) => r.status !== "COMPLETED"
    ).length;

    const cards = [
        {
            title: "Total Referrals",
            value: total,
            color: "bg-blue-600",
            icon: ClipboardList,
        },
        {
            title: "Completed",
            value: completed,
            color: "bg-green-600",
            icon: CircleCheckBig,
        },
        {
            title: "Critical Cases",
            value: critical,
            color: "bg-red-600",
            icon: TriangleAlert,
        },
        {
            title: "In Progress",
            value: inProgress,
            color: "bg-yellow-500",
            icon: Clock3,
        },
    ];

    return (

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

            {

                cards.map((card) => {

                    const Icon = card.icon;

                    return (

                        <div
                            key={card.title}
                            className={`${card.color} rounded-xl shadow-lg text-white p-6`}
                        >

                            <div className="flex justify-between items-center">

                                <div>

                                    <p className="text-sm opacity-90">

                                        {card.title}

                                    </p>

                                    <h2 className="text-4xl font-bold mt-3">

                                        {card.value}

                                    </h2>

                                </div>

                                <Icon size={42} />

                            </div>

                        </div>

                    );

                })

            }

        </div>

    );

}

export default AnalyticsCards;