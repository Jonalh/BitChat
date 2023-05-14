// Components
import NavBar from "@/components/NavBar/NavBar";
import "./index.scss";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
