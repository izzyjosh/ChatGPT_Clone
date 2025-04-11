import React, { useState, useRef, useEffect } from "react";
import "highlight.js/styles/github.css";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import getGeminiResponse, {initChat } from "../utils/getGeminiResponse.ts";
import { RiMenuFold2Line } from "react-icons/ri";
import { RiChatNewLine } from "react-icons/ri";
import { LuSendHorizontal } from "react-icons/lu";
import { TiMicrophoneOutline } from "react-icons/ti";
import { ImMagicWand } from "react-icons/im";
import { FaRegSmile } from "react-icons/fa";
import { FaRegFrown } from "react-icons/fa";
import { MdContentCopy } from "react-icons/md";
import { RiLoopRightFill } from "react-icons/ri";
import { FaRegBookmark } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import chatgptLogo from "../assets/chatgptLogo.svg";
import joshua from "../assets/joshua.jpg";

const Chatbox = ({
  handleSave,
  handleSetCurrChat,
  chatHistories,
  handleNewChat,
  currChat
}) => {
  return (
    <div className="p-3 h-[100%] ">
      <Header />
      <ChatboxHeader />
      <ChatMessage
        handleSave={handleSave}
        handleSetCurrChat={handleSetCurrChat}
        chatHistories={chatHistories}
        handleNewChat={handleNewChat}
        currChat={currChat}
      />
    </div>
  );
};

const Header = () => {
  return (
    <div className="flex justify-between items-center text-sm dark:text-light p-2 sm:hidden">
      <RiMenuFold2Line />
      <h3 className="font-bold">New Chat</h3>
      <RiChatNewLine />
    </div>
  );
};

const ChatboxHeader = () => {
  return (
    <>
      <div className="sm:flex sm:justify-between hidden sm:block text-md dark:text-light text-prdark py-2">
        <h3 className="font-bold pl-3">New Chat</h3>
        <div className="flex gap-2 text-gray">
          <FaSearch className="size-6 bg-prlight dark:bg-black p-2 rounded" />
          <BsThreeDots className="size-6 bg-prlight dark:bg-black p-1 rounded" />
        </div>
      </div>
    </>
  );
};

const ChatMessage = ({
  handleSave,
  chatHistories,
  handleSetCurrChat,
  handleNewChat,
  currChat
}) => {
  const [messages, setMessages] = useState([]); // Track messages
  const [inputText, setInputText] = useState(""); // Track input text
  const [aiResponse, setAiResponse] = useState(null);
  const [currentAIResponse, setCurrentAIResponse] = useState(null);

  const chatContainerRef = useRef(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    setMessages(currChat);
  }, [currChat]);

  useEffect(() => {
    if (messages.length > 0) {
      setTimeout(scrollToBottom, 50);
    }
  }, [messages]);

  useEffect(() => {
    handleNewChat();
  }, []);

  const handleSendMessage = async () => {
    if (inputText.trim()) {
      const userMessage = {
        id: messages.length + 1,
        text: inputText,
        type: "User",
        date: new Date().toLocaleDateString("en-US", { month: "short" })
      };
      handleSetCurrChat(userMessage);
      setInputText("");

      setCurrentAIResponse({ id: userMessage.id + 1, text: "", type: "AI" });

      try {
        let fullText = ``;

        for await (const chunk of getGeminiResponse(inputText)) {
          fullText += chunk;
          setCurrentAIResponse(prev => ({ ...prev, text: fullText }));
        }
        const aiMessage = {
          id: userMessage.id + 1,
          text: fullText,
          type: "AI",
          date: new Date().toLocaleDateString("en-US", { month: "short" })
        };
        setCurrentAIResponse(null);
        handleSetCurrChat(aiMessage);
      } catch (error) {
        const errorMessage = {
          id: message.length + 1,
          text: `Sorry, something went wrong with the AI response:${error}`,
          type: "AI"
        };
        handleSetCurrChat(errorMessage);
        setCurrentAIResponse(null);
      }
    }
  };
  return (
    <div className="bg-tetlight dark:bg-secdark h-full rounded-sm p-3 flex flex-col gap-4 overflow-auto">
      <div className="flex-1 flex flex-col-reverse overflow-y-auto max-w-xl mx-auto w-full ">
        <div
          className="flex-col-reverse space-y-re verse space-y-5"
          ref={chatContainerRef}
        >
          {[...messages, ...(currentAIResponse ? [currentAIResponse] : [])].map(
            message =>
              message.type === "User" ? (
                <UserMessage key={message.id} chattext={message.text} />
              ) : (
                <AIResponse
                  key={message.id}
                  chattext={message.text}
                  handleSave={handleSave}
                />
              )
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <div className="w-full max-w-xl mx-auto">
        <ChatEdit
          inputText={inputText}
          setInputText={setInputText}
          handleSendMessage={handleSendMessage}
        />
      </div>
    </div>
  );
};

const ChatEdit = ({ inputText, setInputText, handleSendMessage }) => {
  return (
    <div className="w-full flex items-center text-gray dark:text-lgaccent gap-2">
      <div className="flex flex-1 items-center bg-white dark:bg-darkaccent p-2 gap-2 rounded w-full">
        <ImMagicWand className="rounded text-light bg-lgaccent dark:bg-secdark size-8 p-2" />
        <input
          className="bg-white dark:bg-darkaccent w-full py-1 outline-0 placeholder-gray"
          type="text"
          placeholder="Ask questions or type '/' for commands"
          value={inputText}
          onChange={e => setInputText(e.target.value)}
          onKeyDown={e => {
            if (e.key === "Enter") {
              handleSendMessage();
            }
          }}
        />
        <LuSendHorizontal
          className="size-8 p-1 cursor-pointer"
          onClick={handleSendMessage}
        />
      </div>
      <div className="flex justify-center items-center bg-white dark:bg-darkaccent size-12 rounded">
        <TiMicrophoneOutline className="size-8 p-1 text-center" />
      </div>
    </div>
  );
};

const UserMessage = ({ chattext }) => {
  return (
    <div className="relative dark:text-light">
      <div className="ml-[42px]">
        <p className="text-md font-bold px-1">
          You
          <span className="text-[10px] text-gray px-3">2 Apr • 3:45PM</span>
        </p>
      </div>
      <div className="flex items-center gap-2 bg-white dark:bg-darkaccent ml-[21px] p-5 text-sm rounded-md w-fit">
        <p className="sm:text-[14px]">{chattext}</p>
        <FaRegEdit className="text-gray size-5" />
      </div>
      <div className="absolute top-0 left-0 size-10 p-1">
        <img className="rounded" src={joshua} alt="image placeholder" />
      </div>
    </div>
  );
};
const AIResponse = ({ handleSave, chattext }) => {
  const [saved, setSaved] = useState(false);
  const [feedback, setFeedback] = useState(null); // "like" or "dislike"
  const [copied, setCopied] = useState(false);

  const message = chattext;
  const handleSaved = message => {
    handleSave(message);
    setSaved(!saved);
  };
  const handleCopy = text => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="relative w-full dark:text-light">
      <div className="flex justify-between ml-[42px] items-center">
        <p className="text-md font-bold px-1">
          Response
          <span className="text-[12px] text-gray px-3 truncate">
            2 Apr • 3:45PM
          </span>
        </p>
        <p className="text-[10px] pt-1">
          <span className="bg-seclight dark:bg-tetaccent text-black dark:text-light px-1 m-1 rounded ">
            {"<"}
          </span>
          1/3
          <span className="bg-seclight dark:bg-tetaccent text-black dark:text-light px-1 m-1 rounded ">
            {">"}
          </span>
        </p>
      </div>
      <div className="bg-mint dark:bg-tetaccent ml-[21px] p-5 text-sm rounded-md inline-block w-[calc(100%-21px)] leading-6 prose dark:prose-invert custom-prose">
        <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
          {message}
        </Markdown>
        <div className="flex justify-between items-center mt-3">
          <div className="flex gap-3 bg-darkmint text-[12px] dark:bg-darkaccent rounded-full p-1">
            <button onClick={() => setFeedback("like")}>
              {feedback === "like" ? "😊" : <FaRegSmile />}
            </button>
            <button onClick={() => setFeedback("dislike")}>
              {feedback === "dislike" ? "😞" : <FaRegFrown />}
            </button>
          </div>
          <div className="flex justify-between text-[12px] items-center gap-3">
            {" "}
            <button
              onClick={() => alert("Regenerating...")}
              className="px-2 py-1 rounded-lg bg-darkmint dark:bg-darkaccent"
            >
              <RiLoopRightFill className="inline" />{" "}
              <span className="hidden sm:inline">Generate response</span>
            </button>
            <button
              onClick={() => handleCopy(message)}
              className="px-2 py-1 rounded-lg bg-darkmint dark:bg-darkaccent"
            >
              <MdContentCopy className="inline" />{" "}
              <span className="hidden sm:inline">
                {copied ? "Copied!" : "Copy"}
              </span>
            </button>
            <button
              onClick={() => handleSaved(message)}
              disabled={saved}
              className="px-2 py-1 rounded-lg bg-darkmint dark:bg-darkaccent dark:disabled:bg-gray disabled:bg-green disabled:text-mint"
            >
              <FaRegBookmark className="inline" />
            </button>
          </div>
        </div>
      </div>
      <div className="absolute top-0 left-0">
        <img src={chatgptLogo} alt="image placeholder" />
      </div>
    </div>
  );
};

export default Chatbox;
