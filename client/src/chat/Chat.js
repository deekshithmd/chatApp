import React, { useEffect, useState } from "react";
import axios from "axios";
import { ChannelList } from "./ChannelList";
import { MessagesPanel } from "./MessagePane";
import "./chat.scss";
import io from "socket.io-client";
const socket = io.connect("http://localhost:5000");

export const Chat = () => {
  const [channels, setChannels] = useState([]);
  const [channel, setChannel] = useState();

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get("http://localhost:5000/getChannels");
        setChannels([...res.data.channels]);
        configureSocket();
      } catch (e) {
        console.log("Error occured", e);
      }
    })();
  }, [channel]);

  

  const configureSocket = () => {
    socket.on("connection", () => {
      if (channel) {
        handleChannelSelect(channel.id);
      }
    });
    socket.on("channel", (channel) => {
      channels.forEach((c) => {
        if (c.id === channel.id) {
          c.participants = channel.participants;
        }
      });
      setChannels((o) => [...o, channels]);
    });
    socket.on("message", (message) => {
      channels.forEach((c) => {
        if (c.id === message.channel_id) {
          if (!c.messages) {
            c.messages = [message];
          } else {
            c.messages.push(message);
          }
        }
      });
      setChannels((o) => [...o, channels]);
    });
  };

  const handleChannelSelect = (id) => {
    let channel = channels.find((c) => {
      return c.id === id;
    });
    setChannel(channel);
    socket.emit("channel-join", id, (ack) => {});
  };

  const handleSendMessage = (channel_id, text) => {
    socket.emit("send-message", {
      channel_id,
      text,
      senderName: socket.id,
      id: Date.now(),
    });
  };

  return (
    <div className="chat-app">
      <ChannelList channels={channels} onSelectChannel={handleChannelSelect} />
      <MessagesPanel onSendMessage={handleSendMessage} channel={channel} />
    </div>
  );
};
