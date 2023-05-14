"use client";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import NavBar from "../components/NavBar/NavBar";
import "./index.scss";
interface IProps {
  children: ReactNode;
  session: any;
}

export default function RootLayout({ children, session }: IProps) {
  return (
    <html lang="en">
      <body>
        <SessionProvider session={session}>
          <NavBar />
          <div>{children}</div>
        </SessionProvider>
      </body>
    </html>
  );
}
