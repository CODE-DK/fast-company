import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import Bookmark from "./bookmark";
import QualitiesList from "./qualitiesList";
import Table from "./table";
import TableBody from "./tableBody";
import TableHeader from "./tableHeader";

const UserTable = ({
    users,
    onSort,
    selectedSort,
    onToggleBookmark,
    onDelete
}) => {
    const columns = {
        name: {
            path: "name",
            name: "Имя",
            component: ({ _id, name }) => (
                <Link to={`/users/${_id}`}>{name}</Link>
            )
        },
        qualities: {
            name: "Качества",
            component: ({ qualities }) => (
                <QualitiesList qualities={qualities} />
            )
        },
        profesions: { path: "profession.name", name: "Профессия" },
        completedMeetings: {
            path: "completedMeetings",
            name: "Встретился, раз"
        },
        rate: { path: "rate", name: "Оценка" },
        bookmart: {
            path: "bookmark",
            name: "Избранное",
            component: ({ bookmark, _id }) => (
                <Bookmark
                    status={bookmark}
                    onToggleBookmark={() => onToggleBookmark(_id)}
                />
            )
        },
        delete: {
            component: ({ _id }) => {
                return (
                    <button
                        className="btn btn-danger"
                        onClick={() => onDelete(_id)}
                    >
                        delete
                    </button>
                );
            }
        }
    };
    return (
        <Table>
            <TableHeader
                onSort={onSort}
                selectedSort={selectedSort}
                columns={columns}
            />
            <TableBody data={users} columns={columns} />
        </Table>
    );
};

UserTable.propTypes = {
    users: PropTypes.array.isRequired,
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    onToggleBookmark: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
};

export default UserTable;
