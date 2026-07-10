 import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";

import Analytics from "./pages/Analytics";
import MedicineAvailability from "./pages/MedicineAvailability";
import Referral from "./pages/Referral";
import Hospitals from "./pages/Hospitals";
import Ambulances from "./pages/Ambulances";
import Home from "./pages/Home";
import MediaPage from "./pages/MediaPage";
import AboutPage from "./pages/AboutPage";
import FAQsPage from "./pages/FAQsPage";
import SupportPage from "./pages/SupportPage";
import Login from "./pages/Login";
import PatientDashboard from "./pages/PatientDashboard";
import DoctorDashboard from "./pages/DoctorDashboard";
import ReceptionDashboard from "./pages/ReceptionDashboard";
import RoleSelection from "./pages/RoleSelection";
function App() {

    return (

        <BrowserRouter>

            <Routes>

                
                <Route
                path="/"
                element={<Home />}
                />

                <Route
                path="/hospitals"
                element={<Hospitals />}
                />

                <Route
                path="/ambulances"
                element={<Ambulances />}
                />

                <Route
                    path="/referral"
                    element={<Referral />}
                />
                <Route
                    path="/analytics"
                    element={<Analytics />}
                />
                <Route
                    path="/medicine"
                    element={<MedicineAvailability />}
                />
                
                <Route
                    path="/roles"
                    element={<RoleSelection />}
                />

                <Route path="/login" 
                element={<Login />} 
                />

                <Route path="/patient-dashboard"
                element={<PatientDashboard />}
                />

                <Route path="/doctor-dashboard"
                element={<DoctorDashboard />} 
                />

                <Route path="/reception-dashboard" 
                element={<ReceptionDashboard />} 
                />
                <Route
                path="/media"
                element={<MediaPage />}
                />
                <Route
                path="/support"
                element={<SupportPage />}
                />
                <Route path="/about" 
                element={<AboutPage />} 
                />
                <Route path="/faqs" 
                element={<FAQsPage />} 
                />
                </Routes>

        </BrowserRouter>

    );

}

export default App;