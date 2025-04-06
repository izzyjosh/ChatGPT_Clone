import React from "react";
import { GoPlus } from "react-icons/go";
import { BsThreeDots } from "react-icons/bs";
import { FaRegBookmark } from "react-icons/fa";
import { IoChatbubble } from "react-icons/io5";
import { BiMenuAltRight } from "react-icons/bi";
import { FaSearch } from "react-icons/fa";

const ChatHistory = () => {
  return (
    <div>
      <div className="flex justify-between items-center dark:text-white py-3 px-2">
        <h3 className="text-md font-bold">My Chats</h3>
        <div className="flex items-center gap-2">
          <GoPlus className="size-7 bg-green rounded p-1 text-white" />
          <BsThreeDots className="size-6 bg-bglight dark:bg-black p-1 rounded" />
        </div>
      </div>
      <div className="grid grid-flow-col justify-stretch bg-bglight dark:bg-tetdark p-1 rounded-sm ml-2">
        <HistoryButton name="Chat" icon={IoChatbubble} data="24" />
        <HistoryButton name="Saved" icon={FaRegBookmark} data="30" />
      </div>
      <div>
      <Search/>
      </div>
    </div>
  );
};

const HistoryButton = ({ name, icon: Icon, data }) => {
  return (
    <div className="flex justify-center gap-3 items-center text-[#9B9DA6] dark:text-white text-sm hover:bg-white hover:text-green hover:shadow-xl active:text-green active:shadow-xl active:bg-white dark:hover:bg-black dark:hover:text-green dark:active:bg-black dark:active:text-green py-2 px-1 rounded-sm">
      <Icon />
      <p className="flex-1">
        {name} <span className="ml-3">{data}</span>
      </p>
    </div>
  );
};

const Search = () => {
  return (
    <div>
      <div>
        <FaSearch />
        <input type="text" placeholder="Search..." />
      </div>
      <BiMenuAltRight />
    </div>
  );
};

export default ChatHistory;
