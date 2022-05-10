import React from "react";
import PropTypes from "prop-types";

const GroupList = ({
    items,
    valueProperty,
    contentProperty,
    onItemSelect,
    selectedItem
}) => {
    return (
        <ul className="list-group">
            {Object.keys(items).map((i) => (
                <li
                    key={items[i][valueProperty]}
                    className={
                        "list-group-item" +
                        (items[i] === selectedItem ? " active" : "")
                    }
                    onClick={() => onItemSelect(items[i])}
                    role="button"
                >
                    {items[i][contentProperty]}
                </li>
            ))}
        </ul>
    );
};

// When create reusable components Then use abstract keys
GroupList.defaultProps = {
    valueProperty: "_id",
    contentProperty: "name"
};

GroupList.propTypes = {
    items: PropTypes.object.isRequired,
    valueProperty: PropTypes.string.isRequired,
    contentProperty: PropTypes.string.isRequired,
    onItemSelect: PropTypes.func.isRequired,
    selectedItem: PropTypes.object
};

export default GroupList;
