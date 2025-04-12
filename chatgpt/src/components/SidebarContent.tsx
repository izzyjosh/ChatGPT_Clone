import { useSidebar } from "./SidebarContext";
import ChatHistory from "./ChatHistory";

const SidebarContent = () => {
  const { activeItem } = useSidebar();

  
    switch (activeItem) {
      case "chat":
        return (
          <ChatHistory
          />
        );

      default:
        return (
          <ChatHistory

          />
        );
    }
  };

  

export default SidebarContent;
