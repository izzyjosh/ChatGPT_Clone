import { useState } from "react";
import "./App.css";
import Chatbox from "./components/Chatbox";
import ChatHistory from "./components/ChatHistory";
import ChatNav from "./components/ChatNav";

function App() {
  return (
    <>
      <div className="flex bg-white dark:bg-black md:max-w-[1440px] mx-auto h-[100vh]">
        <div className="peer hidden sm:max-md:block bg-inherit dark:bg-black w-[64px] border-r border-r-softgray dark:border-r-0 h-[100%] md:w-[64px] md:block md:flex-auto">
          <ChatNav />
        </div>
        <div className="dark:bg-secdark hidden sm:max-md:absolute top-0 left-[64px] sm:max-md:backdrop-blur-sm sm:max-md:bg-white/30 sm:max-md:peer-hover:block sm:max-md:peer-active:block w-[310px] md:w-[310px] h-[100%] bg-inherit md:block md:flex-auto">
          <ChatHistory />
        </div>
        <div className="dark:bg-secdark w-full h-[100%] bg-inherit md:flex-auto pb-10">
          <Chatbox />
        </div>
      </div>
    </>
  );
}

export default App;
