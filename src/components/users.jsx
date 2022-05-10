import React, { useState } from "react";
import Pagination from "./pagination";
import SearachStatus from "./searachStatus";
import User from "./user";
import { paginate } from "../utils/paginate";
import PropTypes from "prop-types";

// ...rest означает оставшиеся параметры
const Users = ({ users, ...rest }) => {
    const [currentPage, setCurrentPage] = useState(1);

    const count = users.length;
    const pageSize = 4;

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const userCrop = paginate(users, currentPage, pageSize);

    return (
        <>
            <SearachStatus length={count} />
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
            <Pagination
                itemsCount={count}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />
        </>
    );
};

Users.propTypes = {
    users: PropTypes.array.isRequired
};

export default Users;
