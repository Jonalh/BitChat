import React from "react";
import { useSession } from "next-auth/react";

const Hero = () => {
  const { data: session } = useSession();

  session?.user && console.log(session.user);

  return (
    <div>{session?.user && <h1>Welcome {session.user.user.username}</h1>}</div>
  );
};

export default Hero;
