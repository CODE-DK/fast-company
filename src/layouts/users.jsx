import _ from "lodash";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import API from "../api";
import GroupList from "../components/groupList";
import Pagination from "../components/pagination";
import QualitiesList from "../components/qualitiesList";
import SearachStatus from "../components/searachStatus";
import UserTable from "../components/usersTable";
import { paginate } from "../utils/paginate";

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
const Users = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessions] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
    const [users, setUsers] = useState();

    const { userId } = useParams();

    const pageSize = 4;

    useEffect(() => {
        API.users
            .fetchAll()
            .then((newUsers) => setUsers(newUsers))
            .catch((error) => console.error(error));
    }, []);

    const handleDelete = (userId) => {
        setUsers(users.filter((it) => it._id !== userId));
    };

    const handleToggleBookmark = (userId) => {
        const newUsers = users.map((user) => {
            if (user._id === userId) {
                return { ...user, bookmark: !user.bookmark };
            }
            return user;
        });
        setUsers(newUsers);
    };

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
    const handleSort = (item) => {
        setSortBy(item);
    };

    if (userId) {
        const user = users.find((user) => user._id === userId);
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
    }

    if (users) {
        const filteredUsers = selectedProf
            ? users.filter((user) => user.profession._id === selectedProf._id)
            : users;

        const sortedUsers = _.orderBy(
            filteredUsers,
            [sortBy.path],
            [sortBy.order]
        );

        const count = filteredUsers.length;
        const userCrop = paginate(sortedUsers, currentPage, pageSize);

        const clearFilter = () => {
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
                        <UserTable
                            users={userCrop}
                            onSort={handleSort}
                            selectedSort={sortBy}
                            onDelete={handleDelete}
                            onToggleBookmark={handleToggleBookmark}
                        />
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
    }
    return "loading...";
};

export default Users;
