"use client";

import { createContext, useContext, useState } from "react";

const ChatContext = createContext({});

export const ChatContextProvider = ({ children }) => {
  const [user2, setUser2] = useState("");

  return (
    <ChatContext.Provider value={{ user2, setUser2 }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => useContext(ChatContext);
