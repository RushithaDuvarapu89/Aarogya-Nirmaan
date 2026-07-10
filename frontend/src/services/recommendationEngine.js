export function recommendHospitals(hospitals, patient) {

    const rankedHospitals = hospitals.map(hospital => {

        let score = 0;
        let reasons = [];

        // ICU
        if (patient.needICU) {

            if (hospital.icuBeds > 0) {

                score += 40;
                reasons.push("ICU Available");

            } else {

                reasons.push("No ICU Beds");

            }

        }

        // Ventilator
        if (patient.needVentilator) {

            if (hospital.ventilator) {

                score += 30;
                reasons.push("Ventilator Available");

            } else {

                reasons.push("No Ventilator");

            }

        }

        // Distance
        const distance = parseFloat(hospital.distance);

        if (distance <= 5) {

            score += 20;
            reasons.push("Nearby Hospital");

        }

        // ETA
        const eta = parseInt(hospital.eta);

        if (eta <= 15) {

            score += 10;
            reasons.push("Fast Response");

        }

        return {

            ...hospital,

            score,

            reasons

        };

    });

    rankedHospitals.sort((a, b) => b.score - a.score);

    return rankedHospitals;

}