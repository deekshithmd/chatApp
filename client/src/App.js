import React from "react";
import "./App.scss";
import { Chat } from "./chat/Chat";
import io from "socket.io-client";
const { etherium } = window;
const SERVER = "http://localhost:5000";

var socket = io(SERVER);
socket.on("connection", () => {
  console.log(`I'm connected with the back-end`);
});

console.log("Etherium",etherium)

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Chat</h1>
        <Chat />
      </header>
    </div>
  );
}

export default App;
