import React from "react";
import ChatSpinLogo from "../assets/ChatSpinLogo.svg";

const EmptyChat = () => {
  return (
    <div className="flex flex-col gap-6 justify-center items-center h-[250px] w-[250px] bg-white dark:bg-secdark text-black dark:text-light font-bold text-lg shadow-drop dark:shadow-drop-dark rounded-2xl">
      <img src={ChatSpinLogo} alt="chat spin logo " className="animate-spin" />
      <h3>What Can I Help With?</h3>
    </div>
  );
};

export default EmptyChat;
