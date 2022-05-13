import PropTypes from "prop-types";
import React from "react";

const SearachStatus = ({ length }) => {
    if (!length) {
        return (
            <span className="badge bg-danger fs-4 mt-1">
                Никто с тобой не туcанет
            </span>
        );
    }
    const people = [2, 3, 4].includes(length) ? "человека" : "человек";
    return (
        <span className="badge bg-primary fs-4 mb-2 mt-1">
            {length} {people} тусанет с тобой сегодня
        </span>
    );
};

SearachStatus.propTypes = {
    length: PropTypes.number.isRequired
};

export default SearachStatus;
