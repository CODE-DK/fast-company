import PropTypes from "prop-types";
import React from "react";

const Bookmark = ({ status, ...rest }) => {
    if (!status) {
        return <i className="bi bi-check" onClick={rest.onToggleBookmark}></i>;
    }
    return <i className="bi bi-check-all" onClick={rest.onToggleBookmark}></i>;
};

Bookmark.propTypes = {
    status: PropTypes.bool.isRequired
};

export default Bookmark;
