import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const NavBar = () => {
  const { data: session } = useSession();
  console.log({ session });

  return (
    <div className="NavBar">
      <Link href={"/"}>Home</Link>

      <Link href={"/register"}>Register</Link>

      <Link href={"/login"}>Login</Link>
      <div>
        {session?.user ? (
          <>
            <p className="text-sky-600"> {session.user.username}</p>
            <button className="text-red-500" onClick={() => signOut()}>
              Sign Out
            </button>
          </>
        ) : (
          <button className="text-green-600" onClick={() => signIn()}>
            Sign In
          </button>
        )}
      </div>
    </div>
  );
};

export default NavBar;
