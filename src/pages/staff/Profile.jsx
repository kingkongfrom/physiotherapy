import { Fragment } from "react";
import { useNavigate } from "react-router-dom";

const Profile = ({ token, handleLogout }) => {
    const user = token.user.user_metadata;
    const navigate = useNavigate();

    const onLogout = () => {
        handleLogout(); // Call the handleLogout function from props
        sessionStorage.removeItem("token"); // Remove token from sessionStorage
        navigate("/"); // Redirect to the home page or another appropriate route
    };

    return (
        <Fragment>
            <h2>{user.fullName}</h2>
            <button className="btn btn-secondary" onClick={onLogout}>
                Logout
            </button>
        </Fragment>
    );
};

export default Profile;
