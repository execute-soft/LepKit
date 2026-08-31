import { useState, useRef, useEffect, useMemo } from "react";
import {
  BarChart3,
  BadgePercent,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  FileBarChart,
  Download,
  FileText,
  Folder,
  Handshake,
  HelpCircle,
  LayoutDashboard,
  Link2,
  MessageCircle,
  Palette,
  ReceiptText,
  Package,
  Route,
  RefreshCcw,
  Receipt,
  Settings,
  ShoppingBag,
  Store,
  Target,
  Users,
  ShieldAlert,
  X,
  Zap,
} from "lucide-react";
import Logo from "./Logo";
import { Link, useLocation } from "react-router-dom";
import {
  allDashboardFeaturesEnabled,
  type DashboardFeatureAccessState,
  type DashboardFeatureKey,
} from "@/features/billing/lib/feature-access";
import { useLanguage } from "@/lib/hooks";
import { formatMessage, translateLooseText } from "@/lib/i18n";

interface SubMenuItem {
  label: string;
  href?: string;
  featureKey?: DashboardFeatureKey;
}

interface NavItem {
  icon: React.ElementType;
  label: string;
  subItems?: SubMenuItem[];
  href?: string;
  featureKey?: DashboardFeatureKey;
}

const platformNavItems: NavItem[] = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  {
    icon: Package,
    label: "Products",
    href: "/dashboard/products",
    subItems: [
      { label: "Listing", href: "/dashboard/products" },
      { label: "Excel", href: "/dashboard/products/excel" },
    ],
  },
  {
    icon: Folder,
    label: "Catalog",
    href: "/dashboard/catalog",
    subItems: [
      { label: "Categories", href: "/dashboard/catalog/categories" },
      { label: "Brands", href: "/dashboard/catalog/brands" },
      { label: "Authors", href: "/dashboard/catalog/authors" },
    ],
  },

  {
    icon: ShoppingBag,
    label: "Orders",
    href: "/dashboard/orders",
    subItems: [
      { label: "All Orders", href: "/dashboard/orders" },
      { label: "Order Excel", href: "/dashboard/orders/excel" },
      { label: "Abandoned Carts", href: "/dashboard/orders/abandoned", featureKey: "abandoned_cart" },
    ],
  },
  {
    icon: Store,
    label: "Stores",
    href: "/dashboard/stores",
    subItems: [
      { label: "All Stores", href: "/dashboard/stores" },
      { label: "Add New Store", href: "/dashboard/stores/new" },
      { label: "Store Settings", href: "/dashboard/stores/settings" },
    ],
  },
  {
    icon: Users,
    label: "Customers",
    href: "/dashboard/customers",
    subItems: [
      { label: "All Customers", href: "/dashboard/customers" },
      { label: "Customer Excel", href: "/dashboard/customers/excel" },
      { label: "Segments", href: "/dashboard/customers/segments" },
      { label: "Reviews", href: "/dashboard/customers/reviews" },
      { label: "Support Tickets", href: "/dashboard/customers/support" },
    ],
  },
  {
    icon: Folder,
    label: "Merchants",
    href: "/dashboard/merchants",
    featureKey: "merchant",
    subItems: [
      { label: "All Merchants", href: "/dashboard/merchants" },
      { label: "Pending Approval", href: "/dashboard/merchants/pending" },
      { label: "Verified", href: "/dashboard/merchants/verified" },
    ],
  },
  { icon: BarChart3, label: "Analytics", href: "/dashboard/analytics", featureKey: "reporting" },
  {
    icon: FileText,
    label: "Reports",
    href: "/dashboard/reports",
    featureKey: "reporting",
    subItems: [
      { label: "Product Sales", href: "/dashboard/reports/product-sales" },
      { label: "Daily Sales", href: "/dashboard/reports/daily-sales" },
      { label: "Staff Activity", href: "/dashboard/reports/staff-activity" },
      { label: "Staff Orders", href: "/dashboard/reports/staff-orders" },
    ],
  },
];

const toolsNavItems: NavItem[] = [
  {
    icon: Palette,
    label: "Theme Builder",
    href: "/dashboard/themes",
    subItems: [
      { label: "Templates", href: "/dashboard/themes/templates" },
      { label: "Custom Themes", href: "/dashboard/themes/custom" },
    ],
  },
  // { icon: Zap, label: "App Marketplace", href: "/dashboard/marketplace" },
  {
    icon: CreditCard,
    label: "Payments",
    href: "/dashboard/payments",
    featureKey: "payment",
    subItems: [
      { label: "Transactions", href: "/dashboard/payments/transactions" },
      { label: "Attempts", href: "/dashboard/payments/attempts" },
      { label: "Refunds", href: "/dashboard/payments/payouts" },
      { label: "Methods", href: "/dashboard/payments/methods" },
    ],
  },

  {
    icon: RefreshCcw,
    label: "Subscriptions",
    href: "/dashboard/subscriptions",
    subItems: [
      { label: "Plans", href: "/dashboard/subscriptions/plans" },
      { label: "Billing Cycles", href: "/dashboard/subscriptions/billing-cycles" },
      { label: "Dunning", href: "/dashboard/subscriptions/dunning" },
    ],
  },

  {
    icon: BadgePercent,
    label: "Marketing",
    href: "/dashboard/marketing",
    subItems: [
      { label: "Campaigns", href: "/dashboard/marketing/campaigns" },
      { label: "Coupons", href: "/dashboard/marketing/coupons" },
      { label: "Collections", href: "/dashboard/marketing/collections" },
      { label: "Sliders", href: "/dashboard/marketing/sliders" },
      { label: "Segmentation", href: "/dashboard/marketing/segmentation" },
      { label: "Landing Pages", href: "/dashboard/marketing/landing-pages" },
      { label: "Recommendations", href: "/dashboard/marketing/recommendations" },
      { label: "Influencer Campaigns", href: "/dashboard/marketing/influencers" },
      { label: "Popups & Banners", href: "/dashboard/marketing/popups-banners" },
      { label: "Page", href: "/dashboard/page", featureKey: "blog" },
    ],
  },
  {
    icon: Zap,
    label: "Growth",
    href: "/dashboard/growth",
    subItems: [
      { label: "Meta Tracking", href: "/dashboard/growth/facebook-pixel" },
    ],
  },

  {
    icon: Handshake,
    label: "Resellers",
    href: "/dashboard/resellers",
    featureKey: "reseller",
    subItems: [
      { label: "Reseller Directory", href: "/dashboard/resellers" },
      { label: "Onboarding", href: "/dashboard/resellers/onboarding" },
      { label: "Pricing Tiers", href: "/dashboard/resellers/pricing-tiers" },
      { label: "Deals & Quotes", href: "/dashboard/resellers/deals-quotes" },
      { label: "Payouts", href: "/dashboard/resellers/payouts" },
      { label: "Performance", href: "/dashboard/resellers/performance" },
    ],
  },
  {
    icon: Link2,
    label: "Affiliates",
    href: "/dashboard/affiliates",
    featureKey: "affiliate",
    subItems: [
      { label: "Affiliate Directory", href: "/dashboard/affiliates" },
      { label: "Programs", href: "/dashboard/affiliates/programs" },
      { label: "Links & Coupons", href: "/dashboard/affiliates/links-coupons" },
      { label: "Commissions", href: "/dashboard/affiliates/commissions" },
      { label: "Payouts", href: "/dashboard/affiliates/payouts" },
      { label: "Fraud Checks", href: "/dashboard/affiliates/fraud-checks" },
    ],
  },

];

const supportNavItems: NavItem[] = [

  {
    icon: ShieldAlert,
    label: "Fraud & Risk",
    href: "/dashboard/fraud-risk",
    featureKey: "fraud",
    subItems: [
      { label: "Chargebacks", href: "/dashboard/fraud-risk/chargebacks" },
      { label: "Risk Rules", href: "/dashboard/fraud-risk/rules" },
      { label: "Manual Reviews", href: "/dashboard/fraud-risk/reviews" },
    ],
  },

  {
    icon: Target,
    label: "Automation",
    href: "/dashboard/automation",
    subItems: [
      { label: "Workflows", href: "/dashboard/automation/workflows" },
      { label: "Triggers", href: "/dashboard/automation/triggers" },
      { label: "Webhooks", href: "/dashboard/automation/webhooks", featureKey: "webhooks" },
      { label: "Logs", href: "/dashboard/automation/logs" },
    ],
  },
  {
    icon: Settings,
    label: "Settings",
    href: "/dashboard/settings",
    subItems: [
      { label: "General", href: "/dashboard/settings/general" },
      { label: "Invoice", href: "/dashboard/settings/invoice" },
      { label: "Theme", href: "/dashboard/settings/theme" },
      { label: "Security", href: "/dashboard/settings/security" },
      { label: "Notifications", href: "/dashboard/settings/notifications" },
      { label: "API Keys", href: "/dashboard/settings/api-keys", featureKey: "api" },
      { label: "Team", href: "/dashboard/settings/team", featureKey: "staff" },
      { label: "Audit Logs", href: "/dashboard/settings/audit-logs" },
    ],
  },
  { icon: HelpCircle, label: "Documentation", href: "/dashboard/docs" },
  { icon: MessageCircle, label: "Support", href: "/dashboard/support" },
];

// ─── Route matching helpers ────────────────────────────────────────────────

function isPathActive(pathname: string, href: string | undefined, exact = false): boolean {
  if (!href) return false;
  if (exact || href === "/dashboard") return pathname === href;
  return pathname === href || pathname.startsWith(href + "/");
}

function findExpandedItemByRoute(
  pathname: string,
  ...itemGroups: NavItem[][]
): string | null {
  for (const items of itemGroups) {
    for (const item of items) {
      if (item.subItems?.some((sub) => isPathActive(pathname, sub.href))) {
        return item.label;
      }
    }
  }
  return null;
}

function filterNavItemsByFeatureAccess(
  items: NavItem[],
  featureAccess: DashboardFeatureAccessState,
) {
  return items
    .filter((item) => !item.featureKey || featureAccess[item.featureKey])
    .map((item) => ({
      ...item,
      subItems: item.subItems?.filter(
        (subItem) => !subItem.featureKey || featureAccess[subItem.featureKey],
      ),
    }));
}

// ─── NavItem ───────────────────────────────────────────────────────────────

function NavItemComponent({
  item,
  isCollapsed,
  expandedItem,
  onExpandItem,
  onNavigate,
  pathname,
  localize,
}: {
  item: NavItem;
  isCollapsed: boolean;
  expandedItem: string | null;
  onExpandItem: (label: string) => void;
  onNavigate?: () => void;
  pathname: string;
  localize: (value: string) => string;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPopoverHovered, setIsPopoverHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navItemRef = useRef<HTMLDivElement>(null);

  const hasSubItems = item.subItems && item.subItems.length > 0;
  const isExpanded = expandedItem === item.label;

  const isItemActive = hasSubItems
    ? item.subItems!.some((sub) => isPathActive(pathname, sub.href))
    : isPathActive(pathname, item.href);

  const clearCloseTimeout = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isCollapsed) {
      clearCloseTimeout();
      const rect = e.currentTarget.getBoundingClientRect();
      setTooltipPosition({
        top: rect.top,
        left: rect.right + 8,
      });
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isClicked) {
      closeTimeoutRef.current = setTimeout(() => {
        if (!isPopoverHovered && !isClicked) {
          setIsHovered(false);
        }
      }, 200);
    }
  };

  const handlePopoverEnter = () => {
    clearCloseTimeout();
    setIsPopoverHovered(true);
  };

  const handlePopoverLeave = () => {
    setIsPopoverHovered(false);
    setIsClicked(false);
    closeTimeoutRef.current = setTimeout(() => {
      setIsHovered(false);
    }, 150);
  };

  const handleSubItemClick = () => {
    setIsClicked(true);
    clearCloseTimeout();
    onNavigate?.();
  };

  const showPopover = isCollapsed && (isHovered || isPopoverHovered || isClicked);

  return (
    <div
      ref={navItemRef}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Main Nav Item */}
      {hasSubItems && !isCollapsed ? (
        <button
          onClick={() => onExpandItem(item.label)}
          className={`w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl text-[14px] font-medium transition-all duration-200 cursor-pointer ${isItemActive
            ? "bg-primary/10 text-primary"
            : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-muted hover:text-gray-900 dark:hover:text-gray-100"
            }`}
        >
          <div className="flex items-start gap-3">
            <item.icon className={`w-4.5 h-4.5 shrink-0 ${isItemActive ? "text-primary" : ""}`} strokeWidth={1.8} />
            <span>{localize(item.label)}</span>
          </div>
          <ChevronRight className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`} />
        </button>
      ) : (
        <Link
          to={item.href ?? "/"}
          onClick={onNavigate}
          {...(isItemActive ? { "data-active-nav": "" } : {})}
          className={`flex items-center ${isCollapsed ? 'justify-center w-10 h-10 rounded-full' : 'gap-3 px-3 py-2.5 rounded-xl'} text-[14px] font-medium transition-all duration-200 cursor-pointer ${isItemActive
            ? "bg-primary/10 text-primary"
            : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-muted hover:text-gray-900 dark:hover:text-gray-100"
            }`}
        >
          <item.icon className={`w-4.5 h-4.5 shrink-0 ${isItemActive ? "text-primary" : ""}`} strokeWidth={1.8} />
          {!isCollapsed && <span>{localize(item.label)}</span>}
        </Link>
      )}

      {/* Expanded Sub-menu for non-collapsed state */}
      {!isCollapsed && hasSubItems && isExpanded && (
        <div className="mt-1 ml-7 pl-3 border-l border-gray-200 dark:border-border">
          {item.subItems?.map((subItem) => {
            const isSubActive = isPathActive(pathname, subItem.href, true);
            return (
              <Link
                key={subItem.label}
                to={subItem.href ?? "/"}
                onClick={handleSubItemClick}
                {...(isSubActive ? { "data-active-nav": "" } : {})}
                className={`block px-3 py-2 text-[13px] rounded-lg transition-colors ${isSubActive
                  ? "text-primary font-medium bg-primary/5"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-muted"
                  }`}
              >
                {localize(subItem.label)}
              </Link>
            );
          })}
        </div>
      )}

      {/* Tooltip/Submenu for collapsed state */}
      {showPopover && (
        <div
          className="fixed z-9999"
          style={{
            top: tooltipPosition.top,
            left: tooltipPosition.left,
            transform: hasSubItems ? 'none' : 'translateY(25%)',
          }}
          onMouseEnter={handlePopoverEnter}
          onMouseLeave={handlePopoverLeave}
        >
          {hasSubItems ? (
            <div
              className="bg-white dark:bg-muted border border-gray-200 dark:border-border rounded-xl shadow-xl min-w-45 overflow-hidden"
              onClick={handleSubItemClick}
            >
              {/* Header */}
              <div className="px-4 py-3 bg-gray-50 dark:bg-card border-b border-gray-100 dark:border-border">
                <span className="font-semibold text-gray-900 dark:text-gray-100 text-sm">{localize(item.label)}</span>
              </div>
              {/* Sub Items */}
              <div className="py-2">
                {item.subItems?.map((subItem) => {
                  const isSubActive = isPathActive(pathname, subItem.href, true);
                  return (
                    <Link
                      key={subItem.label}
                      to={subItem.href ?? "/"}
                      onClick={handleSubItemClick}
                      className={`block px-4 py-2 text-[13px] transition-colors ${isSubActive
                        ? "text-primary font-medium bg-primary/10"
                        : "text-gray-600 dark:text-gray-400 hover:text-primary hover:bg-primary/10"
                        }`}
                    >
                      {localize(subItem.label)}
                    </Link>
                  );
                })}
              </div>
              {/* Arrow */}
              <div className="absolute left-0 top-4 -translate-x-1.5 w-3 h-3 bg-white dark:bg-muted border-l border-b border-gray-200 dark:border-border rotate-45" />
            </div>
          ) : (
            <div className="bg-gray-900 dark:bg-secondary text-white text-sm font-medium px-3 py-2 rounded-lg shadow-lg whitespace-nowrap">
              {localize(item.label)}
              {/* Arrow */}
              <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-900 dark:bg-secondary rotate-45" />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── NavSection ────────────────────────────────────────────────────────────

function NavSection({
  title,
  items,
  isCollapsed,
  expandedItem,
  onExpandItem,
  onNavigate,
  pathname,
  localize,
}: {
  title: string;
  items: NavItem[];
  isCollapsed: boolean;
  expandedItem: string | null;
  onExpandItem: (label: string) => void;
  onNavigate?: () => void;
  pathname: string;
  localize: (value: string) => string;
}) {
  return (
    <div className="mb-5">
      {!isCollapsed && (
        <p className="px-5 mb-2 text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
          {localize(title)}
        </p>
      )}
      <nav className={`space-y-0.5 ${isCollapsed ? 'px-2 flex flex-col items-center' : 'px-3'}`}>
        {items.map((item) => (
          <NavItemComponent
            key={item.label}
            item={item}
            isCollapsed={isCollapsed}
            expandedItem={expandedItem}
            onExpandItem={onExpandItem}
            onNavigate={onNavigate}
            pathname={pathname}
            localize={localize}
          />
        ))}
      </nav>
    </div>
  );
}

// ─── Sidebar ───────────────────────────────────────────────────────────────

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export default function Sidebar({ isOpen, onClose, isCollapsed, onToggleCollapse }: Readonly<SidebarProps>) {
  const { language, t } = useLanguage();
  const location = useLocation();
  const pathname = location.pathname;
  const localize = (value: string) => translateLooseText(language, value);
  const [featureAccess] = useState<DashboardFeatureAccessState>(allDashboardFeaturesEnabled);

  // On mobile, always show expanded view
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const nextIsMobile = window.innerWidth < 1024;
      setIsMobile((current) =>
        current === nextIsMobile ? current : nextIsMobile,
      );
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const visiblePlatformNavItems = useMemo(
    () => filterNavItemsByFeatureAccess(platformNavItems, featureAccess),
    [featureAccess],
  );
  const visibleToolsNavItems = useMemo(
    () => filterNavItemsByFeatureAccess(toolsNavItems, featureAccess),
    [featureAccess],
  );
  const visibleSupportNavItems = useMemo(
    () => filterNavItemsByFeatureAccess(supportNavItems, featureAccess),
    [featureAccess],
  );

  // Accordion: only one menu expanded at a time
  const [expandedItem, setExpandedItem] = useState<string | null>(() =>
    findExpandedItemByRoute(pathname, platformNavItems, toolsNavItems, supportNavItems),
  );

  // Auto-expand parent when navigating to a sub-item via direct URL
  useEffect(() => {
    const match = findExpandedItemByRoute(
      pathname,
      visiblePlatformNavItems,
      visibleToolsNavItems,
      visibleSupportNavItems,
    );
    if (match) {
      setExpandedItem((current) => (current === match ? current : match));
    }
  }, [pathname, visiblePlatformNavItems, visibleToolsNavItems, visibleSupportNavItems]);

  const previousPathnameRef = useRef(pathname);
  useEffect(() => {
    if (isMobile && isOpen && previousPathnameRef.current !== pathname) {
      onClose();
    }
    previousPathnameRef.current = pathname;
  }, [isMobile, isOpen, onClose, pathname]);

  const handleExpandItem = (label: string) => {
    setExpandedItem((prev) => (prev === label ? null : label));
  };

  const handleNavigate = () => {
    if (isMobile) {
      onClose();
    }
  };

  // Auto-scroll to the active nav item on page load
  const navScrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const timer = setTimeout(() => {
      const activeEl = navScrollRef.current?.querySelector("[data-active-nav]");
      if (activeEl) {
        activeEl.scrollIntoView({ block: "center", behavior: "instant" });
      }
    }, 200);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Only apply collapsed state on desktop (lg screens and above)
  const effectiveCollapsed = !isMobile && isCollapsed;

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        w-72 ${effectiveCollapsed ? 'lg:w-18' : 'lg:w-72'} bg-white dark:bg-card border-r border-gray-100 dark:border-border flex flex-col h-screen fixed left-0 top-0 z-40
        transition-all duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
      `}>
        {/* Mobile Close Button */}
        <button
          className="lg:hidden absolute top-4 right-4 p-1 hover:bg-gray-100 dark:hover:bg-muted rounded-lg cursor-pointer"
          onClick={onClose}
        >
          <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        </button>

        {/* Collapse Toggle Button */}
        <button
          className="hidden lg:flex absolute -right-3 top-7 w-6 h-6 bg-white dark:bg-muted border border-gray-200 dark:border-border rounded-full items-center justify-center shadow-base hover:bg-gray-50 dark:hover:bg-secondary cursor-pointer z-50"
          onClick={onToggleCollapse}
          title={isCollapsed ? t("dashboard.sidebar.expand") : t("dashboard.sidebar.collapse")}
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          ) : (
            <ChevronLeft className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          )}
        </button>

        <Logo collapsed={effectiveCollapsed} />

        {/* Navigation */}
        <div ref={navScrollRef} className="flex-1 mt-6 overflow-y-auto scrollbar-thin">
          <NavSection
            title={t("dashboard.sidebar.platform")}
            items={visiblePlatformNavItems}
            isCollapsed={effectiveCollapsed}
            expandedItem={expandedItem}
            onExpandItem={handleExpandItem}
            onNavigate={handleNavigate}
            pathname={pathname}
            localize={localize}
          />
          <NavSection
            title={t("dashboard.sidebar.tools")}
            items={visibleToolsNavItems}
            isCollapsed={effectiveCollapsed}
            expandedItem={expandedItem}
            onExpandItem={handleExpandItem}
            onNavigate={handleNavigate}
            pathname={pathname}
            localize={localize}
          />
          <NavSection
            title={t("dashboard.sidebar.support")}
            items={visibleSupportNavItems}
            isCollapsed={effectiveCollapsed}
            expandedItem={expandedItem}
            onExpandItem={handleExpandItem}
            onNavigate={handleNavigate}
            pathname={pathname}
            localize={localize}
          />
        </div>

        {/* Account Section */}
        <div className={`${effectiveCollapsed ? 'p-2' : 'p-4'} border-t border-gray-100 dark:border-border`}>
          {effectiveCollapsed ? (
            <div className="flex flex-col items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-linear-to-br from-gray-100 to-gray-200 dark:from-secondary dark:to-muted flex items-center justify-center cursor-pointer" title={localize("Enterprise")}>
                <span className="text-gray-500 dark:text-gray-400 text-sm font-medium">E</span>
              </div>
              <button className="p-2 hover:bg-gray-100 dark:hover:bg-muted rounded-lg cursor-pointer" title={t("dashboard.header.getCli")}>
                <Download className="w-4 h-4 text-gray-500 dark:text-gray-400" strokeWidth={1.8} />
              </button>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-linear-to-br from-gray-100 to-gray-200 dark:from-secondary dark:to-muted flex items-center justify-center">
                    <span className="text-gray-500 dark:text-gray-400 text-sm font-medium">E</span>
                  </div>
                  <span className="text-[14px] font-medium text-gray-900 dark:text-gray-100">{localize("Enterprise")}</span>
                </div>
                <button className="px-3 py-1.5 text-xs font-semibold text-primary bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors cursor-pointer">
                  {t("dashboard.sidebar.manage")}
                </button>
              </div>

              {/* API Usage */}
              <div className="mb-4">
                <div className="h-1 bg-gray-100 dark:bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full"
                    style={{ width: "45%" }}
                  />
                </div>
                <p className="text-[12px] text-gray-400 mt-2">{formatMessage(language, "dashboard.sidebar.apiCalls", { used: "4,500", total: "10,000" })}</p>
              </div>

              {/* Download App */}
              <button className="flex items-center gap-2 text-[13px] text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors cursor-pointer">
                <Download className="w-4 h-4" strokeWidth={1.8} />
                {t("dashboard.header.getCli")}
              </button>
            </>
          )}
        </div>
      </aside>
    </>
  );
}
