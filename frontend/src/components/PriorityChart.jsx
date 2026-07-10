import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

const COLORS = [
    "#DC2626", // Critical - Red
    "#F59E0B", // High - Orange
    "#2563EB", // Medium - Blue
    "#16A34A", // Low - Green
];

function PriorityChart({ referrals }) {

    const priorityCount = {};

    referrals.forEach((referral) => {

        const priority = referral.priority || "Unknown";

        priorityCount[priority] =
            (priorityCount[priority] || 0) + 1;

    });

    const data = Object.entries(priorityCount).map(
        ([name, value]) => ({
            name,
            value,
        })
    );

    return (

        <div className="bg-white rounded-xl shadow p-6">

            <h2 className="text-2xl font-bold mb-6">

                Priority Distribution

            </h2>

            <div className="h-80">

                <ResponsiveContainer width="100%" height="100%">

                    <PieChart>

                        <Pie
                            data={data}
                            dataKey="value"
                            nameKey="name"
                            outerRadius={110}
                            label
                        >

                            {

                                data.map((entry, index) => (

                                    <Cell
                                        key={index}
                                        fill={
                                            COLORS[
                                                index % COLORS.length
                                            ]
                                        }
                                    />

                                ))

                            }

                        </Pie>

                        <Tooltip />

                        <Legend />

                    </PieChart>

                </ResponsiveContainer>

            </div>

        </div>

    );

}

export default PriorityChart;