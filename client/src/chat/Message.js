import React from "react";
export const Message = (props) => {
  return (
    <div className="message-item">
      <div>
        <b>{props.senderName}</b>
      </div>
      <span>{props.text}</span>
    </div>
  );
};
