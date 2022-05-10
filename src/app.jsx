import React, { useState } from "react";
import API from "./api";
import Users from "./components/users";

const initialState = API.users.fetchAll();

const App = () => {
    const [users, setUsers] = useState(initialState);

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
        <Users
            users={users}
            onDelete={handleDelete}
            onToggleBookmark={handleToggleBookmark}
        />
    );
};

export default App;
