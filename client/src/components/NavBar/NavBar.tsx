import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const NavBar = () => {
  const { data: session } = useSession();

  return (
    <div className="NavBar">
      {session?.user ? (
        <div>
          <Link href={"/"}>Home</Link>
          <Link href={"/login"} onClick={() => signOut()}>
            Logout
          </Link>
        </div>
      ) : (
        <div>
          <Link href={"/register"}>Register</Link>
          <Link href={"/login"}>Login</Link>
        </div>
      )}
    </div>
  );
};

export default NavBar;
