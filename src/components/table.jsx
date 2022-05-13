import PropTypes from "prop-types";
import React from "react";
import TableBody from "./tableBody";
import TableHeader from "./tableHeader";

const Table = ({ onSort, selectedSort, columns, data, children }) => {
    return (
        <table className="table">
            {children || (
                <>
                    <TableHeader
                        onSort={onSort}
                        selectedSort={selectedSort}
                        columns={columns}
                    />
                    <TableBody data={data} columns={columns} />
                </>
            )}
        </table>
    );
};

Table.propTypes = {
    onSort: PropTypes.func,
    selectedSort: PropTypes.object,
    columns: PropTypes.object,
    data: PropTypes.array,
    children: PropTypes.array
};

export default Table;
