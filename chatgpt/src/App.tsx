import { useState } from "react";
import "./App.css";
import Chatbox from "./components/Chatbox";
import { SidebarProvider } from "./components/SidebarContext";
import ChatNav from "./components/ChatNav";
import SidebarContent from "./components/SidebarContent";

function App() {
  const [savedResponses, setSavedResponses] = useState([
    { id: 1, title: "what are aliens?", date: "may", type: "Chat" },
    { id: 2, title: "how to cook?", date: "may", type: "Chat" },
    { id: 3, title: "save this", date: "april", type: "Saved" },
    { id: 4, title: "aliens invasion", date: "march", type: "Saved" }
  ]);

  const handleSave = message => {
    const trimmedTitle = message;
    const trimmedPreview = message;
    const date = new Date().toLocaleDateString("en-US", {
      month: "short",
      
    });

    setSavedResponses(prev => [
      ...prev,
      {
        id: prev.length + 1,
        title: trimmedTitle || "Untitled",
        preview: trimmedPreview || "",
        date,
        type: "Saved"
      }
    ]);
    
  };

  return (
    <>
      <SidebarProvider>
        <div className="flex bg-white dark:bg-black md:max-w-[1440px] mx-auto h-screen font-poppins">
          <div className="peer hidden sm:max-md:block bg-white dark:bg-black w-[64px] border-r border-r-seclight dark:border-r-0 h-[100%] md:w-[64px] md:block md:flex-auto">
            <ChatNav />
          </div>
          <div className="dark:bg-prdark hidden sm:max-md:absolute sm:max-md:top-0 sm:max-md:left-[64px] sm:max-md:backdrop-blur-xl sm:max-md:bg-white/30 sm:max-md:peer-hover:block sm:max-md:peer-active:block w-[310px] md:block sm:max-md:z-50 pb-2 h-[100%] md:flex-auto">
            <SidebarContent savedResponses={savedResponses} />
          </div>
          <div className="bg-white dark:bg-prdark w-full h-[100%] bg- md:flex-auto pb-9 sm:pb-10">
            <Chatbox handleSave={handleSave} />
          </div>
        </div>
      </SidebarProvider>
    </>
  );
}

export default App;
