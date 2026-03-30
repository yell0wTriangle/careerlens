import React from "react";
import {
  Bot,
  ChevronRight,
  LayoutDashboard,
  Moon,
  Sparkles,
  Sun,
  Upload,
  User as UserIcon,
} from "lucide-react";

const BUTTON_BASE =
  "w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-all duration-300 group";
const ICON_CLASS = "group-hover:scale-110 transition-transform";

export default function OverlaySidebarNav({
  isOpen,
  setIsOpen,
  activeItem,
  isDarkMode,
  onToggleTheme,
  onOpenLanding,
  onOpenDashboard,
  onOpenResumeAnalysis,
  onOpenMockInterview,
  onOpenProfile,
  closeOnLogoClick = false,
  backdropZClass = "z-[8000]",
  navZClass = "z-[9000]",
  navBgClass = "bg-[var(--card-solid)]",
  navBorderClass = "border-[var(--border)]",
  logoBgClass = "bg-[var(--tertiary)]",
  inactiveButtonClass = "bg-[var(--background)] border border-[var(--border)] hover:border-[var(--primary)] hover:bg-[var(--primary)] hover:text-[var(--primary-foreground)] text-[var(--foreground)] shadow-sm",
  activeButtonClass = "bg-[var(--primary)] border border-transparent text-white shadow-md shadow-[var(--primary)]/20",
  themeButtonClass = "bg-[var(--background)] border border-[var(--border)] hover:border-[var(--border)] hover:bg-[var(--muted)] text-[var(--foreground)] shadow-sm",
  dividerClass = "bg-[var(--border)]",
  triggerBgClass = "bg-[var(--card-solid)]",
  triggerBorderClass = "border-[var(--border)]",
  triggerTextClass = "text-[var(--foreground)] opacity-60 hover:opacity-100 hover:text-[var(--primary)]",
}) {
  const closeNav = () => setIsOpen(false);

  const handleLogo = () => {
    if (onOpenLanding) onOpenLanding();
    if (closeOnLogoClick) closeNav();
  };

  const renderNavButton = (key, title, Icon, onClick) => {
    const isActive = activeItem === key;
    return (
      <button
        type="button"
        onClick={() => {
          if (!isActive && onClick) onClick();
          closeNav();
        }}
        className={`${BUTTON_BASE} ${isActive ? activeButtonClass : inactiveButtonClass}`}
        title={title}
      >
        <Icon size={20} strokeWidth={2} className={ICON_CLASS} />
      </button>
    );
  };

  return (
    <>
      <div
        className={`fixed inset-0 ${backdropZClass} bg-black/40 backdrop-blur-md transition-all duration-500 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeNav}
      />

      <div
        className={`fixed left-0 top-0 bottom-0 ${navZClass} flex transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        onMouseLeave={closeNav}
      >
        <nav
          className={`relative z-10 w-20 md:w-24 h-full flex flex-col items-center justify-between py-8 md:py-10 ${navBgClass} border-r ${navBorderClass} shadow-[4px_0_24px_rgba(0,0,0,0.1)]`}
        >
          <div className="flex flex-col items-center gap-6">
            <button
              type="button"
              onClick={handleLogo}
              className={`w-12 h-12 md:w-14 md:h-14 ${logoBgClass} text-white flex items-center justify-center font-bold`}
              style={{ borderRadius: "16px 16px 4px 16px" }}
            >
              <Sparkles size={24} />
            </button>
            <span className="text-sm md:text-base font-black tracking-[0.5em] text-[var(--foreground)] uppercase [writing-mode:vertical-rl] rotate-180 opacity-40 font-['Fira_Code',monospace]">
              CAREERLENS
            </span>
          </div>

          <div className="flex flex-col gap-4 items-center w-full px-4">
            {renderNavButton("dashboard", "Dashboard", LayoutDashboard, onOpenDashboard)}
            {renderNavButton(
              "resume",
              "Resume Upload & Analysis",
              Upload,
              onOpenResumeAnalysis,
            )}
            {renderNavButton(
              "mock",
              "Mock AI Interview",
              Bot,
              onOpenMockInterview,
            )}
            {renderNavButton("profile", "Profile", UserIcon, onOpenProfile)}

            <div className={`w-8 h-[2px] rounded-full mx-auto my-3 opacity-50 ${dividerClass}`}></div>

            <button
              type="button"
              onClick={onToggleTheme}
              className={`${BUTTON_BASE} ${themeButtonClass}`}
              title="Toggle Theme"
            >
              {isDarkMode ? (
                <Sun
                  size={20}
                  strokeWidth={2}
                  className="group-hover:rotate-45 transition-transform"
                />
              ) : (
                <Moon
                  size={20}
                  strokeWidth={2}
                  className="group-hover:-rotate-12 transition-transform"
                />
              )}
            </button>
          </div>
        </nav>

        <button
          onMouseEnter={() => setIsOpen(true)}
          onFocus={() => setIsOpen(true)}
          className={`absolute -right-6 md:-right-7 top-1/2 -translate-y-1/2 w-6 md:w-7 h-24 ${triggerBgClass} border-y border-r ${triggerBorderClass} border-l-0 flex items-center justify-end pr-1 ${triggerTextClass} transition-colors shadow-[4px_0_12px_rgba(0,0,0,0.05)] cursor-pointer focus:outline-none z-0`}
          style={{ borderRadius: "0 100% 100% 0 / 0 50% 50% 0" }}
        >
          <ChevronRight
            size={16}
            className={`transition-transform duration-500 shrink-0 ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
          />
        </button>
      </div>
    </>
  );
}
