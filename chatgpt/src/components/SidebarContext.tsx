import { createContext, useContext, useState, ReactNode } from "react";

export type SidebarItem = "chat" | "cloud" | "compass" | "hex";

type SidebarContextType = {
  activeItem: SidebarItem;
  setActiveItem: React.Dispatch<React.SetStateAction<SidebarItem>>;
};

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
  const [activeItem, setActiveItem] = useState<SidebarItem>("chat");

  return (
    <SidebarContext.Provider value={{ activeItem, setActiveItem }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context)
    throw new Error("useSidebar must be used within SidebarProvider");
  return context;
};
