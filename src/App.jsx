import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import { useEffect, useState } from "react";
import AppLayout from "./components/AppLayout.jsx";
import Homepage from "./pages/Homepage.jsx";
import Booking from "./pages/Booking.jsx";
import AppointmentsCalendar from "./pages/AppointmentsCalendar";
import SignUp from "./pages/auth/SignUp";
import Login from "./pages/auth/Login.jsx";
import Profile from "./pages/staff/Profile";

function App() {
    const [token, setToken] = useState(false);

    if (token) sessionStorage.setItem("token", JSON.stringify(token));

    useEffect(() => {
        if (sessionStorage.getItem("token")) {
            let data = JSON.parse(sessionStorage.getItem("token"));
            setToken(data);
        }
    }, []);

    const requireAuth = (token) => {
        return token ? true : false;
    };

    const handleLogout = () => {
        setToken(null); // Update the token state to null
    };

    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout token={token}/>}>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/booking" element={<Booking />} />
                    <Route path="/calendar" element={<AppointmentsCalendar />} />
                    <Route path="/sign-up" element={<SignUp />} />
                    <Route
                        path="/login"
                        element={<Login setToken={setToken} />}
                    />
                    <Route
                        path="/profile"
                        element={requireAuth(token) ? <Profile token={token} handleLogout={handleLogout}/> : <Navigate to="/login" />}
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
