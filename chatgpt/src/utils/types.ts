import { Timestamp, FieldValue} from "firebase/firestore";

export type ChatMessageType = {
  id?: string;
  text: string;
  date: string;
  type: "User" | "AI";
  createdAt: Timestamp | FieldValue;
};

export interface BaseChatEntry {
  id: string | null;
  title: string;
  preview: string;
  date: string;
  type?: string;
}
export interface ChatHistoryEntry extends BaseChatEntry {
  chats: ChatMessageType[];
}

export interface SavedResponsesEntry extends BaseChatEntry {}
