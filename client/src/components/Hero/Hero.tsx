"use client";
import React from "react";
import { useSession } from "next-auth/react";

const Hero = () => {
  const { data: session } = useSession();

  return (
    <div>
      {session?.user ? (
        <h1>Welcome {session.user.username}</h1>
      ) : (
        <h1>Not logged in</h1>
      )}
    </div>
  );
};

export default Hero;
