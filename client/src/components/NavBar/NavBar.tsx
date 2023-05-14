"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

const NavBar = () => {
  const { data: session } = useSession();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session || session === null) {
      setLoading(false);
    }
    console.log(session);
  }, [session]);

  return !loading ? (
    <div className="NavBar">
      {session?.user ? (
        <>
          <Link href="/">Home</Link>
          <button onClick={() => signOut()}>Sign out</button>
        </>
      ) : (
        <>
          <Link href="/">Home</Link>
          <br />
          <Link href="/register">Register</Link>
          <br />
          <button onClick={() => signIn()}>Sign in</button>
        </>
      )}
    </div>
  ) : (
    <p>Loading...</p>
  );
};

export default NavBar;
