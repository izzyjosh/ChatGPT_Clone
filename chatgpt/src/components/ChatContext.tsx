import { useState, useContext, createContext, ReactNode } from "react";
import { setLocalStorage, getFromLocalStorage } from "../utils/localStorage.ts";
import {
  ChatMessageType,
  ChatHistoryEntry,
  SavedResponsesEntry
} from "../utils/types.ts";

type ChatContextType = {
  savedResponses: SavedResponsesEntry[];
  chatHistories: Record<string, ChatHistoryEntry>;
  currId: string | null;
  setCurrId: React.Dispatch<React.SetStateAction<string | null>>;
  loading: boolean;
  handleSave: (message: string) => void;
  handleUpdateChat: (chat: ChatMessageType[]) => void;
  handleGetChat: (chatId: string) => void;
  handleNewChat: () => void;
};

//declare the context with an initial value of undefined
const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [savedResponses, setSavedResponses] = useState<SavedResponsesEntry[]>(
    () => getFromLocalStorage("savedResponses", [])
  );
  const [chatHistories, setChatHistories] = useState<
    Record<string, ChatHistoryEntry>
  >(() => getFromLocalStorage("chatHistories", {}));
  const [currId, setCurrId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGetChat = (chatId: string) => {
    setLoading(true);
    setTimeout(() => {
      if (chatId && chatHistories[chatId]) {
        setCurrId(chatId);
      }
      setLoading(false);
    }, 1000);
  };

  const handleUpdateChat = (chats: ChatMessageType[]) => {
    const chatId = currId;

    if (!chatId) return;
    const existingChat = chatHistories[chatId];

    const updatedChat = [...chats];

    const firstUser = updatedChat.find(m => m.type === "User");
    const firstAI = updatedChat.find(m => m.type === "AI");

    const title =
      firstUser?.text?.split(" ").slice(0, 5).join(" ") || "New Chat";
    const preview =
      firstAI?.text?.split("\n").slice(0, 1).join(" ") ||
      "What's on your mind!";
    const date = new Date().toLocaleDateString("en-US", { month: "short" });

    const updatedHistory = {
      ...existingChat,
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
          id: (prev.length + 1).toString(),
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
  };
  return (
    <ChatContext.Provider
      value={{
        savedResponses,
        chatHistories,
        currId,
        setCurrId,
        loading,
        handleSave,
        handleUpdateChat,
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
