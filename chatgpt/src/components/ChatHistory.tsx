import React from "react";
import { GoPlus } from "react-icons/go";
import { BsThreeDots } from "react-icons/bs";
import { FaRegBookmark } from "react-icons/fa";
import { IoChatbubble } from "react-icons/io5";
import { BiMenuAltRight } from "react-icons/bi";
import { FaSearch } from "react-icons/fa";
import Chatgpt from "./icons/Chatgpt.tsx";

const ChatHistory = () => {
  return (
    <div className="flex flex-col h-[100%]">
      <div className="">
        <div className="flex justify-between items-center dark:text-light py-3 px-2">
          <h3 className="text-md font-bold">My Chats</h3>
          <div className="flex items-center gap-2">
            <GoPlus className="size-7 bg-green rounded p-1 text-light" />
            <BsThreeDots className="size-6 bg-prlight dark:bg-black p-1 rounded" />
          </div>
        </div>
        <div className="flex bg-prlight dark:bg-secdark p-1 rounded-sm mx-2">
          <HistoryButton name="Chat" icon={IoChatbubble} data="24" />
          <HistoryButton name="Saved" icon={FaRegBookmark} data="30" />
        </div>
        <div className="mt-3 mx-2">
          <Search />
        </div>
      </div>
      <div className="flex flex-col mt-3 overflow-auto flex-1">
        <History />
        <History />
        <History />
        <History />
        <History />
        <History />
      </div>
    </div>
  );
};

const HistoryButton = ({ name, icon: Icon, data }) => {
  return (
    <div className="flex justify-center gap-1 items-center text-dark dark:text-light text-sm hover:bg-white hover:text-green hover:shadow-xl active:text-green active:shadow-xl active:bg-white dark:hover:bg-black dark:hover:text-green dark:active:bg-black dark:active:text-green py-2 px-1 rounded-sm flex-1">
      <div className="flex justify-center items-center gap-1">
        <Icon />
        <p className="flex-1">{name}</p>
      </div>
      <span className="ml-3">{data}</span>
    </div>
  );
};

const Search = () => {
  return (
    <div className="flex justify-between items-center gap-2">
      <div className="flex flex-1 bg-prlight dark:bg-[#3F424A] dark:text-[#ABABAB] text-gray rounded p-1">
        <FaSearch className="dark:bg-secdark bg-prlight size-6 p-1" />
        <input
          className="bg-prlight outline-0 ml-2 dark:bg-secdark dark:placeholder-gray w-[150px]"
          type="text"
          placeholder="Search..."
        />
      </div>
      <BiMenuAltRight className="bg-prlight dark:bg-black text-green size-8 p-1 rounded" />
    </div>
  );
};

const History = () => {
  return (
    <div className="flex gap-3 p-2 hover:bg-mint dark:hover:bg-black active:bg-mint dark:active:bg-black rounded">
      <div className="pt-1">
        <Chatgpt />
      </div>
      <div>
        <div className="flex justify-between items-center">
          <h5 className="text-sm font-medium text-prdark dark:text-light">
            what are aliens?
          </h5>
          <p className="text-gray dark:text-gray text-[10px]">may</p>
        </div>
        <p className="text-lgaccent text-[12px] pt-1">
          This is just a short notice that there will be an alien invation very
          soon on eart...
        </p>
      </div>
    </div>
  );
};

export default ChatHistory;
