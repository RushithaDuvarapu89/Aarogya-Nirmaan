 const API = "http://localhost:5000/api";

// -------------------------
// Hospitals
// -------------------------

export async function getHospitals() {

    const response = await fetch(`${API}/hospitals`);

    if (!response.ok) {

        throw new Error("Failed to fetch hospitals");

    }

    return await response.json();

}

// -------------------------
// Dashboard
// -------------------------

export async function getDashboard() {

    const response = await fetch(`${API}/dashboard`);

    if (!response.ok) {

        throw new Error("Failed to fetch dashboard");

    }

    return await response.json();

}

// -------------------------
// Referrals
// -------------------------

export async function getReferrals() {

    const response = await fetch(`${API}/referrals`);

    if (!response.ok) {

        throw new Error("Failed to fetch referrals");

    }

    return await response.json();

}

export async function createReferral(referral) {

    const response = await fetch(`${API}/referrals`, {

        method: "POST",

        headers: {

            "Content-Type": "application/json",

        },

        body: JSON.stringify(referral),

    });

    if (!response.ok) {

        throw new Error("Failed to create referral");

    }

    return await response.json();

}

// -------------------------
// Recommendation
// -------------------------

export async function recommendHospital(patient) {

    const response = await fetch(`${API}/recommend`, {

        method: "POST",

        headers: {

            "Content-Type": "application/json",

        },

        body: JSON.stringify(patient),

    });

    if (!response.ok) {

        throw new Error("Recommendation failed");

    }

    return await response.json();

}

// -------------------------
// Referral Status
// -------------------------

export async function updateReferralStatus(id, status) {

    const response = await fetch(

        `${API}/referral-status/${id}`,

        {

            method: "PATCH",

            headers: {

                "Content-Type": "application/json",

            },

            body: JSON.stringify({

                status,

            }),

        }

    );

    if (!response.ok) {

        throw new Error("Failed to update referral status");

    }

    return await response.json();

}
export async function deleteReferral(id) {

    const response = await fetch(

        `${API}/delete-referral/${id}`,

        {

            method: "DELETE",

        }

    );

    if (!response.ok) {

        throw new Error("Failed to delete referral");

    }

    return await response.json();

}
export async function editReferral(id, referral) {

    const response = await fetch(

        `${API}/edit-referral/${id}`,

        {

            method: "PUT",

            headers: {

                "Content-Type": "application/json",

            },

            body: JSON.stringify(referral),

        }

    );

    if (!response.ok) {

        throw new Error("Failed to update referral");

    }

    return await response.json();

}
// -------------------------
// Medicines
// -------------------------

export async function getMedicines() {

    const response = await fetch(`${API}/medicines`);

    if (!response.ok) {

        throw new Error("Failed to fetch medicines");

    }

    return await response.json();

}