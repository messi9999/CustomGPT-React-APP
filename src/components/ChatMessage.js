import React from "react";
import AvatarMe from "../assets/avatar_me.png";
import AvatarBot from "../assets/avatar_bot.png";

export default function ChatMessage({ message }) {
  const isUserMessage = message.type === "user";

  return (
    <li className={`chat ${isUserMessage ? "outgoing" : "incoming"}`}>
      <img
        src={isUserMessage ? { AvatarMe } : { AvatarBot }}
        alt=''
        width='64'
        height='55'
      />
      <div className='message-content'>{message.text}</div>
    </li>
  );
}
