import React, {useState} from "react";
import api from "../api";
import "bootstrap/dist/css/bootstrap.css"

const Users = () => {
    const [users, setUsers] = useState(api.users.fetchAll());

    const mapQualities = (qualities) => {
        return qualities.map((quality, i) => {
            const name = quality.name;
            const color = `badge bg-${quality.color} m-1`;

            return <span className={color} key={i}>{name}</span>
        })
    }

    const delUser = (i) => {
        setUsers(users.filter((user, userId) => userId !== i))
    }

    const showUsers = () => {
        return users.map((u, i) => {
            return (<tr key={i}>
                <td>{u.name}</td>
                <td>{mapQualities(u.qualities)}</td>
                <td>{u.profession.name}</td>
                <td>{u.completedMeetings}</td>
                <td>{u.rate}/5</td>
                <td>
                    <button className="btn btn-danger" onClick={() => delUser(i)}>delete</button>
                </td>
            </tr>)
        });
    }

    if (!users.length) {
        return <span className="badge bg-danger fs-4 mt-1">Никто с тобой не тучанет</span>
    } else {
        const people = [2, 3, 4].includes(users.length) ? 'человека' : 'человек';
        return (
            <>
                <span className="badge bg-primary fs-4 mb-2 mt-1">{users.length} {people} тусанет с тобой сегодня</span>
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">Имя</th>
                        <th scope="col">Качества</th>
                        <th scope="col">Профессия</th>
                        <th scope="col">Встретился, раз</th>
                        <th scope="col">Оценка</th>
                        <th scope="col"></th>
                    </tr>
                    </thead>
                    <tbody>
                    {showUsers()}
                    </tbody>
                </table>
            </>
        )
    }
}

export default Users;