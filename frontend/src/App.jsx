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
import PatientLogin from "./pages/PatientLogin";
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

                <Route
                path="/patient-login"
                element={<PatientLogin />}
                />

                </Routes>

        </BrowserRouter>

    );

}

export default App;