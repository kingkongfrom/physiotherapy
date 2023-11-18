import Navigation from "./Navigation.jsx";
import {Outlet} from "react-router-dom";

const AppLayout = ({ token }) => {
    return (
        <div>
            <Navigation token={token}/>
            <Outlet/>
        </div>
    );
}
export default AppLayout;
