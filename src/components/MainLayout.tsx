import { ReactNode } from "react";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";

type MainLayoutProps = {
  children: ReactNode;
  activeMenu: string;
  onMenuClick: (label: string) => void;
  userName: string;
  onLogout?: () => void;
};

function MainLayout({ children, activeMenu, onMenuClick, userName, onLogout }: MainLayoutProps) {
  return (
    <div className="flex h-screen bg-primary-90">
      <Sidebar activeMenu={activeMenu} onMenuClick={onMenuClick} onLogout={onLogout} />

      {/* TopBar와 내용이 같은 스크롤 상자 안에 → 오른쪽 끝이 항상 맞음 */}
      <div className="flex-1 min-w-0 overflow-y-auto">
        <TopBar userName={userName} />

        <main className="pl-7 pr-10 pb-7">{children}</main>
      </div>
    </div>
  );
}

export default MainLayout;