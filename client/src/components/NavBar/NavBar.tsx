"use client";
import React from "react";
import Link from "next/link";
import { signIn, signOut } from "next-auth/react";

const NavBar = () => {
  return (
    <div className="NavBar">
      <Link href="/">Home</Link>
      <br />
      <Link href="/register">Register</Link>
      <br />
      <button onClick={() => signIn()}>Sign in</button>
    </div>
  );
};

export default NavBar;
