import React, { useState, useEffect } from "react";
import { useSidebar } from "./SidebarContext";
import chatgpt from "../assets/chatgpt.svg";
import { IoChatbubbleOutline } from "react-icons/io5";
import { FaCloudsmith } from "react-icons/fa";
import { FaRegCompass } from "react-icons/fa";
import { GiNestedHexagons } from "react-icons/gi";
import { IoIosLogOut } from "react-icons/io";
import joshua from "../assets/joshua.jpg";
import { FaMoon, FaSun } from "react-icons/fa";

const ChatNav = ({ handleSetActiveNav }) => {
  const { activeItem, setActiveItem } = useSidebar();

  const getIconClasses = (name: string) =>
    `size-8 p-2 rounded transition-all
     ${
       activeItem === name
         ? "bg-green text-mint shadow-md"
         : "bg-light text-green hover:bg-green hover:text-mint dark:bg-prdark"
     }
    `;
  const handleClick = (navItem: string) => {
    handleSetActiveNav(navItem);
    setActiveItem(navItem);
  };
  return (
    <div className="p-2 h-full overflow-auto">
      <div className="flex flex-col h-full space-y-12 relative">
        <img className="rounded" src={chatgpt} alt="app logo" />
        <div className="flex flex-col justify-start mx-auto gap-3">
          <IoChatbubbleOutline
            className={getIconClasses("chat")}
            onClick={() => handleClick("chat")}
          />
          <FaCloudsmith
            className={getIconClasses("cloud")}
            onClick={() => handleClick("cloud")}
          />
          <FaRegCompass
            className={getIconClasses("compass")}
            onClick={() => handleClick("compass")}
          />
          <GiNestedHexagons
            className={getIconClasses("hex")}
            onClick={() => handleClick("hex")}
          />
        </div>
        <div className="absolute flex flex-col gap-3 divide-softgray inset-x-0 bottom-0">
          <div className="flex flex-col gap-3 mx-auto">
            <div className="size-8 relative">
              <img
                className="rounded-xl"
                src={joshua}
                alt="image placeholder"
              />
              <p className="px-1 text-[8px] text-center bg-prlight text-black dark:bg-white rounded-md absolute -bottom-1 left-1">
                pro
              </p>
            </div>

            <IoIosLogOut className="bg-light text-green hover:bg-green active:bg-green hover:text-mint active:text-mint dark:bg-prdark dark:text-green dark:hover:bg-green dark:active:bg-green  dark:hover:text-mint dark:active:text-mint size-8 p-2 rounded hover:shadow-md active:shadow-md hover:shadow-green active:shadow-green" />
          </div>
          <hr className="text-seclight dark:text-secdark my-4" />
          <div className="rounded flex justify-center">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </div>
  );
};

const ThemeToggle: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    const shouldUseDark = savedTheme === "dark" || (!savedTheme && prefersDark);

    setIsDarkMode(shouldUseDark);
    document.documentElement.classList.toggle("dark", shouldUseDark);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
    document.documentElement.classList.toggle("dark", newTheme);
  };

  // Handles code snippet dark or light mode
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = isDarkMode
      ? "https://cdn.jsdelivr.net/npm/highlight.js@11.8.0/styles/github-dark.css"
      : "https://cdn.jsdelivr.net/npm/highlight.js@11.8.0/styles/github.css";
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, [isDarkMode]);
  return (
    <div className="flex flex-col gap-2 rounded-lg bg-prlight dark:bg-secdark dark:text-light w-fit p-1">
      <button
        onClick={() => !isDarkMode && toggleTheme()}
        aria-label="Enable dark mode"
        className={`flex items-center justify-center p-2 rounded-full transition-colors duration-200
          ${
            isDarkMode
              ? "bg-darkaccent text-white shadow-md"
              : "bg-prlight hover:bg-white dark:bg-secdark dark:hover:bg-darkaccent"
          }
        `}
      >
        <FaMoon className="size-2" />
      </button>
      <button
        onClick={() => isDarkMode && toggleTheme()}
        aria-label="Enable light mode"
        className={`flex items-center justify-center p-2 rounded-full transition-colors duration-200
          ${
            !isDarkMode
              ? "bg-white text-yellow-500 shadow-md"
              : "bg-prlight hover:bg-white dark:bg-secdark dark:hover:bg-darkaccent"
          }
        `}
      >
        <FaSun className="size-2" />
      </button>
    </div>
  );
};
export default ChatNav;
