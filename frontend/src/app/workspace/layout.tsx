"use client";
import NavbarTop from "@/components/navbar/navbar";
import Sidebar from "@/components/sidebar/sidebar";

type LayoutProps = {
  title?: string;
  children: React.ReactNode;
};
export default function WorkspaceLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    tag: string;
    item: string;
  };
}) {
  return (
    <div className="flex h-screen max-h-screen flex-col overflow-hidden">
      <NavbarTop />
      <div className="flex grow overflow-hidden  flex-row ">
        <div className="w-1/3 md:w-1/6 h-full " style={{ minWidth: "260px" }}>
          <Sidebar />
        </div>
        <div className="w-2/3 md:w-5/6 h-full overflow-hidden flex flex-col bg-secondaryBG ">
          {children}
        </div>
      </div>
    </div>
  );
}
