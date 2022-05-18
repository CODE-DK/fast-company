import React from "react";
import { Route, Routes } from "react-router";
import Login from "./layouts/login";
import Main from "./layouts/main";
import NavBar from "./components/navBar";
import Users from "./layouts/users";

const App = () => {
    return (
        <>
            <NavBar />
            <Routes>
                <Route path="/users/" element={<Users />} />
                <Route path="/users/:userId" element={<Users />} />
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Main />} />
            </Routes>
        </>
    );
};

export default App;
