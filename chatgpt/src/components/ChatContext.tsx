import {
  useState,
  useEffect,
  useContext,
  createContext,
  ReactNode
} from "react";
import { setLocalStorage, getFromLocalStorage } from "../utils/localStorage.ts";
import { TChat } from "../utils/localStorage.ts";

type ChatHistoryEntry = {
  id: string | null;
  title: string;
  preview: string;
  date: string;
  chats: TChat[];
};

type ChatContextType = {
  savedResponses: TChat[];
  chatHistories: Record<string, ChatHistoryEntry>;
  currChat: TChat[];
  loading: boolean;
  handleSave: (message: string) => void;
  handleSetCurrChat: (chat: TChat[]) => void;
  handleGetChat: (chatId: string) => void;
  handleNewChat: () => void;
};

//declare the context with an initial value of undefined
const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [savedResponses, setSavedResponses] = useState<TChat[]>(() =>
    getFromLocalStorage("savedResponses", [])
  );
  const [chatHistories, setChatHistories] = useState<
    Record<string, ChatHistoryEntry>
  >(() => getFromLocalStorage("chatHistories", {}));
  const [currId, setCurrId] = useState<string | null>(null);
  const [currChat, setCurrChat] = useState<TChat[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem("chatHistories", JSON.stringify(chatHistories));
    localStorage.setItem("savedResponses", JSON.stringify(savedResponses));
    const id = Object.keys(chatHistories).length.toString();
    setCurrId(id);
  }, [chatHistories, savedResponses]);

  const handleGetChat = (chatId: string) => {
    setLoading(true);
    setTimeout(() => {
      if (chatId && chatHistories[chatId]) {
        setCurrChat(chatHistories[chatId].chats);
        setCurrId(chatId);
      } else if (chatHistories[currId]) {
        setCurrChat(chatHistories[currId].chats);
      }
      setLoading(false);
    }, 1000);
  };

  const handleSetCurrChat = (chat: TChat) => {
    const newId = !currId ? `${Object.keys(chatHistories).length + 1}` : currId;

    const currChat = chatHistories[chatId];

    const updatedChat = [...currChat, chat];

    const firstUser = updatedChat.find(m => m.type === "User");
    const firstAI = updatedChat.find(
      m => m.type === "AI" || m.type === "assistant"
    );

    const title =
      firstUser?.text?.split(" ").slice(0, 5).join(" ") || "New Chat";
    const preview =
      firstAI?.text?.split("\n").slice(0, 1).join(" ") ||
      "What's on your mind!";
    const date = new Date().toLocaleDateString("en-US", { month: "short" });

    const updatedHistory = {
      id: newId,
      title: title.trim(),
      preview: preview.trim(),
      date,
      chats: updatedChat
    };

    setChatHistories(prevHistories => {
      const newHistory = { ...prevHistories, [newId]: updatedHistory };
      setLocalStorage("chatHistories", newHistory);
      return newHistory;
    });
  };

  const handleSave = (message: string) => {
    const trimmed = message.trim();
    const title = trimmed.split(" ").slice(0, 5).join(" ");
    const preview = trimmed.split("\n").slice(0, 1).join(" ");
    const date = new Date().toLocaleDateString("en-US", {
      month: "short"
    });

    setSavedResponses(prev => {
      const newSavedResponse = [
        ...prev,
        {
          id: prev.length + 1,
          title: title || "Untitled",
          preview: preview || "",
          date,
          type: "Saved"
        }
      ];
      setLocalStorage("savedResponses", newSavedResponse);
      return newSavedResponse;
    });
  };

  const handleNewChat = () => {
    const chatId = `${Object.keys(chatHistories).length + 1}`;
    const title = "New Chat";
    const preview = "What's on your mind!";
    const date = new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric"
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
    setCurrId(chatId);
    handleGetChat(chatId);
  };
  return (
    <ChatContext.Provider
      value={{
        savedResponses,
        chatHistories,
        currChat,
        loading,
        handleSave,
        handleSetCurrChat,
        handleGetChat,
        handleNewChat
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used inside a ChatProvider");
  }

  return context;
};
