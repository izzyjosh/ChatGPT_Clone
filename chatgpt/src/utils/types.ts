export type ChatMessageType = {
  id: number;
  text: string;
  date: string;
  type: string;
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

export interface SavedResponsesEntry extends BaseChatEntry {
  
  
}
