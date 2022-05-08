import React from "react";
import Bookmark from "./bookmark";
import Qualitie from "./qualitie";

const User = ({
  _id,
  bookmark,
  completedMeetings,
  name,
  profession,
  qualities,
  rate,
  onDelete,
  onToggleBookmark,
}) => {
  return (
    <tr>
      <td>{name}</td>
      <td>
        {qualities.map((qualitie) => (
          <Qualitie key={qualitie._id} {...qualitie} />
        ))}
      </td>
      <td>{profession.name}</td>
      <td>{completedMeetings}</td>
      <td>{rate}/5</td>
      <td>
        {
          <Bookmark
            status={bookmark}
            onToggleBookmark={() => onToggleBookmark(_id)}
          />
        }
      </td>
      <td>
        <button className='btn btn-danger' onClick={() => onDelete(_id)}>
          delete
        </button>
      </td>
    </tr>
  );
};

export default User;
