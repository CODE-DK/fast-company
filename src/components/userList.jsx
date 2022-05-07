import React, { useState } from "react";
import api from "../api";

const UserList = () => {
  const [users, setUsers] = useState(api.users.fetchAll());

  return <></>;
};

export default UserList;
