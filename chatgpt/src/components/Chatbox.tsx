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
import ChatgptLogo from "../assets/ChatgptLogo";
import { FaRegEdit } from "react-icons/fa";


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
    <div className="flex justify-between items-center text-sm dark:text-white p-2 sm:hidden">
      <RiMenuFold2Line />
      <h3 className="font-bold">New Chat</h3>
      <RiChatNewLine />
    </div>
  );
};

const ChatboxHeader = () => {
  return (
    <>
      <div className="sm:flex sm:justify-between hidden sm:block text-md dark:text-white py-2">
        <h3 className="font-bold pl-3">New Chat</h3>
        <div>
          <RiChatNewLine />
        </div>
      </div>
    </>
  );
};

const ChatMessage = () => {
  return (
    <div className="bg-bglight dark:bg-tetdark h-full rounded-sm p-3 flex flex-col gap-4">
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
    <div className="w-full flex items-center text-[#ABABAB] dark:text-accenttext gap-2">
      <div className="flex flex-1 items-center bg-white dark:bg-accentbg p-2 gap-2 rounded w-full">
        <ImMagicWand className="rounded text-black bg-[#E7E9F0] dark:bg-tetdark size-8 p-2" />
        <input
          className="bg-white dark:bg-accentbg w-full py-1 outline-0 placeholder-[#ABABAB]"
          type="text"
          placeholder="Ask questions or type '/' for commands"
        />
        <LuSendHorizontal className="size-8 p-1" />
      </div>
      <div className="flex justify-center items-center bg-white dark:bg-accentbg size-12 rounded">
        <TiMicrophoneOutline className="size-8 p-1 text-center" />
      </div>
    </div>
  );
};

const UserMessage = () => {
  return (
    <div className="relative dark:text-white">
      <div className="ml-[42px]">
        <p className="text-md font-bold px-1">
          You
          <span className="text-[12px] text-[#9B9DA6] dark:text-[#9B9DA6] px-3">
            2 Apr • 3:45PM
          </span>
        </p>
      </div>
      <div className="flex items-center gap-2 bg-white dark:bg-accentbg ml-[21px] p-5 text-sm rounded-md w-fit">
        <p className="sm:text-[14px]">
          as they get a taste of it they all hot feightened
        </p>
        <FaRegEdit className="text-[#ABABAB] dark:text-accenttext size-5" />
      </div>
      <div className="absolute top-0 left-0 ">
        <img
          className="rounded-lg"
          src="https://placehold.co/40/"
          alt="image placeholder"
        />
      </div>
    </div>
  );
};
const AIResponse = () => {
  return (
    <div className="relative w-full dark:text-white">
      <div className="flex justify-between ml-[42px] items-center">
        <p className="text-md font-bold px-1">
          Response
          <span className="text-[12px] text-[#9B9DA6] dark:text-[#9B9DA6] px-3">
            2 Apr • 3:45PM
          </span>
        </p>
        <p className="text-[10px] pt-1">
          <span className="bg-[#E7E9F0] dark:bg-[#202633] text-[#9B9DA6] dark:text-[#868FA7] px-1 m-1 rounded ">
            {"<"}
          </span>
          1/3
          <span className="bg-[#E7E9F0] dark:bg-[#202633] text-[#9B9DA6] dark:text-[#868FA7] px-1 m-1 rounded">
            {">"}
          </span>
        </p>
      </div>
      <div className="bg-mint dark:bg-[#202633] ml-[21px] p-5 text-sm rounded-md inline-block">
        <p className="sm:text-[14px] dark:text-[#868FA7]">
          this is the new way of life for the set of new people living across
          the bridge they always think that lide is so fucking easy but as soo
          as they get a taste of it they all hot feightened
        </p>
        <div className="flex justify-between items-center mt-3">
          <div className="flex gap-3 bg-[#B0D7CD] text-[12px] dark:bg-[#4B4F5B] rounded-full p-1">
            <FaRegSmile className="inline" />
            <FaRegFrown className="inline" />
          </div>
          <div className="flex justify-between text-[12px] items-center gap-3">
            <p className="text-center bg-[#B0D7CD] dark:bg-[#4B4F5B] rounded-lg px-2 py-1">
              <RiLoopRightFill className="inline" />{" "}
              <span className="hidden sm:inline">Generate response</span>
            </p>
            <p className="text-center bg-[#B0D7CD] dark:bg-[#4B4F5B] rounded-lg px-2 py-1">
              <MdContentCopy className="inline" />{" "}
              <span className="hidden sm:inline">Copy</span>
            </p>
            <p className="text-center bg-[#B0D7CD] dark:bg-[#4B4F5B] rounded-lg px-2 py-1">
              <FaRegBookmark className="inline" />
            </p>
          </div>
        </div>
      </div>
      <div className="absolute top-0 left-0 ">
        <img
          className="rounded-lg"
          src="https://placehold.co/40/"
          alt="image placeholder"
        />
      </div>
    </div>
  );
};

export default Chatbox;
