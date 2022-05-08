import React from "react";
import SearachStatus from "./searachStatus";
import User from "./user";

//...rest означает оставшиеся параметры
const Users = ({ users, ...rest }) => {
  return (
    <>
      <SearachStatus length={users.length} />
      <table className='table'>
        <thead>
          <tr>
            <th scope='col'>Имя</th>
            <th scope='col'>Качества</th>
            <th scope='col'>Профессия</th>
            <th scope='col'>Встретился, раз</th>
            <th scope='col'>Оценка</th>
            <th scope='col'>Избранное</th>
            <th scope='col'></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <User
              {...user}
              key={user._id}
              onDelete={rest.onDelete}
              onToggleBookmark={rest.onToggleBookmark}
            />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Users;
