import { ReactComponent as BellIcon } from "../assets/icons/bell.svg";
import { ReactComponent as UserIcon } from "../assets/icons/user.svg";
import { ReactComponent as ChevronDownIcon } from "../assets/icons/chevron-down.svg";

type TopBarProps = {
  userName: string;
  onNotificationClick?: () => void;
  onUserClick?: () => void;
};

function TopBar({ userName, onNotificationClick, onUserClick }: TopBarProps) {
  return (
    <header className="sticky top-0 z-[5] flex items-center justify-end gap-5 h-[84px] pr-12 shrink-0 bg-primary-90">
      <button
        type="button"
        onClick={onNotificationClick}
        aria-label="알림"
        className="text-neutral-60"
      >
        <BellIcon className="w-5 h-5" />
      </button>

      <button
        type="button"
        onClick={onUserClick}
        className="flex items-center gap-3 text-caption text-neutral-10"
      >
        <span className="flex items-center gap-2">
          <UserIcon className="w-5 h-5 text-neutral-60" />
          {userName}님
        </span>
        <ChevronDownIcon className="w-3 h-3 text-neutral-60" />
      </button>
    </header>
  );
}

export default TopBar;