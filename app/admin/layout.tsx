import Sidebar from "../components/SideBar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <div className="flex">
        <aside className="basis-[30%] min-h-screen">
          <Sidebar />
        </aside>

        <main className="basis-[70%]">
          {children}
        </main>

      </div>
  );
}
