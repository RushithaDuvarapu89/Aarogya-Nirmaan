import { useEffect, useState } from "react";

import { getReferrals } from "../services/api";

import AnalyticsCards from "../components/AnalyticsCards";
import PriorityChart from "../components/PriorityChart";
import HospitalUtilizationChart from "../components/HospitalUtilizationChart";
import ReferralStatusChart from "../components/ReferralStatusChart";

import {
    BarChart3,
} from "lucide-react";

function Analytics() {

    const [referrals, setReferrals] = useState([]);

    useEffect(() => {

        loadAnalytics();

    }, []);

    async function loadAnalytics() {

        try {

            const data = await getReferrals();

            setReferrals(data);

        }

        catch (error) {

            console.error(error);

        }

    }

    return (

        <div className="space-y-8">

            <div className="flex items-center gap-3">

                <BarChart3
                    size={32}
                    className="text-blue-600"
                />

                <h1 className="text-3xl font-bold">

                    Analytics Dashboard

                </h1>

            </div>

            <AnalyticsCards
                referrals={referrals}
            />

            <div className="grid grid-cols-2 gap-8">

                <PriorityChart
                    referrals={referrals}
                />

                <HospitalUtilizationChart
                    referrals={referrals}
                />

            </div>

            <ReferralStatusChart
                referrals={referrals}
            />

        </div>

    );

}

export default Analytics;