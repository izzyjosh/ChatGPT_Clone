import React from "react";
import { RiMenuFold2Line } from "react-icons/ri";
import { RiChatNewLine } from "react-icons/ri";
import { LuSendHorizontal } from "react-icons/lu";
import { TiMicrophoneOutline } from "react-icons/ti";
import { ImMagicWand } from "react-icons/im";

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
    <div className="bg-bglight dark:bg-tetdark w-[100%] h-full rounded-sm space-y-2 pt-2">
      <div className="w-full max-w-xl mx-auto h-[86%]"></div>
      <div className="w-full max-w-xl mx-auto h-[14%] px-2">
        <ChatEdit />
      </div>
    </div>
  );
};

const ChatEdit = () => {
  return (
    <div className="flex items-center text-black dark:text-accenttext gap-2">
      <div className="flex items-center bg-white dark:bg-accentbg p-2 gap-2 w-[90%] rounded">
        <ImMagicWand className="rounded dark:bg-tetdark size-8 p-2" />
        <input
          className="bg-white dark:bg-accentbg w-full py-1 outline-0"
          type="text"
          placeholder="Ask questions or type '/' for commands"
        />
        <LuSendHorizontal className="size-8 p-1" />
      </div>
      <div className="flex justify-center items-center bg-white dark:bg-accentbg h-[48px] w-[48px] rounded">
        <TiMicrophoneOutline className=" size-8 p-1 text-center" />
      </div>
    </div>
  );
};

export default Chatbox;
