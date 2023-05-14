"use client";
import { useSession } from "next-auth/react";
import React from "react";
import "./style.scss";

const Sidebar = () => {
  const { data: session } = useSession();

  return (
    <div className="Sidebar">
      <div className="user">
        <p>{session?.user.username}</p>
      </div>
    </div>
  );
};

export default Sidebar;
