import SidebarItem from "./SidebarItem";
import logoIconUrl from "../assets/icons/logo-icon.svg";
import logoTextUrl from "../assets/icons/logo-text.svg";
import { ReactComponent as HomeIcon } from "../assets/icons/home.svg";
import { ReactComponent as CalendarIcon } from "../assets/icons/calendar.svg";
import { ReactComponent as EditIcon } from "../assets/icons/edit.svg";
import { ReactComponent as DocumentIcon } from "../assets/icons/document.svg";
import { ReactComponent as CharacterIcon } from "../assets/icons/character.svg";
import { ReactComponent as LogoutIcon } from "../assets/icons/logout.svg";

type SidebarProps = {
  activeMenu: string;
  onMenuClick: (label: string) => void;
  onLogout?: () => void;
};

const iconClass = "w-[18px] h-[18px] shrink-0";

const menus = [
  { label: "홈", icon: <HomeIcon className={iconClass} /> },
  { label: "일정 관리", icon: <CalendarIcon className={iconClass} /> },
  { label: "학습 설정", icon: <EditIcon className={iconClass} /> },
  { label: "학습 자료 관리", icon: <DocumentIcon className={iconClass} /> },
  { label: "캐릭터 설정", icon: <CharacterIcon className={iconClass} /> },
];

function Sidebar({ activeMenu, onMenuClick, onLogout }: SidebarProps) {
  return (
    <aside
      className="relative z-10 flex flex-col shrink-0 w-[232px] h-full overflow-hidden
        pt-6 pb-8 bg-neutral-100
        rounded-tr-2xl border-r-[3px] border-t-[3px] border-gradient-1/30
        shadow-[4px_0_24px_rgba(43,82,255,0.3)]"
    >
      {/* ① 로고: 가운데 정렬 */}
      <div className="flex justify-center px-6">
        <div className="flex items-end gap-1">
          <img src={logoIconUrl} alt="" className="h-[56px]" />
          <img src={logoTextUrl} alt="짝공" className="h-[50px]" />
        </div>
      </div>

      {/* ② 소개 문구: 왼쪽 정렬, 메뉴와 같은 시작점 */}
      <p className="mt-4 pl-10 pr-6 text-caption text-neutral-70">
        어디서든 함께할 수 있는
        <br />
        나만의 스터디 짝꿍
      </p>

      {/* ③ 메뉴: 왼쪽 여백 + 오른쪽이 사이드바 끝에서 잘리도록 */}
      <nav className="mt-[38px] pl-10 -mr-3 flex flex-col gap-2.5">
        {menus.map((menu) => (
          <SidebarItem
            key={menu.label}
            icon={menu.icon}
            label={menu.label}
            active={activeMenu === menu.label}
            onClick={() => onMenuClick(menu.label)}
          />
        ))}
      </nav>

      {/* ④ 로그아웃: 맨 아래로 */}
      <button
        type="button"
        onClick={onLogout}
        className="mt-auto pl-10 flex items-center gap-2 text-caption text-neutral-70"
      >
        <LogoutIcon className={iconClass} />
        로그아웃
      </button>
    </aside>
  );
}

export default Sidebar;