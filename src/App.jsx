import {BrowserRouter, Route, Routes} from "react-router-dom";
import AppLayout from "./components/AppLayout.jsx";
import Homepage from "./pages/Homepage.jsx";
import Booking from "./pages/Booking.jsx";
import AppointmentsCalendar from "./pages/AppointmentsCalendar .jsx";

function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout/>}>
                    <Route path="/" element={<Homepage/>}/>
                    <Route path="/booking" element={<Booking/>}/>
                    <Route path="/calendar" element={<AppointmentsCalendar/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
