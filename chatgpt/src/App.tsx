import { useState } from "react";
import "./App.css";
import Chatbox from "./components/Chatbox";
import ChatHistory from "./components/ChatHistory";
import ChatNav from "./components/ChatNav";

function App() {
  return (
    <>
      <div className="flex bg-white dark:bg-black md:max-w-[1440px] mx-auto h-screen font-poppins">
        <div className="peer hidden sm:max-md:block bg-white dark:bg-black w-[64px] border-r border-r-gray dark:border-r-0 h-[100%] md:w-[64px] md:block md:flex-auto">
          <ChatNav />
        </div>
        <div className="dark:bg-prdark hidden sm:max-md:absolute sm:max-md:top-0 sm:max-md:left-[64px] sm:max-md:backdrop-blur-xl sm:max-md:bg-white/30 sm:max-md:peer-hover:block sm:max-md:peer-active:block w-[310px] md:block sm:max-md:z-50 pb-2 h-[100%] md:flex-auto">
          <ChatHistory />
        </div>
        <div className="bg-white dark:bg-prdark w-full h-[100%] bg- md:flex-auto pb-9 sm:pb-10">
          <Chatbox />
        </div>
      </div>
    </>
  );
}

export default App;
