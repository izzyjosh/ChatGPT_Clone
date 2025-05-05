import {
  useState,
  useContext,
  createContext,
  useEffect,
  ReactNode
} from "react";

import { ChatMessageType } from "../utils/types";
import { db, auth } from "../firebase.ts";
import {
  doc,
  addDoc,
  setDoc,
  updateDoc,
  getDocs,
  collection,
  query,
  limit,
  where,
  Timestamp
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

type ChatContextType = {
  currId: string | null;
  setCurrId: React.Dispatch<React.SetStateAction<string | null>>;
  userId: string | null;
  handleSave: (message: ChatMessageType) => void;
  handleUpdateChat: (chat: ChatMessageType) => void;
  handleGetChat: (chatId: string) => void;
  handleNewChat: () => void;
};

//declare the context with an initial value of undefined
const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [currId, setCurrId] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleGetChat = (chatId: string) => {
    setCurrId(chatId);
  };

  const handleUpdateChat = async (message: ChatMessageType) => {
    if (!userId || !currId) return;
    try {
      const chatDocRef = doc(db, "Users", userId, "chatHistory", currId);
      const chatCollectionRef = collection(
        db,
        "Users",
        userId,
        "chatHistory",
        currId,
        "chats"
      );
      await addDoc(chatCollectionRef, message);

      const userQuerySnap = await getDocs(
        query(chatCollectionRef, where("type", "==", "User"), limit(1))
      );
      const aiQuerySnap = await getDocs(
        query(chatCollectionRef, where("type", "==", "AI"), limit(1))
      );

      const userMessage = userQuerySnap.docs[0]?.data()?.text || "New Chat";
      const aiMessage =
        aiQuerySnap.docs[0]?.data()?.text || "What's on your mind!";

      const now = new Date();
      const createdAt = Timestamp.fromDate(now);
      const formattedDate = now.toLocaleString("en-US", {
        day: "numeric",
        month: "short",
        hour: "numeric",
        minute: "2-digit",
        hour12: true
      });
      const updatedHistory = {
        title: userMessage.split(" ").slice(0, 5).join(" ").trim(),
        preview: aiMessage.split("\n").slice(0, 1).join(" ").trim(),
        date: formattedDate,
        createdAt
      };
      await updateDoc(chatDocRef, updatedHistory);
    } catch (error: unknown) {
      if (error instanceof Error) console.log(error);
    }
  };

  const handleSave = async (message: ChatMessageType) => {
    if (!userId) return;
    try {
      const trimmed = message.text.trim();
      const title = trimmed.split(" ").slice(0, 5).join(" ");
      const preview = trimmed.split("\n")[0];

      const savedMessage = {
        title,
        preview,
        date: new Date().toLocaleDateString("en-US", { month: "short" }),
        message
      };

      const messageRef = doc(
        db,
        "Users",
        userId,
        "savedMessages",
        Date.now().toString()
      );
      await setDoc(messageRef, savedMessage);
    } catch (error) {
      if (error instanceof Error) console.log(error);
    }
  };

  const handleNewChat = async () => {
    if (!userId) return;

    try {
      const chatHistoryCollection = collection(
        db,
        "Users",
        userId,
        "chatHistory"
      );
      const now = new Date();
      const createdAt = Timestamp.fromDate(now);
      const formattedDate = now.toLocaleString("en-US", {
        day: "numeric",
        month: "short",
        hour: "numeric",
        minute: "2-digit",
        hour12: true
      });
      const newChat = {
        title: "New Chat",
        preview: "What's on your mind!",
        date: formattedDate,
        createdAt
      };

      const docRef = await addDoc(chatHistoryCollection, newChat);

      setCurrId(docRef.id);
    } catch (error: unknown) {
      if (error instanceof Error) console.log(error);
    }
  };
  return (
    <ChatContext.Provider
      value={{
        currId,
        userId,
        setCurrId,
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
