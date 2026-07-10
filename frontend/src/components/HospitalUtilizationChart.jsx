import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
} from "recharts";

function HospitalUtilizationChart({ referrals }) {

    const hospitalCount = {};

    referrals.forEach((referral) => {

        const hospital =
            referral.recommendedHospital || "Unknown";

        hospitalCount[hospital] =
            (hospitalCount[hospital] || 0) + 1;

    });

    const data = Object.entries(hospitalCount).map(

        ([hospital, referrals]) => ({

            hospital,

            referrals,

        })

    );

    return (

        <div className="bg-white rounded-xl shadow p-6">

            <h2 className="text-2xl font-bold mb-6">

                Hospital Utilization

            </h2>

            <div className="h-80">

                <ResponsiveContainer
                    width="100%"
                    height="100%"
                >

                    <BarChart data={data}>

                        <CartesianGrid strokeDasharray="3 3" />

                        <XAxis dataKey="hospital" />

                        <YAxis allowDecimals={false} />

                        <Tooltip />

                        <Bar
                            dataKey="referrals"
                            fill="#2563EB"
                            radius={[8, 8, 0, 0]}
                        />

                    </BarChart>

                </ResponsiveContainer>

            </div>

        </div>

    );

}

export default HospitalUtilizationChart;