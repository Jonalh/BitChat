"use client";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { getFriends } from "@/app/api/apiCalls";
import { useChatContext } from "@/app/context/chat";
import "./style.scss";

const Sidebar = () => {
  const { user2, setUser2 } = useChatContext();

  const { data: session, status } = useSession();
  const loading = status === "loading";
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const friends = await getFriends(session?.user.id);
        console.log(friends);
        setFriends(friends.data.friends);
      } catch (error) {
        console.error("Error fetching friends:", error);
      }
    };

    if (session?.user.id) {
      fetchFriends();
    }
  }, [session?.user.id]);

  return !loading ? (
    <div className="Sidebar">
      <div className="user">
        <p>{session?.user.username}</p>
      </div>
      <div className="chats">
        {friends.map((friend) => (
          <div key={friend._id} className="friend">
            <p onClick={() => setUser2(friend._id)}>{friend.username}</p>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <div className="Sidebar">
      <p>Loading...</p>
    </div>
  );
};

export default Sidebar;
