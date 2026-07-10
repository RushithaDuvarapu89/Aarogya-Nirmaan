import {
    Pill,
    CircleCheckBig,
    TriangleAlert,
    CircleX,
    TrendingUp,
} from "lucide-react";

function MedicineStats({ medicines }) {

    const total = medicines.length;

    const available = medicines.filter(
        (m) => m.quantity >= 100
    ).length;

    const low = medicines.filter(
        (m) => m.quantity >= 30 && m.quantity < 100
    ).length;

    const out = medicines.filter(
        (m) => m.quantity < 30
    ).length;

    const cards = [

        {
            title: "Total Medicines",
            value: total,
            icon: <Pill size={34} />,
            bg: "from-blue-500 to-indigo-600",
        },

        {
            title: "Available",
            value: available,
            icon: <CircleCheckBig size={34} />,
            bg: "from-green-500 to-emerald-600",
        },

        {
            title: "Low Stock",
            value: low,
            icon: <TriangleAlert size={34} />,
            bg: "from-yellow-400 to-orange-500",
        },

        {
            title: "Out Of Stock",
            value: out,
            icon: <CircleX size={34} />,
            bg: "from-red-500 to-rose-600",
        },

    ];

    return (

        <div className="grid grid-cols-4 gap-6">

            {

                cards.map((card) => (

                    <div

                        key={card.title}

                        className={`bg-gradient-to-r ${card.bg}
                        rounded-2xl shadow-lg
                        text-white
                        p-6
                        hover:scale-105
                        hover:shadow-2xl
                        transition-all duration-300`}

                    >

                        <div className="flex justify-between">

                            <div>

                                <p className="opacity-90">

                                    {card.title}

                                </p>

                                <h2 className="text-4xl font-bold mt-3">

                                    {card.value}

                                </h2>

                            </div>

                            <div>

                                {card.icon}

                            </div>

                        </div>

                        <div className="mt-6 flex items-center gap-2 text-sm">

                            <TrendingUp size={16} />

                            Live Inventory

                        </div>

                    </div>

                ))

            }

        </div>

    );

}

export default MedicineStats;