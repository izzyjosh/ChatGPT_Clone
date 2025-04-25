import { useState } from "react";
import Chatbox from "../components/Chatbox";
import { SidebarProvider } from "../components/SidebarContext";
import ChatNav from "../components/ChatNav";
import SidebarContent from "../components/SidebarContent";
import { ChatProvider } from "../components/ChatContext";

const Dashboard = () => {
  const [activeNav, setActiveNav] = useState<Record<string, boolean>>({
    chat: false
  });

  const handleSetActiveNav = (key: string) => {
    setActiveNav(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };
  return (
    <>
      <ChatProvider>
        <SidebarProvider>
          <div className="flex bg-white dark:bg-black md:max-w-[1440px] mx-auto h-screen font-poppins transition-colors duration-500">
            <div className="peer hidden sm:max-md:block bg-white dark:bg-black w-[64px] border-r border-r-seclight dark:border-r-0 h-[100%] md:w-[64px] md:block md:flex-auto transition-colors duration-500">
              <ChatNav handleSetActiveNav={handleSetActiveNav} />
            </div>
            <div
              className={`${
                activeNav.chat ? "sm:max-md:block" : "sm:max-md:hidden"
              } dark:bg-prdark hidden sm:max-md:absolute sm:max-md:top-0 sm:max-md:left-[64px] sm:max-md:backdrop-blur-xl sm:max-md:bg-white/30 w-[310px] md:block sm:max-md:z-50 pb-2 h-[100%] md:flex-auto transition-colors duration-500`}
            >
              <SidebarContent />
            </div>
            <div className="bg-white dark:bg-prdark w-full h-[100%] transition-colors duration-500 md:flex-auto pb-9 sm:pb-10">
              <Chatbox />
            </div>
          </div>
        </SidebarProvider>
      </ChatProvider>
    </>
  );
};

export default Dashboard;
