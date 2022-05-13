import PropTypes from "prop-types";
import React from "react";

const Qualitie = ({ color, name, _id }) => {
    const badge = `badge bg-${color} m-1`;
    return (
        <span className={badge} key={_id}>
            {name}
        </span>
    );
};

Qualitie.propTypes = {
    color: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired
};

export default Qualitie;
