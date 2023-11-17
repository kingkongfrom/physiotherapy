import Navigation from "./Navigation.jsx";
import {Outlet} from "react-router-dom";

const AppLayout = () => {
    return (
        <div>
            <Navigation/>
            <Outlet/>
        </div>
    );
}
export default AppLayout;
