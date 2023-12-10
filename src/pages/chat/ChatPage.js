import React, { useEffect, useRef, useState } from "react";
import ChatMessage from "../../components/ChatMessage";

import { ReactComponent as SendMsgIcon } from "../../assets/icons/sendmsg.svg";
import { ReactComponent as StopMsgIcon } from "../../assets/icons/stopmsg.svg";
import chatlogo from "../../assets/logo.png";

export default function ChatPage() {
  const [chatHistory, setChatHistory] = useState([]);
  const [userMessage, setUserMessage] = useState("");
  const [isEditable, setIsEditable] = useState(false);

  const textareaRef = useRef(null);

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  const handleTextAreaChange = (e) => {
    setUserMessage(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const appendChatHistory = (newMessage) => {
    setChatHistory((prevChatHistory) => [...prevChatHistory, newMessage]);
  };
  const handleSendMessage = async () => {
    console.log("Sending...");
    console.log(userMessage);
    setIsEditable(false);
    const newMessage = {
      type: "user",
      text: userMessage
    };
    appendChatHistory(newMessage);
    setUserMessage("");
  };

  return (
    <div className='flex flex-col bg-[]'>
      <div className='h-[10vh'>
        <img src={chatlogo} alt='Logo' />
      </div>
      <div className='flex flex-row h-[91vh] w-screen'>
        <div className='hidden lg:block w-0 md:w-1/5 bg-transparent lg:min-w-[300px]'>
          Hello
        </div>
        <div className='sm:w-screen md:w-4/5 bg-[#f8fafc] flex justify-center'>
          <div className='relative min-w-[400px] w-[90%] lg:block lg:min-w-[700px] lg:max-w-[800px]'>
            {/* <ul>
            {chatHistory.map((msg, index) => (
              <ChatMessage key={index} message={msg} />
            ))}
          </ul> */}
            <div className='absolute top-[80vh] flex justify-center w-full h-auto bg-white rounded-xl border-2 border-violet-950'>
              <textarea
                ref={textareaRef}
                className='sm:w-full md:w-full sm:m-0 md:m-2 min-h-[30px] border-none focus:outline-none focus:ring-0 resize-none'
                placeholder='Send a Message'
                spellCheck='true'
                required
                autoFocus
                value={userMessage}
                onKeyDown={handleKeyDown}
                onChange={(e) => handleTextAreaChange(e)}></textarea>
              {isEditable ? (
                <button onClick={handleSendMessage}>
                  <SendMsgIcon />
                </button>
              ) : (
                <button onClick={setIsEditable(true)}>
                  <StopMsgIcon />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
