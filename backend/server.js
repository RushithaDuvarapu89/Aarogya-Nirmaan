const express = require("express");
const cors = require("cors");

const hospitalRoutes = require("./routes/hospitals");
const referralRoutes = require("./routes/referrals");
const dashboardRoutes = require("./routes/dashboard");
const recommendRoutes = require("./routes/recommend");
const referralStatusRoutes = require("./routes/referralStatus");
const ambulanceRoutes = require("./routes/ambulances");
const deleteReferralRoutes =
require("./routes/deleteReferral");
const editReferralRoutes =
require("./routes/editReferral");

const app = express();

app.use(cors());
app.use(express.json());

const medicineRoutes = require("./routes/medicines");

app.use("/api/hospitals", hospitalRoutes);
app.use("/api/referrals", referralRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/recommend", recommendRoutes);
app.use("/api/referral-status", referralStatusRoutes);
app.use("/api/medicines", medicineRoutes);
app.use("/api/ambulances", ambulanceRoutes);
app.use(
    "/api/delete-referral",
    deleteReferralRoutes
);
app.use(
    "/api/edit-referral",
    editReferralRoutes
);
app.get("/", (req, res) => {
    res.send("Hospital Referral Platform Backend Running");
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});