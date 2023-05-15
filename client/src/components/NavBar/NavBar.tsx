"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import "./style.scss";

const Navbar = () => {
  const { data: session } = useSession();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session || session === null) {
      setLoading(false);
    }
    console.log(session);
  }, [session]);

  return !loading ? (
    <div className="Navbar">
      {session?.user ? (
        <>
          <Link href="/">Home</Link>
          <Link href="/login" onClick={() => signOut()}>
            Logout
          </Link>
        </>
      ) : (
        <>
          <Link href="/register">Register</Link>
          <Link href="/login">Login</Link>
        </>
      )}
    </div>
  ) : (
    <div className="Navbar">Loading...</div>
  );
};

export default Navbar;
