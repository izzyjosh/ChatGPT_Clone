import React, { useState, useEffect } from "react";
import chatgpt from "../assets/chatgpt.svg";
import { IoChatbubbleOutline } from "react-icons/io5";
import { FaCloudsmith } from "react-icons/fa";
import { FaRegCompass } from "react-icons/fa";
import { GiNestedHexagons } from "react-icons/gi";
import { IoIosLogOut } from "react-icons/io";
import joshua from "../assets/joshua.jpg";
import { FaMoon, FaSun } from "react-icons/fa";

const ChatNav = () => {
  return (
    <div className="p-2 h-full overflow-auto">
      <div className="flex flex-col h-full space-y-12 relative">
        <img className="rounded" src={chatgpt} alt="app logo" />
        <div className="flex flex-col justify-start mx-auto gap-3">
          <IoChatbubbleOutline className="bg-light text-green hover:bg-green active:bg-green hover:text-mint active:text-mint dark:bg-prdark dark:text-green dark:hover:bg-green dark:active:bg-green  dark:hover:text-mint dark:active:text-mint size-8 p-2 rounded hover:shadow-md active:shadow-md hover:shadow-green active:shadow-green" />
          <FaCloudsmith className="bg-light text-green hover:bg-green active:bg-green hover:text-mint active:text-mint dark:bg-prdark dark:text-green dark:hover:bg-green dark:active:bg-green  dark:hover:text-mint dark:active:text-mint size-8 p-2 rounded hover:shadow-md active:shadow-md hover:shadow-green active:shadow-green" />
          <FaRegCompass className="bg-light text-green hover:bg-green active:bg-green hover:text-mint active:text-mint dark:bg-prdark dark:text-green dark:hover:bg-green dark:active:bg-green  dark:hover:text-mint dark:active:text-mint size-8 p-2 rounded hover:shadow-md active:shadow-md hover:shadow-green active:shadow-green" />
          <GiNestedHexagons className="bg-light text-green hover:bg-green active:bg-green hover:text-mint active:text-mint dark:bg-prdark dark:text-green dark:hover:bg-green dark:active:bg-green  dark:hover:text-mint dark:active:text-mint size-8 p-2 rounded hover:shadow-md active:shadow-md hover:shadow-green active:shadow-green" />
        </div>
        <div className="absolute flex flex-col gap-3 divide-softgray inset-x-0 bottom-0">
          <div className="flex flex-col gap-3 mx-auto">
            <div className="size-8">
              <img className="rounded" src={joshua} alt="image placeholder" />
            </div>
            <IoIosLogOut className="bg-light text-green hover:bg-green active:bg-green hover:text-mint active:text-mint dark:bg-prdark dark:text-green dark:hover:bg-green dark:active:bg-green  dark:hover:text-mint dark:active:text-mint size-8 p-2 rounded hover:shadow-md active:shadow-md hover:shadow-green active:shadow-green" />
          </div>
          <hr className="bg-softgray my-4" />
          <div className="rounded flex justify-center">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </div>
  );
};

const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="flex flex-col gap-2 rounded-full bg-bglight dark:bg-tetdark dark:text-black w-fit p-1">
      <button className="flex items-center justify-center border-0 p-1 hover:bg-white hover:shadow-2xl active:shadow-2xl rounded-full">
        <FaMoon className="size-2" />
      </button>
      <button className="flex items-center justify-center border-0 p-1 hover:bg-white hover:shadow-2xl active:shadow-2xl rounded-full">
        <FaSun className="size-2" />
      </button>
    </div>
  );
};
export default ChatNav;
