import { useState, useEffect } from "react";
import "./App.css";
import Chatbox from "./components/Chatbox";
import { SidebarProvider } from "./components/SidebarContext";
import ChatNav from "./components/ChatNav";
import SidebarContent from "./components/SidebarContent";

//localStorage.removeItem("chatHistories");
const getFromLocalStorage = (key, fallback) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
  } catch {
    return fallback;
  }
};

const setLocalStorage = (item, chat) => {
  item === "chatHistories"
    ? localStorage.setItem("chatHistories", JSON.stringify(chat))
    : localStorage.setItem("savedResponses", JSON.stringify(chat));
};

function App() {
  const [savedResponses, setSavedResponses] = useState(() =>
    getFromLocalStorage("savedResponses", [])
  );
  const [chatHistories, setChatHistories] = useState(() =>
    getFromLocalStorage("chatHistories", {})
  );
  const [currId, setCurrId] = useState(null);
  const [currChat, setCurrChat] = useState([]);

  const [activeNav, setActiveNav] = useState({ chat: false });

  useEffect(() => {
    const id = Object.keys(chatHistories).length;
    setCurrId(id);
  }, [chatHistories]);

  useEffect(() => {
    localStorage.setItem("savedResponses", JSON.stringify(savedResponses));
  }, [savedResponses]);

  useEffect(() => {
    localStorage.setItem("chatHistories", JSON.stringify(chatHistories));
  }, [chatHistories]);

  const handleGetChat = chatId => {
    if (chatId && chatHistories[chatId]) {
      setCurrChat(chatHistories[chatId].chats);
      setCurrId(chatId);
    } else {
      setCurrChat(chatHistories[currId].chat);
    }
  };

  const handleSetCurrChat = chat => {
    setCurrChat(prev => {
      const updatedChat = [...prev, chat];

      const firstUser = updatedChat.find(m => m.type === "User");
      const firstAI = updatedChat.find(
        m => m.type === "AI" || m.type === "assistant"
      );

      // Title: First 3 words
      const title =
        firstUser?.text?.split(" ").slice(0, 5).join(" ") || "New Chat";

      // Preview: First 2 lines
      const preview =
        firstAI?.text?.split("\n").slice(0, 1).join(" ") ||
        "What's on your mind!";

      const date = new Date().toLocaleDateString("en-US", { month: "short" });

      const updatedHistory = {
        id: currId,
        title: title.trim(),
        preview: preview.trim(),
        date,
        chats: updatedChat
      };

      setChatHistories(prevHistories => {
        const newHistory = { ...prevHistories, [currId]: updatedHistory };
        setLocalStorage("chatHistories", newHistory);
        return newHistory;
      });

      return updatedChat;
    });
  };

  const handleSetActiveNav = key => {
    setActiveNav(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleSave = message => {
    const trimmed = message.trim();
    const title = trimmed.split(" ").slice(0, 3).join(" ");
    const preview = trimmed.split("\n").slice(0, 2).join(" ");
    const date = new Date().toLocaleDateString("en-US", {
      month: "short"
    });

    setSavedResponses(prev => [
      ...prev,
      {
        id: prev.length + 1,
        title: title || "Untitled",
        preview: preview || "",
        date,
        type: "Saved"
      }
    ]);
    setLocalStorage("savedResponses", savedResponses);
  };

  const handleNewChat = () => {
    const chatId = `${Object.keys(chatHistories).length + 1}`;
    const title = "New Chat";
    const preview = "What's on your mind!";
    const date = new Date().toLocaleDateString("en-US", {
      month: "short"
    });

    const newChatHistory = {
      id: chatId,
      title,
      preview,
      date,
      chats: []
    };

    setChatHistories(prev => {
      const updated = { ...prev, [chatId]: newChatHistory };
      setLocalStorage("chatHistories", updated);
      return updated;
    });
  };

  return (
    <>
      <SidebarProvider>
        <div className="flex bg-white dark:bg-black md:max-w-[1440px] mx-auto h-screen font-poppins">
          <div className="peer hidden sm:max-md:block bg-white dark:bg-black w-[64px] border-r border-r-seclight dark:border-r-0 h-[100%] md:w-[64px] md:block md:flex-auto">
            <ChatNav handleSetActiveNav={handleSetActiveNav} />
          </div>
          <div
            className={`${
              activeNav.chat ? "sm:max-md:block" : "sm:max-md:hidden"
            } dark:bg-prdark hidden sm:max-md:absolute sm:max-md:top-0 sm:max-md:left-[64px] sm:max-md:backdrop-blur-xl sm:max-md:bg-white/30 w-[310px] md:block sm:max-md:z-50 pb-2 h-[100%] md:flex-auto`}
          >
            <SidebarContent
              savedResponses={savedResponses}
              chatHistories={chatHistories}
              handleNewChat={handleNewChat}
              handleGetChat={handleGetChat}
            />
          </div>
          <div className="bg-white dark:bg-prdark w-full h-[100%] bg- md:flex-auto pb-9 sm:pb-10">
            <Chatbox
              handleSave={handleSave}
              handleSetCurrChat={handleSetCurrChat}
              chatHistories={chatHistories}
              handleNewChat={handleNewChat}
              currChat={currChat}
            />
          </div>
        </div>
      </SidebarProvider>
    </>
  );
}

export default App;
