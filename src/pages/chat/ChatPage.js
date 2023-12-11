import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import ChatMessage from "components/ChatMessage";

import { ReactComponent as SendMsgIcon } from "assets/icons/sendmsg.svg";

function LoadingButton() {
  return (
    <div className='flex space-x-2 justify-right items-center bg-transparent h-[2rem] dark:invert'>
      <span className='sr-only'>Loading...</span>
      <div className='h-2 w-2 bg-[#f1d297] rounded-full animate-bounce [animation-delay:-0.3s]'></div>
      <div className='h-2 w-2 bg-[#f1d297] rounded-full animate-bounce [animation-delay:-0.15s]'></div>
      <div className='h-2 w-2 bg-[#f1d297] rounded-full animate-bounce'></div>
    </div>
  );
}

export default function ChatPage() {
  const BASE_URL = process.env.REACT_APP_ENDPOINT;
  const [chatHistory, setChatHistory] = useState([
    {
      type: "",
      text: ""
    }
  ]);
  const [userMessage, setUserMessage] = useState("");
  const [isEditable, setIsEditable] = useState(false);

  const textareaRef = useRef(null);
  const scrollingDivRef = useRef(null);

  useEffect(() => {
    const div = scrollingDivRef.current;
    const scrollStep = 8; // Adjust this value for faster or slower scrolling
    const scrollInterval = 10; // Time in milliseconds between each scroll step

    const scrollIntervalID = setInterval(() => {
      // Check if we've reached the bottom
      if (div.scrollTop + div.clientHeight >= div.scrollHeight) {
        clearInterval(scrollIntervalID); // Stop scrolling when the bottom is reached
      } else {
        div.scrollTop += scrollStep;
      }
    }, scrollInterval);

    // Clear interval on component unmount
    return () => clearInterval(scrollIntervalID);
  }, [chatHistory]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      if (isEditable && userMessage !== "") {
        handleSendMessage();
      }
    }
  };

  const handleTextAreaChange = (e) => {
    setUserMessage(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.hei6ght = `${textareaRef.current.scrollHeight}px`;
    }
    if (e.target.value !== "") {
      if (!isEditable) {
        setIsEditable(true);
      }
    } else {
      setIsEditable(false);
    }
  };

  const appendChatHistory = (newMessage) => {
    setChatHistory((prevChatHistory) => [...prevChatHistory, newMessage]);
  };
  const handleSendMessage = async () => {
    console.log("Sending...");

    setIsEditable(false);
    var newMessage = {
      type: "user",
      text: userMessage
    };
    appendChatHistory(newMessage);

    //Endpoint request here.
    const reqBody = {
      message: userMessage
    };
    const response = await axios.post(BASE_URL, reqBody);
    var chatBotMsg = response.data.message;

    // var chatBotMsg = `I'm sorry to hear you're experiencing a stomachache. Discomfort can have many causes and may be related to a range of factors including diet, stress, or a medical condition. As a virtual PCOS practitioner, I can offer some general advice, but keep in mind it's always important to consult a healthcare professional for personalized medical advice, especially if the pain is severe, persistent, or accompanied by other symptoms.\n
    // \n
    // Here are a few general suggestions that may help alleviate a stomachache:\n
    // \n
    // 1. **Rest and Relaxation**: Sometimes, stress can contribute to stomach discomfort. Engage in some relaxation techniques like deep breathing, meditation, or gentle yoga.\n
    // \n
    // 2. **Heat Therapy**: Applying a warm (not hot) heating pad to your stomach may help relax muscles and relieve cramps or discomfort.\n
    // \n
    // 3. **Hydration**: Ensure you’re drinking enough water throughout the day. Dehydration can lead to digestive issues.\n
    // \n
    // 4. **Dietary Adjustments**: If you've eaten something that doesn't agree with you, consider eating mild, bland foods like rice, bananas, or toast until your stomach settles. Avoid greasy, spicy, or heavy foods temporarily.\n
    // \n
    // 5. **Peppermint or Ginger**: These natural remedies can sometimes help to ease digestive discomfort. They can be taken as teas, capsules, or even in natural form.\n
    // \n
    // 6. **Monitor Symptoms**: Keep track of any additional symptoms and what you ate to help identify any food sensitivities or triggers.\n
    // \n
    // If you're dealing with PCOS, some women find that certain foods can trigger their symptoms, including stomach discomfort. Paying attention to how different foods affect you and making adjustments accordingly can be helpful. However, if your stomachache persists or worsens, it's crucial to seek medical attention.\n
    // \n
    // url is http://localhost:3000/chat\n
    // Do you think your stomachache could be related to a specific food or a symptom of PCOS, or is there anything else that may have triggered it?\n`;

    newMessage = {
      type: "chatbot",
      text: chatBotMsg
    };
    setUserMessage("");
    appendChatHistory(newMessage);
    setIsEditable(true);
  };

  return (
    <div className='flex flex-row min-h-screen w-screen bg-[#f7f2e9]'>
      <div className='pt-12 w-screen flex justify-center'>
        <div className='relative w-[40vw] min-w-[600px]'>
          <div className='absolute top-0 w-full h-[50px] bg-opacity-gradient'></div>
          <div
            className=' h-[85vh] max-h-[80vh] overflow-y-auto scrollbar-thumb scrollbar-track'
            ref={scrollingDivRef}>
            <ul>
              {chatHistory.map((msg, index) => (
                <ChatMessage key={index} message={msg} />
              ))}
              {!isEditable && chatHistory.length > 1 && <LoadingButton />}
            </ul>
          </div>
          <div className='mt-5 flex justify-content-center align-items-end w-full h-auto bg-[#fcf7f1] rounded-xl border-2 border-[#f1e3ca]'>
            <textarea
              ref={textareaRef}
              className='sm:w-full md:w-full sm:m-0 md:m-4 min-h-[20px] border-none focus:outline-none focus:ring-0 resize-none bg-[#fcf7f1]'
              rows={1}
              placeholder='Type your Message'
              spellCheck='true'
              required
              autoFocus
              value={userMessage}
              onKeyDown={handleKeyDown}
              onChange={(e) => handleTextAreaChange(e)}></textarea>
            <button
              className='px-1'
              disabled={!isEditable || userMessage === ""}
              onClick={handleSendMessage}>
              <SendMsgIcon
                className={`rounded-[36px] ${
                  !isEditable || userMessage === ""
                    ? "bg-slate-400"
                    : "bg-[#16a34a]"
                }`}
              />
            </button>
          </div>
          <div>@Copywrite</div>
        </div>
      </div>
    </div>
  );
}
