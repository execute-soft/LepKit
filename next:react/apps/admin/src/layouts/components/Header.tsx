import { useState, useRef, useEffect, useMemo } from "react";
import {
  Bell,
  Download,
  LogOut,
  Menu,
  Moon,
  Palette,
  Puzzle,
  Search,
  Settings,
  ShoppingBag,
  Store,
  Sun,
  TrendingUp,
  X,
} from "lucide-react";
import { useLanguage, useTheme } from "@/lib/hooks";
import { Link, useNavigate } from "react-router-dom";
import {
  ACCESS_TOKEN_KEY,
  AUTH_TOKENS_KEY,
  type AdminAuthTokenPayload,
  persistAdminAuthTokens,
  useAuth,
} from "@/features/auth/store/auth";
import LanguageSwitcher from "@/features/i18n/components/LanguageSwitcher";
import { Input } from "@repo/uix/react/primitives";
import { fetchCurrentAdminUser, logoutAdminUser } from "@/features/auth/api";

interface HeaderProps {
  onMenuClick: () => void;
  onSettingsClick: () => void;
}

type ProfileSummary = {
  name: string;
  email: string;
};

const resolveProfileName = (
  name: string | null | undefined,
  email: string | null | undefined,
  fallbackName: string,
) => {
  const safeName = name?.trim();
  if (safeName) return safeName;

  const safeEmail = email?.trim();
  if (safeEmail && safeEmail.includes("@")) {
    return safeEmail.split("@")[0];
  }

  return fallbackName;
};

const getInitials = (name: string) => {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "U";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
};

export default function Header({ onMenuClick, onSettingsClick }: Readonly<HeaderProps>) {
  const { theme, toggleTheme } = useTheme();
  const { t } = useLanguage();
  const { logout, isAuthenticated, setPermissions } = useAuth();
  const defaultProfile = useMemo<ProfileSummary>(
    () => ({
      name: t("dashboard.header.profileFallbackName"),
      email: t("dashboard.header.profileFallbackEmail"),
    }),
    [t],
  );
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [profile, setProfile] = useState<ProfileSummary>(defaultProfile);
  const profileRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);

  const handleLogout = async () => {
    const raw =
      window.localStorage.getItem(AUTH_TOKENS_KEY) ??
      window.sessionStorage.getItem(AUTH_TOKENS_KEY);

    if (raw) {
      try {
        const parsed = JSON.parse(raw) as { refreshToken?: string };
        if (parsed.refreshToken) {
          await logoutAdminUser({ input: { refreshToken: parsed.refreshToken } });
        }
      } catch {
        // Ignore malformed token storage and continue local logout.
      }
    }

    logout();
    setProfile(defaultProfile);
    setProfileOpen(false);
    navigate("/", { replace: true });
  };

  // Close menus when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setNotificationOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    let isCancelled = false;

    const syncProfile = async () => {
      if (!isAuthenticated) {
        setProfile(defaultProfile);
        return;
      }

      const me = await fetchCurrentAdminUser().catch(() => null);
      if (!me || isCancelled) return;

      const storage = window.localStorage.getItem(ACCESS_TOKEN_KEY)
        ? window.localStorage
        : window.sessionStorage;
      const rawTokens = storage.getItem(AUTH_TOKENS_KEY);
      if (rawTokens) {
        try {
          const parsed = JSON.parse(rawTokens) as AdminAuthTokenPayload;
          persistAdminAuthTokens({
            rememberMe: storage === window.localStorage,
            tokens: {
              ...parsed,
              userId: me.userId,
              orgId: me.orgId,
              siteId: me.siteId ?? null,
              roleId: me.roleId,
              role: me.role,
              principalType: me.principalType,
              permissions: me.permissions,
            },
          });
        } catch {
          // Ignore malformed auth storage. ProtectedRoute handles invalid sessions.
        }
      }

      const resolvedEmail = me.email?.trim() || defaultProfile.email;
      setPermissions(me.permissions);
      setProfile({
        name: resolveProfileName(me.name, me.email, defaultProfile.name),
        email: resolvedEmail
      });
    };

    void syncProfile();
    return () => {
      isCancelled = true;
    };
  }, [defaultProfile, isAuthenticated, setPermissions]);

  const initials = getInitials(profile.name);

  return (
    <header className="sticky top-0 z-30 flex min-h-16 items-center gap-3 border-b border-gray-200 bg-white px-4 dark:border-border dark:bg-card sm:gap-4 sm:px-5 lg:px-6">
      {/* Mobile Menu Button */}
      <button
        className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white transition-colors hover:bg-gray-50 dark:border-border dark:bg-muted dark:hover:bg-secondary lg:hidden cursor-pointer"
        onClick={onMenuClick}
        aria-label="Open menu"
      >
        <Menu className="w-5 h-5 text-gray-500 dark:text-gray-400" />
      </button>

      {/* Search Button - Mobile */}
      <button
        className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white transition-colors hover:bg-gray-50 dark:border-border dark:bg-muted dark:hover:bg-secondary sm:hidden cursor-pointer"
        onClick={() => setSearchOpen(!searchOpen)}
      >
        <Search className="h-5 w-5 text-gray-500 dark:text-gray-400" strokeWidth={1.8} />
      </button>

      {/* Search Bar - Desktop */}
      <div className="hidden h-11 flex-1 items-center rounded-lg border border-gray-200 bg-gray-50 px-4 transition-all duration-200 hover:border-gray-300 hover:bg-white dark:border-border dark:bg-background dark:hover:bg-muted sm:flex">
        <Search className="h-4.5 w-4.5 text-gray-400 shrink-0" strokeWidth={2} />

        {/* Tablet - tap to open overlay */}
        <button
          className="lg:hidden flex-1 text-left ml-3 text-[14px] text-gray-400"
          onClick={() => setSearchOpen(!searchOpen)}
        >
          {t("common.search.placeholder.short")}
        </button>

        {/* Desktop search input */}
        <Input
          type="text"
          floatingLabel={false}
          placeholder={t("common.search.placeholder.long")}
          className="ml-3 hidden h-auto flex-1 border-0 bg-transparent p-0 text-[14px] text-gray-700 shadow-none placeholder-gray-400 focus-visible:ring-0 dark:bg-transparent dark:text-gray-200 lg:block"
        />

        {/* Keyboard shortcut hint */}
        <div className="hidden lg:flex items-center gap-1 ml-3">
          <kbd className="px-1.5 py-0.5 text-[10px] font-medium text-gray-400 bg-gray-100 dark:bg-secondary rounded border border-gray-200 dark:border-transparent">⌘</kbd>
          <kbd className="px-1.5 py-0.5 text-[10px] font-medium text-gray-400 bg-gray-100 dark:bg-secondary rounded border border-gray-200 dark:border-transparent">K</kbd>
        </div>
      </div>

      {/* Actions Group */}
      <div className="ml-auto flex h-10 items-center gap-2">
        <div className="hidden h-10 items-center border-r border-gray-200 pr-3 dark:border-border md:flex">
          <LanguageSwitcher compact />
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="hidden h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 transition-colors hover:bg-gray-50 hover:text-gray-700 dark:border-border dark:bg-muted dark:text-gray-400 dark:hover:bg-secondary dark:hover:text-gray-200 sm:flex cursor-pointer"
          aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
        >
          {theme === "dark" ? (
            <Sun className="h-5 w-5" strokeWidth={1.8} />
          ) : (
            <Moon className="h-5 w-5" strokeWidth={1.8} />
          )}
        </button>

        {/* Notifications with Dropdown */}
        <div className="relative flex items-center" ref={notificationRef}>
          <button
            onClick={() => setNotificationOpen(!notificationOpen)}
            className="relative flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white transition-colors hover:bg-gray-50 dark:border-border dark:bg-muted dark:hover:bg-secondary cursor-pointer"
          >
            <Bell className="h-5 w-5 text-gray-500 dark:text-gray-400" strokeWidth={1.5} />
            <span className="absolute -top-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground ring-2 ring-white dark:ring-muted">
              3
            </span>
          </button>

          {/* Notification Dropdown Menu */}
          {notificationOpen && (
            <div className="absolute right-0 top-full z-50 mt-3 w-80 rounded-lg border border-gray-200 bg-white py-2 shadow-lg shadow-gray-200/50 dark:border-border dark:bg-muted dark:shadow-gray-900/50">
              {/* Header */}
              <div className="px-4 py-3 border-b border-gray-100 dark:border-border flex items-center justify-between">
                <p className="text-[15px] font-semibold text-gray-900 dark:text-gray-100">{t("dashboard.header.notifications")}</p>
                <button className="text-[12px] text-primary hover:text-primary/80 font-medium cursor-pointer">
                  {t("dashboard.header.markAllRead")}
                </button>
              </div>

              {/* Notification Items */}
              <div className="max-h-80 overflow-y-auto">
                {/* Unread Notification */}
                <div className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-secondary transition-colors cursor-pointer bg-primary/5 border-l-2 border-primary">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-full bg-linear-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shrink-0">
                      <Store className="w-4 h-4 text-white" strokeWidth={1.8} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-medium text-gray-900 dark:text-gray-100 leading-snug">
                        New store launched
                      </p>
                      <p className="text-[12px] text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-2">
                        "Urban Threads Boutique" is now live and accepting orders.
                      </p>
                      <p className="text-[11px] text-gray-400 mt-1">5 minutes ago</p>
                    </div>
                    <div className="w-2 h-2 rounded-full bg-primary shrink-0 mt-1.5" />
                  </div>
                </div>

                {/* Unread Notification */}
                <div className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-secondary transition-colors cursor-pointer bg-primary/5 border-l-2 border-primary">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-full bg-linear-to-br from-primary/80 to-primary flex items-center justify-center shrink-0">
                      <ShoppingBag className="w-4 h-4 text-white" strokeWidth={1.8} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-medium text-gray-900 dark:text-gray-100 leading-snug">
                        Order milestone reached
                      </p>
                      <p className="text-[12px] text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-2">
                        Platform has processed 100,000 orders this month.
                      </p>
                      <p className="text-[11px] text-gray-400 mt-1">1 hour ago</p>
                    </div>
                    <div className="w-2 h-2 rounded-full bg-primary shrink-0 mt-1.5" />
                  </div>
                </div>

                {/* Read Notification */}
                <div className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-secondary transition-colors cursor-pointer">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-full bg-linear-to-br from-amber-400 to-orange-500 flex items-center justify-center shrink-0">
                      <TrendingUp className="w-4 h-4 text-white" strokeWidth={1.8} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-medium text-gray-900 dark:text-gray-100 leading-snug">
                        Weekly report ready
                      </p>
                      <p className="text-[12px] text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-2">
                        Platform revenue increased 23% compared to last week.
                      </p>
                      <p className="text-[11px] text-gray-400 mt-1">Yesterday</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="border-t border-gray-100 dark:border-border mt-1">
                <button className="w-full px-4 py-2.5 text-[13px] text-primary hover:bg-gray-50 dark:hover:bg-secondary font-medium transition-colors cursor-pointer">
                  {t("dashboard.header.viewAllNotifications")}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User Avatar with Dropdown */}
        <div className="relative flex items-center" ref={profileRef}>
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-lg border border-gray-200 bg-white transition-all hover:border-gray-300 dark:border-border dark:bg-muted dark:hover:bg-secondary cursor-pointer"
          >
            <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-primary to-primary/70 text-[13px] font-semibold uppercase text-primary-foreground">
              {initials}
            </div>
          </button>

          {/* Profile Dropdown Menu */}
          {profileOpen && (
            <div className="absolute -right-2 top-full z-50 mt-3 w-72 rounded-lg border border-gray-200 bg-white py-2 shadow-lg shadow-gray-200/50 dark:border-border dark:bg-muted dark:shadow-gray-900/50">
              {/* User Info */}
              <div className="px-4 py-3 border-b border-gray-100 dark:border-border flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-linear-to-br from-primary to-primary/70 text-primary-foreground flex items-center justify-center text-[13px] font-semibold uppercase shrink-0">
                  {initials}
                </div>
                <div>
                  <p className="text-[15px] font-semibold text-gray-900 dark:text-gray-100">{profile.name}</p>
                  <p className="text-[13px] text-gray-500 dark:text-gray-400">{profile.email}</p>
                </div>
              </div>

              {/* Menu Items */}
              <div className="py-1">
                <button className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-gray-50 dark:hover:bg-secondary transition-colors group cursor-pointer">
                  <div className="flex items-center gap-3">
                    <TrendingUp className="w-4.5 h-4.5 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300" strokeWidth={1.5} />
                    <span className="text-[14px] text-gray-700 dark:text-gray-300">{t("dashboard.header.activityLog")}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 text-[10px] font-medium text-gray-400 bg-gray-100 dark:bg-secondary rounded border border-gray-200 dark:border-transparent">⌘</kbd>
                    <kbd className="px-1.5 py-0.5 text-[10px] font-medium text-gray-400 bg-gray-100 dark:bg-secondary rounded border border-gray-200 dark:border-transparent">A</kbd>
                  </div>
                </button>

                <button className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-gray-50 dark:hover:bg-secondary transition-colors group cursor-pointer">
                  <div className="flex items-center gap-3">
                    <Puzzle className="w-4.5 h-4.5 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300" strokeWidth={1.5} />
                    <span className="text-[14px] text-gray-700 dark:text-gray-300">{t("dashboard.header.integrations")}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 text-[10px] font-medium text-gray-400 bg-gray-100 dark:bg-secondary rounded border border-gray-200 dark:border-transparent">⌘</kbd>
                    <kbd className="px-1.5 py-0.5 text-[10px] font-medium text-gray-400 bg-gray-100 dark:bg-secondary rounded border border-gray-200 dark:border-transparent">I</kbd>
                  </div>
                </button>

                <Link
                  to="/dashboard/settings/theme"
                  onClick={() => setProfileOpen(false)}
                  className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-gray-50 dark:hover:bg-secondary transition-colors group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <Palette className="w-4.5 h-4.5 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300" strokeWidth={1.5} />
                    <span className="text-[14px] text-gray-700 dark:text-gray-300">{t("dashboard.header.theme")}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 text-[10px] font-medium text-gray-400 bg-gray-100 dark:bg-secondary rounded border border-gray-200 dark:border-transparent">⌘</kbd>
                    <kbd className="px-1.5 py-0.5 text-[10px] font-medium text-gray-400 bg-gray-100 dark:bg-secondary rounded border border-gray-200 dark:border-transparent">T</kbd>
                  </div>
                </Link>

                <button
                  onClick={() => {
                    setProfileOpen(false);
                    onSettingsClick();
                  }}
                  className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-gray-50 dark:hover:bg-secondary transition-colors group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <Settings className="w-4.5 h-4.5 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300" strokeWidth={1.5} />
                    <span className="text-[14px] text-gray-700 dark:text-gray-300">{t("dashboard.header.settings")}</span>
                  </div>
                </button>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-100 dark:border-border my-1" />

              {/* Upgrade & App */}
              <div className="py-1">
                <button className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 dark:hover:bg-secondary transition-colors group cursor-pointer">
                  <div className="w-4.5 h-4.5 rounded-full border-2 border-primary flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  </div>
                  <span className="text-[14px] text-gray-700 dark:text-gray-300">{t("dashboard.header.upgradeEnterprise")}</span>
                </button>

                <button className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 dark:hover:bg-secondary transition-colors group cursor-pointer">
                  <Download className="w-4.5 h-4.5 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300" strokeWidth={1.5} />
                  <span className="text-[14px] text-gray-700 dark:text-gray-300">{t("dashboard.header.getCli")}</span>
                </button>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-100 dark:border-border my-1" />

              {/* Log out */}
              <div className="py-1">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 dark:hover:bg-secondary transition-colors group cursor-pointer"
                >
                  <LogOut className="w-4.5 h-4.5 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300" strokeWidth={1.5} />
                  <span className="text-[14px] text-gray-700 dark:text-gray-300">{t("dashboard.header.logout")}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile search overlay */}
      {searchOpen && (
        <div className="absolute left-0 right-0 top-16 z-30 border-b border-gray-100 bg-white px-4 py-3 shadow-lg dark:border-border dark:bg-card lg:hidden">
          <div className="flex h-11 items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 px-4 dark:border-border dark:bg-muted">
            <Search className="h-4.5 w-4.5 text-gray-400 shrink-0" strokeWidth={2} />
            <Input
              type="text"
              floatingLabel={false}
              placeholder={t("common.search.placeholder.long")}
              className="h-auto flex-1 border-0 bg-transparent p-0 text-[14px] text-gray-700 shadow-none placeholder-gray-400 focus-visible:ring-0 dark:bg-transparent dark:text-gray-200"
              autoFocus
            />
            <button
              onClick={() => setSearchOpen(false)}
              className="p-1 hover:bg-gray-200 dark:hover:bg-secondary rounded-lg transition-colors cursor-pointer"
            >
              <X className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
