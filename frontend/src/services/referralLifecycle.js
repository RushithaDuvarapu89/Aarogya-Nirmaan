export const REFERRAL_STAGES = [

    {
        key: "MATCHED",
        label: "Hospital Matched",
    },

    {
        key: "ACCEPTED",
        label: "Hospital Accepted",
    },

    {
        key: "AMBULANCE_ASSIGNED",
        label: "Ambulance Assigned",
    },

    {
        key: "PATIENT_PICKED",
        label: "Patient Picked",
    },

    {
        key: "PATIENT_ADMITTED",
        label: "Patient Admitted",
    },

    {
        key: "COMPLETED",
        label: "Referral Completed",
    },

];

export function getCurrentStage(status) {

    return REFERRAL_STAGES.findIndex(

        stage => stage.key === status

    );

}

export function getNextStatus(currentStatus) {

    const index = getCurrentStage(currentStatus);

    if (index === -1) {

        return currentStatus;

    }

    if (index === REFERRAL_STAGES.length - 1) {

        return currentStatus;

    }

    return REFERRAL_STAGES[index + 1].key;

}