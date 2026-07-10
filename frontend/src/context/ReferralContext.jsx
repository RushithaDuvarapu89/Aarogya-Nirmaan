import { createContext, useContext, useState } from "react";

const ReferralContext = createContext();

export function ReferralProvider({ children }) {

    const [referral, setReferral] = useState({
        id: null,
        patientName: "",
        age: "",
        condition: "",
        priority: "",
        currentHospital: "",
        recommendedHospital: "",
        needICU: false,
        needVentilator: false,
        needTrauma: false,
        status: "",
    });

    return (
        <ReferralContext.Provider
            value={{
                referral,
                setReferral,
            }}
        >
            {children}
        </ReferralContext.Provider>
    );
}

export function useReferral() {
    return useContext(ReferralContext);
}