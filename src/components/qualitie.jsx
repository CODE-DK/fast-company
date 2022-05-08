import React from "react";

const Qualitie = ({ color, name, _id }) => {
  const badge = `badge bg-${color} m-1`;
  return (
    <span className={badge} key={_id}>
      {name}
    </span>
  );
};

export default Qualitie;
