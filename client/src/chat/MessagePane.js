import React, { useState } from "react";
import { Message } from "./Message";
export const MessagesPanel = (props) => {
  const [input, setInput] = useState("");

  let list = (
    <div className="no-content-message">There is no messages to show</div>
  );
  if (props.channel && props.channel.messages) {
    list = props.channel.messages.map((m) => (
      <Message key={m.id} id={m.id} senderName={m.senderName} text={m.text} />
    ));
  }

  const send = () => {
    if (input !== "") {
      props.onSendMessage(props.channel.id, input);
      setInput("");
    }
  };

  return (
    <div className="messages-panel">
      <div className="meesages-list">
        {list}
        {props.channel && (
          <div className="messages-input">
            <input
              type="text"
              onChange={(e) => setInput(e.target.value)}
              value={input}
            />
            <button onClick={send}>Send</button>
          </div>
        )}
      </div>
    </div>
  );
};
