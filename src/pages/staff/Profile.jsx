import { Fragment } from "react";

const Profile = ({ token }) => {
    const user = token.user.user_metadata;

    return (
        <Fragment>
            <h2>{user.fullName}</h2>

        </Fragment>
    );
};

export default Profile;
