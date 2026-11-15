import SidebarItem from "./SidebarItem";
import logoIconUrl from "../assets/icons/logo-icon.svg";
import logoTextUrl from "../assets/icons/logo-text.svg";
import { ReactComponent as HomeIcon } from "../assets/icons/home.svg";
import { ReactComponent as CalendarIcon } from "../assets/icons/calendar.svg";
import { ReactComponent as EditIcon } from "../assets/icons/edit.svg";
import { ReactComponent as DocumentIcon } from "../assets/icons/document.svg";
import { ReactComponent as CharacterIcon } from "../assets/icons/character.svg";
import { ReactComponent as LogoutIcon } from "../assets/icons/logout.svg";
// 선택된 메뉴용 채워진 아이콘
import { ReactComponent as HomeActiveIcon } from "../assets/icons/home-selected.svg";
import { ReactComponent as CalendarActiveIcon } from "../assets/icons/date-range.svg";
import { ReactComponent as EditActiveIcon } from "../assets/icons/edit-square.svg";
import { ReactComponent as DocumentActiveIcon } from "../assets/icons/assignment.svg";
import { ReactComponent as CharacterActiveIcon } from "../assets/icons/settings-account-box.svg";

type SidebarProps = {
  activeMenu: string;
  onMenuClick: (label: string) => void;
  onLogout?: () => void;
};

const iconClass = "w-[18px] h-[18px] shrink-0";
// 채워진 아이콘은 원본(24px)에 여백이 있어 조금 크게 그리고, 음수 여백으로 글씨 위치는 그대로 유지
const activeIconClass = "w-[21px] h-[21px] -m-[1.5px] shrink-0";

const menus = [
  {
    label: "홈",
    icon: <HomeIcon className={iconClass} />,
    activeIcon: <HomeActiveIcon className={activeIconClass} />,
  },
  {
    label: "일정 관리",
    icon: <CalendarIcon className={iconClass} />,
    activeIcon: <CalendarActiveIcon className={activeIconClass} />,
  },
  {
    label: "학습 설정",
    icon: <EditIcon className={iconClass} />,
    activeIcon: <EditActiveIcon className={activeIconClass} />,
  },
  {
    label: "학습 자료 관리",
    icon: <DocumentIcon className={iconClass} />,
    activeIcon: <DocumentActiveIcon className={activeIconClass} />,
  },
  {
    label: "캐릭터 설정",
    icon: <CharacterIcon className={iconClass} />,
    activeIcon: <CharacterActiveIcon className={activeIconClass} />,
  },
];

function Sidebar({ activeMenu, onMenuClick, onLogout }: SidebarProps) {
  return (
    <aside
      className="relative z-10 flex flex-col shrink-0 w-[232px] h-full overflow-hidden
        pt-6 pb-8 bg-neutral-100
        rounded-tr-2xl
        shadow-[0_0_10px_0_#2B52FF]"
    >
      {/* ① 로고: 가운데 정렬 */}
      <div className="flex justify-center px-6">
        <div className="flex items-end gap-1">
          <img src={logoIconUrl} alt="" className="h-[56px]" />
          <img src={logoTextUrl} alt="짝공" className="h-[50px]" />
        </div>
      </div>

      {/* ② 소개 문구: 왼쪽 정렬, 메뉴와 같은 시작점 */}
      <p className="mt-4 pl-10 pr-6 text-caption font-medium text-neutral-70">
        어디서든 함께할 수 있는
        <br />
        나만의 스터디 짝꿍
      </p>

      {/* ③ 메뉴: 왼쪽 여백 + 오른쪽이 사이드바 끝에서 잘리도록 */}
      <nav className="mt-[38px] pl-10 -mr-3 flex flex-col gap-2.5">
        {menus.map((menu) => {
          const active = activeMenu === menu.label;
          return (
            <SidebarItem
              key={menu.label}
              icon={active && menu.activeIcon ? menu.activeIcon : menu.icon}
              label={menu.label}
              active={active}
              onClick={() => onMenuClick(menu.label)}
            />
          );
        })}
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