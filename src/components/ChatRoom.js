import React, { useState } from "react";
import { useParams } from "react-router-dom";
import MessageItem from "./MessageItem";
import roomStore from "../store/roomStore";
import { observer } from "mobx-react";

function ChatRoom() {
  const roomSlug = useParams().roomSlug;
  const [msg, setMsg] = useState({ msg: "" });
  if (roomStore.rooms.length === 0) {
    return <h1>loading</h1>;
  }
  const room = roomStore.rooms.find((room) => room.slug === roomSlug);
  const messagesList = room.messages.map((msg) => {
    return <MessageItem msg={msg.msg} key={msg.id} />;
  });

  const handleChange = (event) => {
    setMsg({ ...msg, [event.target.name]: event.target.value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    roomStore.createNewMessage(msg, room);
    setMsg({ msg: "" });
  };

  return (
    <div className="main__chatcontent">
      <div className="content__header">
        <div className="blocks">
          <div className="current-chatting-user">
            <div className="avatar">
              <div className="avatar-img">
                <img src={room.image} alt="#" />
              </div>
            </div>
            <p>{room.title}</p>
          </div>
        </div>
      </div>
      <div className="content__body">
        <div className="chat__items">{messagesList}</div>
      </div>
      <div className="content__footer">
        <div className="sendNewMessage">
          <button className="addFiles">
            <i className="fa fa-plus"></i>
          </button>
          <input
            type="text"
            name="msg"
            value={msg.msg}
            onChange={handleChange}
            placeholder="Type a message here"
          />
          <button className="btnSendMsg" onClick={handleSubmit} id="sendMsgBtn">
            <i className="fa fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
export default observer(ChatRoom);
