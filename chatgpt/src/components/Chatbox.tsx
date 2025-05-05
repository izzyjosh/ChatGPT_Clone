import { useState, useRef, useEffect } from "react";
import { useChat } from "./ChatContext";
import "highlight.js/styles/github.css";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import getGeminiResponse from "../utils/getGeminiResponse.ts";
import ChatSkeleton from "./ChatSkeleton";
import EmptyChat from "./EmptyChat";
import {
  RiMenuFold2Line,
  RiChatNewLine,
  RiLoopRightFill
} from "react-icons/ri";

import { LuSendHorizontal } from "react-icons/lu";
import { TiMicrophoneOutline } from "react-icons/ti";
import { ImMagicWand } from "react-icons/im";
import {
  FaRegSmile,
  FaSearch,
  FaRegEdit,
  FaRegBookmark,
  FaRegFrown
} from "react-icons/fa";
import { MdContentCopy } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";
import chatgptLogo from "../assets/chatgptLogo.svg";
import placeholder from "../assets/placeholder.jpg";
import { ChatMessageType } from "../utils/types.ts";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp
} from "firebase/firestore";
import { db } from "../firebase.ts";

const Chatbox = () => {
  return (
    <div className="p-3 h-[100%] ">
      <Header />
      <ChatboxHeader />
      <ChatMessage />
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

type MessageState = ChatMessageType[];
const ChatMessage = () => {
  const [messages, setMessages] = useState<MessageState>([]);
  const [inputText, setInputText] = useState<string>("");
  const [currentAIResponse, setCurrentAIResponse] =
    useState<ChatMessageType | null>(null);
  const [newlyAddedMessages, setNewlyAddedMessages] = useState<
    ChatMessageType[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);
  const chatContainerRef = useRef(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const { handleSave, handleUpdateChat, handleNewChat, currId, userId } =
    useChat();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    handleNewChat();
  }, []);

  useEffect(() => {
    if (userId && currId) {
      const chatCollectionRef = collection(
        db,
        "Users",
        userId,
        "chatHistory",
        currId,
        "chats"
      );
      const q = query(chatCollectionRef, orderBy("createdAt", "asc"));

      const unsubscribe = onSnapshot(q, snapshot => {
        const fetchedMessages = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as ChatMessageType[];

        setMessages(fetchedMessages);
      });

      return () => unsubscribe();
    }
  }, [userId, currId]);

  useEffect(() => {
    if (messages.length > 0) {
      setTimeout(scrollToBottom, 50);
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (inputText.trim()) {
      const now = new Date();

      const formattedDate = now.toLocaleString("en-US", {
        day: "numeric",
        month: "short",
        hour: "numeric",
        minute: "2-digit",
        hour12: true
      });

      const userMessage = {
        text: inputText,
        date: formattedDate,
        type: "User",
        createdAt: serverTimestamp()
      };
      setMessages(prev => [...prev, userMessage]);
      setInputText("");

      try {
        let fullText = "";

        setCurrentAIResponse({
          text: "",
          type: "AI",
          date: formattedDate,
          createdAt: serverTimestamp()
        });

        for await (const chunk of getGeminiResponse(inputText)) {
          fullText += chunk;
          setCurrentAIResponse(prev => ({
            ...prev!,
            text: fullText
          }));
        }

        const aiMessage = {
          text: fullText,
          type: "AI",
          date: formattedDate,
          createdAt: serverTimestamp()
        };
        setMessages(prev => [...prev, aiMessage]);
        
        handleUpdateChat(userMessage);
        handleUpdateChat(aiMessage);
        setCurrentAIResponse(null);
      } catch (error: unknown) {
        const errorMessage = {
          text: `Sorry, something went wrong with the AI response: ${error}`,
          type: "AI",
          date: formattedDate,
          createdAt
        };
        setMessages(prev => [...prev, errorMessage]);
      }
    }
  };
  return (
    <div className="bg-tetlight dark:bg-secdark h-full rounded-sm p-3 flex flex-col gap-4 overflow-auto">
      <div
        className={`${
          messages.length === 0
            ? "flex-col justify-center items-center p-4"
            : "flex-col-reverse"
        } flex-1 flex overflow-y-auto max-w-xl mx-auto w-full`}
      >
        {loading ? (
          <ChatSkeleton />
        ) : messages.length === 0 ? (
          <EmptyChat />
        ) : (
          <div className="space-y-8 space-y-reverse" ref={chatContainerRef}>
            {[
              ...messages,
              ...(currentAIResponse ? [currentAIResponse] : [])
            ].map(message =>
              message.type === "User" ? (
                <UserMessage
                  key={message.id ?? message.date + message.type}
                  chattext={message.text}
                  date={message.date}
                />
              ) : (
                <AIResponse
                  key={message.id ?? message.date + message.type}
                  chattext={message.text}
                  date={message.date}
                  handleSave={handleSave}
                />
              )
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
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

interface ChatEditProp {
  inputText: string;
  setInputText: React.Dispatch<React.SetStateAction<string>>;
  handleSendMessage: () => void;
}
const ChatEdit = ({
  inputText,
  setInputText,
  handleSendMessage
}: ChatEditProp) => {
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

interface UserMessageProp {
  chattext: string;
  date: string;
}
const UserMessage = ({ chattext, date }: UserMessageProp) => {
  return (
    <div className="relative dark:text-light mb-8">
      <div className="ml-[42px]">
        <p className="text-md font-bold px-1">
          You
          <span className="text-[10px] text-gray px-3">{date}</span>
        </p>
      </div>
      <div className="flex items-center gap-2 bg-white dark:bg-darkaccent ml-[21px] p-5 text-sm rounded-md w-fit">
        <p className="sm:text-[14px]">{chattext}</p>
        <FaRegEdit className="text-gray size-5" />
      </div>
      <div className="absolute top-0 left-0 size-10 p-1">
        <img className="rounded" src={placeholder} alt="image placeholder" />
      </div>
    </div>
  );
};

interface AIResponseProp {
  handleSave: (message: string) => void;
  chattext: string;
  date: string;
}
const AIResponse = ({ handleSave, chattext, date }: AIResponseProp) => {
  const [saved, setSaved] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  const message: string = chattext;
  const handleSaved = (message: string) => {
    handleSave(message);
    setSaved(!saved);
  };
  const handleCopy = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(err => {
        console.error("Failed to copy text: ", err);
        alert(err);
      });
  };
  return (
    <div className="relative w-full dark:text-light">
      <div className="flex justify-between ml-[42px] items-center">
        <p className="text-md font-bold px-1">
          Response
          <span className="text-[12px] text-gray px-3 truncate">{date}</span>
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
