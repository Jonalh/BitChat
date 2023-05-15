"use client";
import React, { useEffect, useState } from "react";
import { useChatContext } from "@/app/context/chat";
import "./style.scss";
import { useSession } from "next-auth/react";
import { getChat } from "@/app/api/apiCalls";

const Chat = () => {
  const { data: session, status } = useSession();
  const { user2, setUser2 } = useChatContext();
  const [chat, setChat] = useState([]);

  const loading = status === "loading";

  useEffect(() => {
    // getChat is an async function, so we need to handle it properly
    const fetchChat = async () => {
      const chatData = await getChat(session?.user.id, user2);
      setChat(chatData.data.content);
      console.log(chatData.data.content);
    };

    if (session?.user.id && user2) {
      fetchChat();
    }
  }, [session?.user.id, user2]);

  return !loading ? (
    <div className="Chat">
      {chat.map((chat) => {
        return (
          <p key={chat._id}>
            <div className="bubble">
              <div className="from">{chat.from}</div>
              <div className="message">{chat.chat}</div>
            </div>
          </p>
        );
      })}
    </div>
  ) : (
    <div className="Chat">Loading...</div>
  );
};

export default Chat;
