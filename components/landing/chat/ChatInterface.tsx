import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRocketchat } from "@fortawesome/free-brands-svg-icons";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import Style from "./style.module.css";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
}

const ChatInterface = () => {
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const messagesEndRef = useRef<HTMLUListElement>(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    setIsBotTyping(true); // Set to true when sending message

    const newMessage: Message = {
      id: Date.now(),
      text: userInput,
      sender: "user",
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/chat/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userInput }),
      });

      const data = await response.json();

      // Simulate bot typing for a few seconds
      await new Promise((resolve) => setTimeout(resolve, 500));

      const botResponse: Message = {
        id: Date.now() + 1,
        text: data.message,
        sender: "bot",
      };

      setMessages((prevMessages) => [...prevMessages, botResponse]);
    } catch (error) {
      console.error("Failed to send message:", error);
    }

    setIsBotTyping(false); // Set to false when response is received
    setUserInput(""); // Clearing the input field
  };

  return (
    <>
      <button
        onClick={() => setIsVisible(!isVisible)}
        className={Style.chatToggle}
      >
        <FontAwesomeIcon icon={faRocketchat} />
      </button>
      {isVisible && (
        <div className={Style.chatContainer}>
          <div className={Style.chatHeader}>
            <h3 className={Style.title}>Chat with us!</h3>
            <FontAwesomeIcon
              onClick={() => setIsVisible(false)}
              className={Style.chatClose}
              icon={faTimes}
            />
          </div>
          <ul ref={messagesEndRef} className={Style.messagesList}>
            {messages.map((message) => (
              <li
                key={message.id}
                className={`${Style.message} ${Style[message.sender]}`}
              >
                {message.text}
              </li>
            ))}
          </ul>
          {isBotTyping && (
            <div className={Style.typingIndicator}>
              <div className={Style.dot}></div>
              <div className={Style.dot}></div>
              <div className={Style.dot}></div>
            </div>
          )}
          <form onSubmit={sendMessage} className={Style.messageForm}>
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Type your message here..."
              className={Style.messageInput}
            />
            <button type="submit" className={Style.sendButton}>
              <FontAwesomeIcon icon={faPaperPlane} />
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default ChatInterface;
