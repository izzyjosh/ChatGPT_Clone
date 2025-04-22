
export const getFromLocalStorage = (key: string, fallback: [] | {}) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
  } catch {
    return fallback;
  }
};

export const setLocalStorage = <T>(item: string, chat: T): void => {
  item === "chatHistories"
    ? localStorage.setItem("chatHistories", JSON.stringify(chat))
    : localStorage.setItem("savedResponses", JSON.stringify(chat));
};
