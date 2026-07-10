 import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import MedicineAvailability from "./pages/MedicineAvailability";
import Referral from "./pages/Referral";
import Hospitals from "./pages/Hospitals";
import Ambulances from "./pages/Ambulances";

function App() {

    return (

        <BrowserRouter>

            <Routes>

                <Route
                    path="/"
                    element={<Navigate to="/dashboard" />}
                />

                <Route
                    path="/dashboard"
                    element={<Dashboard />}
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
                
                </Routes>

        </BrowserRouter>

    );

}

export default App;