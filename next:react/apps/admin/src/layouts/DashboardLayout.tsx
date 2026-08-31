import type { ReactNode } from "react";
import { useCallback, useEffect, useState } from "react";
import { Sidebar, SettingsModal } from "./components";
import Header from "@/layouts/components/Header";
import Footer from "@/layouts/components/Footer";
import BillingAccessLock from "@/features/billing/components/BillingAccessLock";
import { Toaster } from "sonner";

const SIDEBAR_COLLAPSED_KEY = "sidebar-collapsed";

type DashboardLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    const stored = localStorage.getItem(SIDEBAR_COLLAPSED_KEY);
    return stored === "true";
  });
  const [settingsOpen, setSettingsOpen] = useState(false);

  const closeSidebar = useCallback(() => {
    setSidebarOpen(false);
  }, []);

  const openSidebar = useCallback(() => {
    setSidebarOpen(true);
  }, []);

  const openSettings = useCallback(() => {
    setSettingsOpen(true);
  }, []);

  const closeSettings = useCallback(() => {
    setSettingsOpen(false);
  }, []);

  const toggleSidebarCollapse = useCallback(() => {
    setSidebarCollapsed((current) => !current);
  }, []);

  useEffect(() => {
    localStorage.setItem(SIDEBAR_COLLAPSED_KEY, String(sidebarCollapsed));
  }, [sidebarCollapsed]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-background">
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={closeSidebar}
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={toggleSidebarCollapse}
      />

      {/* Settings Modal */}
      <SettingsModal isOpen={settingsOpen} onClose={closeSettings} />
      <Toaster />

      {/* Main Content */}
      <div className={`flex flex-col min-h-screen transition-[margin] duration-300 ${sidebarCollapsed ? 'lg:ml-18' : 'lg:ml-72'}`}>
        <Header onMenuClick={openSidebar} onSettingsClick={openSettings} />

        <main className="flex-1 p-4 sm:p-6">
          <BillingAccessLock>{children}</BillingAccessLock>
        </main>

        <Footer />
      </div>
    </div>
  );
}
