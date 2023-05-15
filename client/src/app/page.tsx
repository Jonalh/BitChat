import Sidebar from "@/components/Sidebar/Sidebar";
import Chat from "@/components/Chat/Chat";

export default async function Home() {
  return (
    <main>
      <Sidebar />
      <Chat />
    </main>
  );
}
