import { useSidebar } from "./SidebarContext";
import ChatHistory from "./ChatHistory";

const SidebarContent = ({
  savedResponses,
  chatHistories,
  handleNewChat,
  handleGetChat
}) => {
  const { activeItem } = useSidebar();

  const renderActiveComponent = () => {
    switch (activeItem) {
      case "chat":
        return (
          <ChatHistory
            savedResponses={savedResponses}
            chatHistories={chatHistories}
            handleNewChat={handleNewChat}
            handleGetChat={handleGetChat}
          />
        );

      default:
        return (
          <ChatHistory
            savedResponses={savedResponses}
            chatHistories={chatHistories}
            handleNewChat={handleNewChat}
            handleGetChat={handleGetChat}
          />
        );
    }
  };

  return renderActiveComponent();
};

export default SidebarContent;
