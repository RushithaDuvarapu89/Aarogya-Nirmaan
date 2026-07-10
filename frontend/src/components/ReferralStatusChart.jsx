import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
} from "recharts";

function ReferralStatusChart({ referrals }) {

    const statusCount = {};

    referrals.forEach((referral) => {

        const status = referral.status || "Unknown";

        statusCount[status] =
            (statusCount[status] || 0) + 1;

    });

    const data = Object.entries(statusCount).map(

        ([status, count]) => ({

            status,

            count,

        })

    );

    return (

        <div className="bg-white rounded-xl shadow p-6">

            <h2 className="text-2xl font-bold mb-6">

                Referral Status Overview

            </h2>

            <div className="h-80">

                <ResponsiveContainer
                    width="100%"
                    height="100%"
                >

                    <BarChart data={data}>

                        <CartesianGrid strokeDasharray="3 3" />

                        <XAxis dataKey="status" />

                        <YAxis allowDecimals={false} />

                        <Tooltip />

                        <Bar
                            dataKey="count"
                            fill="#16A34A"
                            radius={[8, 8, 0, 0]}
                        />

                    </BarChart>

                </ResponsiveContainer>

            </div>

        </div>

    );

}

export default ReferralStatusChart;