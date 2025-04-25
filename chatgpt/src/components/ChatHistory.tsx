import React, { useState, useEffect } from "react";
import { useChat } from "./ChatContext";
import { GoPlus } from "react-icons/go";
import { BsThreeDots } from "react-icons/bs";
import { FaRegBookmark } from "react-icons/fa";
import { IoChatbubble } from "react-icons/io5";
import { BiMenuAltRight } from "react-icons/bi";
import { FaSearch } from "react-icons/fa";
import Chatgpt from "./icons/Chatgpt.tsx";
import { ChatHistoryEntry, BaseChatEntry } from "../utils/types.ts";
import { IconType } from "react-icons";
import { db } from "../firebase.ts";
import {
  collection,
  onSnapshot,
  DocumentData,
  QuerySnapshot
} from "firebase/firestore";

const ChatHistory = () => {
  const [activeChild, setActiveChild] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("Chat");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [chats, setChats] = useState<ChatHistoryEntry[]>([]);
  const [savedResponses, setSavedResponses] = useState<ChatHistoryEntry[]>([]);

  const { handleNewChat, userId } = useChat();

  useEffect(() => {
    if (!userId) return;

    const chatCollectionRef = collection(db, "users", userId, "chatHistory");
    const savedCollectionRef = collection(
      db,
      "users",
      userId,
      "savedResponses"
    );

    const unsubscribeChats = onSnapshot(
      chatCollectionRef,
      (snapshot: QuerySnapshot<DocumentData>) => {
        const chatData: ChatHistoryEntry[] = snapshot.docs.map(doc => ({
          ...(doc.data() as Omit<ChatHistoryEntry, "id">),
          id: doc.id
        }));
        setChats(chatData);
        console.log(chatData);
      }
    );

    const unsubscribeSaved = onSnapshot(
      savedCollectionRef,
      (snapshot: QuerySnapshot<DocumentData>) => {
        const savedData: ChatHistoryEntry[] = snapshot.docs.map(doc => ({
          ...(doc.data() as Omit<ChatHistoryEntry, "id">),
          id: doc.id
        }));
        setSavedResponses(savedData);
        console.log(savedResponses);
      }
    );

    return () => {
      unsubscribeChats();
      unsubscribeSaved();
    };
  }, [userId]);

  const filteredChats =
    activeTab === "Saved"
      ? savedResponses.filter(
          chat => chat.title?.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : chats.filter(
          chat => chat.title?.toLowerCase().includes(searchTerm.toLowerCase())
        );

  return (
    <div className="flex flex-col h-[100%]">
      <div className="">
        <div className="flex justify-between items-center dark:text-light py-3 px-2">
          <h3 className="text-md font-bold">My Chats</h3>
          <div className="flex items-center gap-2">
            <GoPlus
              className="size-7 bg-green rounded p-1 text-light"
              onClick={() => handleNewChat()}
            />
            <BsThreeDots className="size-6 bg-prlight dark:bg-black p-1 rounded" />
          </div>
        </div>
        <div className="flex bg-prlight dark:bg-secdark p-1 rounded-sm mx-2">
          <HistoryButton
            name="Chat"
            icon={IoChatbubble}
            data={`${chats.length}`}
            isActive={activeTab === "Chat"}
            onClick={() => setActiveTab("Chat")}
          />
          <HistoryButton
            name="Saved"
            icon={FaRegBookmark}
            data={`${savedResponses.length}`}
            isActive={activeTab === "Saved"}
            onClick={() => setActiveTab("Saved")}
          />
        </div>
        <div className="mt-3 mx-2">
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>
      </div>
      <div className="flex flex-col mt-3 overflow-auto flex-1">
        {filteredChats.length > 0 ? (
          [...filteredChats].reverse().map(chat => {
            if (!chat.id) return null;
            return (
              <History
                key={chat.id}
                chat={chat}
                isActiveChild={chat.id === activeChild}
                setActiveChild={setActiveChild}
              />
            );
          })
        ) : (
          <p className="text-center text-gray dark:text-light mt-10">
            No chats found.
          </p>
        )}
      </div>
    </div>
  );
};

interface HistoryButtonProp {
  name: string;
  icon: IconType;
  data: string;
  isActive: boolean;
  onClick: () => void;
}
const HistoryButton = ({
  name,
  icon: Icon,
  data,
  isActive,
  onClick
}: HistoryButtonProp) => {
  const baseStyle =
    "flex justify-center gap-1 items-center text-sm py-2 px-1 rounded-sm flex-1 cursor-pointer";
  const activeStyle =
    "bg-white text-green shadow-md dark:bg-black dark:text-green";
  const inactiveStyle =
    "text-dark dark:text-light hover:bg-white hover:text-green hover:shadow-xl dark:hover:bg-black dark:hover:text-green";

  return (
    <div
      className={`${baseStyle} ${isActive ? activeStyle : inactiveStyle}`}
      onClick={onClick}
    >
      <div className="flex justify-center items-center gap-1">
        <Icon />
        <p className="flex-1">{name}</p>
      </div>
      <span className="ml-3">{data}</span>
    </div>
  );
};

interface SearchProp {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}
const Search = ({ searchTerm, setSearchTerm }: SearchProp) => {
  return (
    <div className="flex justify-between items-center gap-2">
      <div className="flex flex-1 bg-prlight dark:bg-[#3F424A] dark:text-[#ABABAB] text-gray rounded p-1">
        <FaSearch className="dark:bg-secdark bg-prlight size-6 p-1" />
        <input
          className="bg-prlight outline-0 ml-2 dark:bg-secdark dark:placeholder-gray w-[150px]"
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>
      <BiMenuAltRight className="bg-prlight dark:bg-black text-green size-8 p-1 rounded" />
    </div>
  );
};

type ChatType = BaseChatEntry;
interface HistoryProp {
  chat: ChatType;
  isActiveChild: boolean;
  setActiveChild: React.Dispatch<React.SetStateAction<string | null>>;
}
const History = ({ chat, isActiveChild, setActiveChild }: HistoryProp) => {
  const { handleGetChat } = useChat();
  const handleClick = () => {
    if (!chat.id) return null;
    handleGetChat(chat.id);
    setActiveChild(chat.id);
  };
  return (
    <div
      onClick={handleClick}
      className={`flex gap-3 p-2 rounded ${
        isActiveChild
          ? "bg-mint dark:bg-black"
          : "hover:bg-mint dark:hover:bg-black"
      }`}
    >
      <div className="pt-1">
        <Chatgpt />
      </div>
      <div className="flex flex-col w-full">
        <div className="flex justify-between items-center ">
          <h5 className="text-sm font-medium text-prdark dark:text-light line-clamp-1 grow">
            {chat.title}
          </h5>
          <p className="text-gray text-[10px]">{chat.date}</p>
        </div>
        <p className="text-lgaccent text-[12px] pt-1">{chat.preview}</p>
      </div>
    </div>
  );
};

export default ChatHistory;
