import { useSidebar } from "./SidebarContext";
import ChatHistory from "./ChatHistory";

const SidebarContent = ({ savedResponses }) => {
  const { activeItem } = useSidebar();

  const renderActiveComponent = () => {
    switch (activeItem) {
      case "chat":
        return <ChatHistory savedResponses={savedResponses}/>;

      default:
        return <ChatHistory savedResponses={savedResponses} />;
    }
  };

  return renderActiveComponent();
};

export default SidebarContent;
