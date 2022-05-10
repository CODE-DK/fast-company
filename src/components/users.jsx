import React, { useState, useEffect } from "react";
import Pagination from "./pagination";
import User from "./user";
import { paginate } from "../utils/paginate";
import PropTypes from "prop-types";
import GroupList from "./groupList";
import API from "../api";
import SearachStatus from "./searachStatus";

// useEffect:

// 1)
// useEffect(() => {
//     console.log("everytime when render");
// });

// 2)
// useEffect(() => {
//     console.log("once a time when render");
// }, []);

// 3)
// useEffect(() => {
//     console.log("once a time and when currentPage will change");
// }, [currentPage]);

// 4)
// useEffect(() => {
//     return console.log("When Users will unmount");
// });

// ...rest означает оставшиеся параметры
const Users = ({ users, ...rest }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessions] = useState();
    const [selectedProf, setSelectedProf] = useState();

    const pageSize = 4;

    useEffect(() => {
        API.professions
            .fetchAll()
            .then((newProfessions) => setProfessions(newProfessions))
            .catch((error) => console.error(error));
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };
    const handleProfessionSelect = (prof) => {
        setSelectedProf(prof);
    };

    const filteredUsers = selectedProf
        ? users.filter((user) => user.profession._id === selectedProf._id)
        : users;

    const count = filteredUsers.length;
    const userCrop = paginate(filteredUsers, currentPage, pageSize);

    const clearFilter = () => {
        console.log("clear");
        setSelectedProf(undefined);
    };

    return (
        <div className="d-flex">
            {professions && (
                <div className="d-flex flex-column flex-shrink-0 p-3">
                    <GroupList
                        items={professions}
                        onItemSelect={handleProfessionSelect}
                        selectedItem={selectedProf}
                    />
                    <button
                        className="btn btn-secondary mt-2"
                        onClick={clearFilter}
                    >
                        Очистить
                    </button>
                </div>
            )}

            <div className="d-flex flex-column mt-2">
                <SearachStatus length={count} />
                {count > 0 && (
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Имя</th>
                                <th scope="col">Качества</th>
                                <th scope="col">Профессия</th>
                                <th scope="col">Встретился, раз</th>
                                <th scope="col">Оценка</th>
                                <th scope="col">Избранное</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {userCrop.map((user) => (
                                <User
                                    {...user}
                                    key={user._id}
                                    onDelete={rest.onDelete}
                                    onToggleBookmark={rest.onToggleBookmark}
                                />
                            ))}
                        </tbody>
                    </table>
                )}
                <div className="d-flex justify-content-center">
                    <Pagination
                        itemsCount={count}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
        </div>
    );
};

Users.propTypes = {
    users: PropTypes.array.isRequired
};

export default Users;
