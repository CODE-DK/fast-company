import React, { useState, useEffect } from "react";
import API from "./api";
import Users from "./components/users";

const App = () => {
    const [users, setUsers] = useState();

    useEffect(() => {
        API.users
            .fetchAll()
            .then((newUsers) => setUsers(newUsers))
            .catch((error) => console.error(error));
    }, []);

    function handleDelete(userId) {
        setUsers(users.filter((it) => it._id !== userId));
    }

    function handleToggleBookmark(userId) {
        const newUsers = users.map((user) => {
            if (user._id === userId) {
                return { ...user, bookmark: !user.bookmark };
            }
            return user;
        });

        setUsers(newUsers);
    }

    return (
        <>
            {users && (
                <Users
                    users={users}
                    onDelete={handleDelete}
                    onToggleBookmark={handleToggleBookmark}
                />
            )}
        </>
    );
};

export default App;
