import React from "react";
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

const ChatMessage = () => {
  return (
    <div className="bg-tetlight dark:bg-secdark h-full rounded-sm p-3 flex flex-col gap-4 overflow-auto">
      <div className="flex flex-col-reverse max-w-xl mx-auto flex-1 overflow-auto gap-5">
        <UserMessage />
        <AIResponse />
        <UserMessage />
        <AIResponse />
      </div>
      <div className="w-full max-w-xl mx-auto">
        <ChatEdit />
      </div>
    </div>
  );
};

const ChatEdit = () => {
  return (
    <div className="w-full flex items-center text-gray dark:text-lgaccent gap-2">
      <div className="flex flex-1 items-center bg-white dark:bg-darkaccent p-2 gap-2 rounded w-full">
        <ImMagicWand className="rounded text-light bg-lgaccent dark:bg-secdark size-8 p-2" />
        <input
          className="bg-white dark:bg-darkaccent w-full py-1 outline-0 placeholder-gray"
          type="text"
          placeholder="Ask questions or type '/' for commands"
        />
        <LuSendHorizontal className="size-8 p-1" />
      </div>
      <div className="flex justify-center items-center bg-white dark:bg-darkaccent size-12 rounded">
        <TiMicrophoneOutline className="size-8 p-1 text-center" />
      </div>
    </div>
  );
};

const UserMessage = () => {
  return (
    <div className="relative dark:text-light">
      <div className="ml-[42px]">
        <p className="text-md font-bold px-1">
          You
          <span className="text-[10px] text-gray px-3">2 Apr • 3:45PM</span>
        </p>
      </div>
      <div className="flex items-center gap-2 bg-white dark:bg-darkaccent ml-[21px] p-5 text-sm rounded-md w-fit">
        <p className="sm:text-[14px]">
          as they get a taste of it they all hot feightened
        </p>
        <FaRegEdit className="text-gray size-5" />
      </div>
      <div className="absolute top-0 left-0 size-10 p-1">
        <img className="rounded" src={joshua} alt="image placeholder" />
      </div>
    </div>
  );
};
const AIResponse = () => {
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
      <div className="bg-mint dark:bg-tetaccent ml-[21px] p-5 text-sm rounded-md inline-block">
        <p className="sm:text-[14px] dark:text-light">
          this is the new way of life for the set of new people living across
          the bridge they always think that lide is so fucking easy but as soo
          as they get a taste of it they all hot feightened
        </p>
        <div className="flex justify-between items-center mt-3">
          <div className="flex gap-3 bg-darkmint text-[12px] dark:bg-darkaccent rounded-full p-1">
            <FaRegSmile className="inline" />
            <FaRegFrown className="inline" />
          </div>
          <div className="flex justify-between text-[12px] items-center gap-3">
            <p className="text-center bg-darkmint dark:bg-darkaccent rounded-lg px-2 py-1">
              <RiLoopRightFill className="inline" />{" "}
              <span className="hidden sm:inline">Generate response</span>
            </p>
            <p className="text-center bg-darkmint dark:bg-darkaccent rounded-lg px-2 py-1">
              <MdContentCopy className="inline" />{" "}
              <span className="hidden sm:inline">Copy</span>
            </p>
            <p className="text-center bg-darkmint dark:bg-darkaccent rounded-lg px-2 py-1">
              <FaRegBookmark className="inline" />
            </p>
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
