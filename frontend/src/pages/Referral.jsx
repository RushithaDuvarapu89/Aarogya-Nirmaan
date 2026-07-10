import Sidebar from "../layout/Sidebar";
import Topbar from "../layout/Topbar";

import ReferralStats from "../components/ReferralStats";
import ReferralForm from "../components/ReferralForm";
import RecommendationCard from "../components/RecommendationCard";
import ReferralTimeline from "../components/ReferralTimeline";
import ReferralHistory from "../components/ReferralHistory";

function Referral() {

    return (

        <div className="flex bg-gray-100 min-h-screen">

            <Sidebar />

            <div className="ml-64 flex-1">

                <Topbar />

                <div className="p-8 space-y-8">

                    {/* Heading */}

                    <div>

                        <h1 className="text-4xl font-bold">

                            🚑 Smart Referral System

                        </h1>

                        <p className="text-gray-500 mt-2">

                            AI-powered hospital recommendation and patient referral management.

                        </p>

                    </div>

                    {/* Statistics */}

                    <ReferralStats />

                    {/* Form + Recommendation */}

                    <div className="grid grid-cols-2 gap-8">

                        <ReferralForm />

                        <RecommendationCard />

                    </div>

                    {/* Timeline */}

                    <ReferralTimeline />

                    {/* History */}

                    <ReferralHistory />

                </div>

            </div>

        </div>

    );

}

export default Referral;