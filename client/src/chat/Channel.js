import React from "react";
export const Channel = (props) => {
  return (
    <div className="channel-item" onClick={() => props.onSelect(props.id)}>
      <div>{props.name}</div>
      <span>{props.participants}</span>
    </div>
  );
};
