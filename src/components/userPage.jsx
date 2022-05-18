import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import QualitiesList from "./qualitiesList";
import API from "../api";

const UserPage = ({ userId }) => {
    const [user, setUser] = useState();

    useEffect(() => {
        API.users
            .findById(userId)
            .then((newUser) => setUser(newUser))
            .catch((error) => console.error(error));
    }, []);

    if (user) {
        return (
            <>
                <h1>{user.name}</h1>
                <h3>Профессия: {user.profession.name}</h3>
                <div>
                    <QualitiesList qualities={user.qualities} />
                </div>
                <p>completedMeetings: {user.completedMeetings}</p>
                <h2>Rate: {user.rate}</h2>
                <Link className="btn btn-primary small" to={"/users"}>
                    Все пользователи
                </Link>
            </>
        );
    } else {
        return "loading...";
    }
};
UserPage.propTypes = {
    userId: PropTypes.string.isRequired
};

export default UserPage;
