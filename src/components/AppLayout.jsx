import Navigation from "./Navigation.jsx";
import {Outlet} from "react-router-dom";

const AppLayout = ({ token, handleLogout }) => {
    return (
        <div>
            <Navigation token={token} handleLogout={handleLogout}/>
            <Outlet/>
        </div>
    );
}
export default AppLayout;
