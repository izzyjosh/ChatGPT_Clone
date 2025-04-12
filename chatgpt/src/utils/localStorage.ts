export type TChat = {
  id: string;
  title?: string;
  date: Date;
  preview: string;
  chats?: any[];
  type?: string;
};

export const getFromLocalStorage = (key: string, fallback) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
  } catch {
    return fallback;
  }
};

export const setLocalStorage = (
  item: string,
  chat: TChat[] | Record<string, TChat>
) => {
  item === "chatHistories"
    ? localStorage.setItem("chatHistories", JSON.stringify(chat))
    : localStorage.setItem("savedResponses", JSON.stringify(chat));
};
