import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import AppLayout from "./components/AppLayout.jsx";
import Homepage from "./pages/Homepage.jsx";
import Booking from "./pages/Booking.jsx";
import AppointmentsCalendar from "./pages/AppointmentsCalendar";
import SignUp from "./pages/auth/SignUp";
import Login from "./pages/auth/Login.jsx";
import Profile from "./pages/staff/Profile";

function App() {
    const [token, setToken] = useState(null); // Initialize with null

    useEffect(() => {
        const storedToken = sessionStorage.getItem("token");
        if (storedToken) {
            const parsedToken = JSON.parse(storedToken);
            setToken(parsedToken);
        }
    }, []); // Run once on initial mount

    const requireAuth = (token) => {
        return !!token; // Convert to boolean, true if token exists
    };

    const handleLogout = () => {
        sessionStorage.removeItem("token"); // Remove token from sessionStorage
        setToken(null); // Update state to null upon logout
    };

    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout token={token} handleLogout={handleLogout} />}>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/booking" element={<Booking />} />
                    <Route path="/calendar" element={<AppointmentsCalendar />} />
                    <Route path="/sign-up" element={<SignUp />} />
                    <Route path="/login" element={<Login setToken={setToken} />} />
                    <Route path="/profile" element={requireAuth(token) ? <Profile token={token} handleLogout={handleLogout} /> : <Navigate to="/login" />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
