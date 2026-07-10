import { useReferral } from "../context/ReferralContext";

function EmergencyCard() {

  const { referral } = useReferral();

  return (
    <div className="bg-red-600 text-white rounded-2xl shadow-xl p-8 mb-8">

      <div className="flex justify-between items-center">

        <div>
          <h2 className="text-3xl font-bold">
            🚨 ACTIVE EMERGENCY
          </h2>

          <p className="text-red-100 mt-2">
            Emergency referral currently in progress
          </p>
        </div>

        <div className="bg-white text-red-600 px-5 py-2 rounded-full font-bold">
          {referral.priority}
        </div>

      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-8">

        <div>
          <p className="text-red-200 text-sm">Patient</p>
          <h3 className="text-xl font-bold">
            {referral.patientName}
          </h3>
        </div>

        <div>
          <p className="text-red-200 text-sm">Age</p>
          <h3 className="text-xl font-bold">
            {referral.age}
          </h3>
        </div>

        <div>
          <p className="text-red-200 text-sm">Condition</p>
          <h3 className="text-xl font-bold">
            {referral.condition}
          </h3>
        </div>

        <div>
          <p className="text-red-200 text-sm">Current Hospital</p>
          <h3 className="text-xl font-bold">
            {referral.currentHospital}
          </h3>
        </div>

        <div>
          <p className="text-red-200 text-sm">Required</p>
          <h3 className="text-xl font-bold">
            {referral.needICU ? "ICU " : ""}
            {referral.needVentilator ? "+ Ventilator" : ""}
          </h3>
        </div>

        <div>
          <p className="text-red-200 text-sm">Recommended Hospital</p>
          <h3 className="text-xl font-bold">
            {referral.recommendedHospital}
          </h3>
        </div>

      </div>

    </div>
  );
}

export default EmergencyCard;