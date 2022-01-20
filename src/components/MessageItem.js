import React, { useMemo } from "react";

import { observer } from "mobx-react";
import authStore from "../store/authStore";
import moment from "moment";

function MessageItem(props) {
  const time = useMemo(
    (date) => (date = moment().format("MM Do YYYY, hh:mm")),
    []
  );
  const username = useMemo(
    (data) => (data = authStore.user ? authStore.user.username : ""),
    []
  );
  return (
    // IMPORTANT NOTE FOR LINE 8
    // TO SHOW THE MSG ON THE LEFT USE THIS CLASSNAME "chat__item other"
    // TO SHOW THE MSG ON THE RIGHT USE THIS CLASSNAME "chat__item"
    <div style={{ animationDelay: `0.8s` }} className={`chat__item`}>
      <div className="chat__item__content">
        <div className="chat__msg">{props.msg}</div>
        <div className="chat__meta">
          <span>{time}</span>
        </div>
        <div className="chat__meta">
          <span>By: {username} </span>
        </div>
      </div>
      <div className="avatar">
        <div className="avatar-img">
          <img src="http://placehold.it/80x80" alt="#" />
        </div>
      </div>
    </div>
  );
}
export default observer(MessageItem);
