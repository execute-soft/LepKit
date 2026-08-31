export const DEFAULT_LANGUAGE = "en" as const;
export const LANGUAGE_STORAGE_KEY = "admin.language";

export const SUPPORTED_LANGUAGES = [
  { code: "en", label: "English", nativeLabel: "English" },
  { code: "bn", label: "Bangla", nativeLabel: "বাংলা" },
] as const;

export type Language = (typeof SUPPORTED_LANGUAGES)[number]["code"];

type TranslationMap = Record<string, string>;

const translations: Record<Language, TranslationMap> = {
  en: {
    "common.language": "Language",
    "common.search.placeholder.short": "Search...",
    "common.search.placeholder.long": "Search stores, merchants, or orders...",

    "auth.login.title": "Sign in",
    "auth.login.subtitle":
      "Use your StockEye account to continue.",
    "auth.login.portalLabel": "Admin console",
    "auth.login.emailPlaceholder": "Email",
    "auth.login.passwordPlaceholder": "Password",
    "auth.login.rememberMe": "Stay logged in for 7 days",
    "auth.login.signIn": "Sign in",
    "auth.login.signInFailed": "Sign-in failed",
    "auth.login.forgotPassword": "Forgot password?",
    "auth.login.needHelp": "Need account help?",
    "auth.login.noAccount": "Don't have an account?",
    "auth.login.createOrg": "Create Organization",
    "auth.login.termsOfService": "Terms of Service",
    "auth.login.showPassword": "Show password",
    "auth.login.hidePassword": "Hide password",
    "auth.login.fallbackError": "Login failed.",
    "auth.login.adminOnly":
      "This portal is only for {types} users.",
    "auth.validation.invalidEmail": "Please enter a valid email address",
    "auth.validation.passwordLength":
      "Password must be at least 8 characters long",

    "auth.preview.highlights": "Admin Console Highlights:",
    "auth.preview.systemHealth": "System health and uptime at a glance",
    "auth.preview.realtimeAlerts": "Real-time alerts with incident tracking",
    "auth.preview.roleAccess": "Role-based access and permissions",
    "auth.preview.auditLogs": "Centralized configuration and audit logs",

    "dashboard.header.notifications": "Notifications",
    "dashboard.header.markAllRead": "Mark all as read",
    "dashboard.header.viewAllNotifications": "View all notifications",
    "dashboard.header.activityLog": "Activity log",
    "dashboard.header.integrations": "Integrations",
    "dashboard.header.theme": "Theme",
    "dashboard.header.settings": "Settings",
    "dashboard.header.upgradeEnterprise": "Upgrade to Enterprise",
    "dashboard.header.getCli": "Get Execute CLI",
    "dashboard.header.logout": "Log out",
    "dashboard.header.profileFallbackName": "User",
    "dashboard.header.profileFallbackEmail": "No email",
    "dashboard.sidebar.platform": "Platform",
    "dashboard.sidebar.tools": "Tools",
    "dashboard.sidebar.support": "Support",
    "dashboard.sidebar.expand": "Expand sidebar",
    "dashboard.sidebar.collapse": "Collapse sidebar",
    "dashboard.sidebar.manage": "Manage",
    "dashboard.sidebar.apiCalls": "{used} / {total} API calls",
    "dashboard.placeholderPage":
      "This is a placeholder page. Wire your real content here.",

    "notFound.title": "Page not found",
    "notFound.descriptionPrefix": "The page",
    "notFound.descriptionSuffix": "doesn't exist or has been moved.",
    "notFound.goBack": "Go Back",
    "notFound.dashboard": "Dashboard",
    "static.unauthorized.title": "Access unavailable",
    "static.unauthorized.description":
      "This account does not have permission to open that admin area. Use a different account or ask an administrator to update your access.",
    "static.error.title": "Something went wrong",
    "static.error.description":
      "The admin console could not complete this request. Retry the page, then contact support if it keeps failing.",
    "static.error.retry": "Retry",
    "static.maintenance.title": "Maintenance in progress",
    "static.maintenance.description":
      "This admin area is temporarily unavailable while platform maintenance is running.",
    "static.maintenance.note":
      "Operators can retry shortly. Critical customer data remains protected while maintenance mode is active.",
  },
  bn: {
    "common.language": "ভাষা",
    "common.search.placeholder.short": "সার্চ...",
    "common.search.placeholder.long":
      "স্টোর, মার্চেন্ট বা অর্ডার সার্চ করুন...",

    "auth.login.title": "সাইন ইন",
    "auth.login.subtitle":
      "চালিয়ে যেতে আপনার StockEye অ্যাকাউন্ট ব্যবহার করুন।",
    "auth.login.portalLabel": "অ্যাডমিন কনসোল",
    "auth.login.emailPlaceholder": "ইমেইল",
    "auth.login.passwordPlaceholder": "পাসওয়ার্ড",
    "auth.login.rememberMe": "৭ দিন লগইন অবস্থায় রাখুন",
    "auth.login.signIn": "সাইন ইন",
    "auth.login.signInFailed": "সাইন ইন ব্যর্থ হয়েছে",
    "auth.login.forgotPassword": "পাসওয়ার্ড ভুলে গেছেন?",
    "auth.login.needHelp": "অ্যাকাউন্ট সহায়তা লাগবে?",
    "auth.login.noAccount": "অ্যাকাউন্ট নেই?",
    "auth.login.createOrg": "অর্গানাইজেশন তৈরি করুন",
    "auth.login.termsOfService": "সেবার শর্তাবলী",
    "auth.login.showPassword": "পাসওয়ার্ড দেখান",
    "auth.login.hidePassword": "পাসওয়ার্ড লুকান",
    "auth.login.fallbackError": "লগইন ব্যর্থ হয়েছে।",
    "auth.login.adminOnly":
      "এই পোর্টাল শুধুমাত্র {types} ব্যবহারকারীদের জন্য।",
    "auth.validation.invalidEmail": "সঠিক ইমেইল ঠিকানা লিখুন",
    "auth.validation.passwordLength":
      "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে",

    "auth.preview.highlights": "অ্যাডমিন কনসোলের মূল বৈশিষ্ট্য:",
    "auth.preview.systemHealth": "এক নজরে সিস্টেম হেলথ ও আপটাইম",
    "auth.preview.realtimeAlerts": "রিয়েল-টাইম অ্যালার্ট ও ইনসিডেন্ট ট্র্যাকিং",
    "auth.preview.roleAccess": "রোল-ভিত্তিক অ্যাক্সেস ও পারমিশন",
    "auth.preview.auditLogs": "কেন্দ্রীয় কনফিগারেশন ও অডিট লগ",

    "dashboard.header.notifications": "নোটিফিকেশন",
    "dashboard.header.markAllRead": "সব পড়া হয়েছে হিসেবে চিহ্নিত করুন",
    "dashboard.header.viewAllNotifications": "সব নোটিফিকেশন দেখুন",
    "dashboard.header.activityLog": "অ্যাক্টিভিটি লগ",
    "dashboard.header.integrations": "ইন্টিগ্রেশন",
    "dashboard.header.theme": "থিম",
    "dashboard.header.settings": "সেটিংস",
    "dashboard.header.upgradeEnterprise": "এন্টারপ্রাইজে আপগ্রেড করুন",
    "dashboard.header.getCli": "Execute CLI নিন",
    "dashboard.header.logout": "লগ আউট",
    "dashboard.header.profileFallbackName": "ব্যবহারকারী",
    "dashboard.header.profileFallbackEmail": "ইমেইল নেই",
    "dashboard.sidebar.platform": "প্ল্যাটফর্ম",
    "dashboard.sidebar.tools": "টুলস",
    "dashboard.sidebar.support": "সাপোর্ট",
    "dashboard.sidebar.expand": "সাইডবার প্রসারিত করুন",
    "dashboard.sidebar.collapse": "সাইডবার সংকুচিত করুন",
    "dashboard.sidebar.manage": "ম্যানেজ",
    "dashboard.sidebar.apiCalls": "{used} / {total} API কল",
    "dashboard.placeholderPage":
      "এটি একটি প্লেসহোল্ডার পেজ। এখানে আপনার আসল কনটেন্ট যুক্ত করুন।",

    "notFound.title": "পেজটি পাওয়া যায়নি",
    "notFound.descriptionPrefix": "এই পেজ",
    "notFound.descriptionSuffix": "নেই অথবা সরিয়ে ফেলা হয়েছে।",
    "notFound.goBack": "পেছনে যান",
    "notFound.dashboard": "ড্যাশবোর্ড",
    "static.unauthorized.title": "অ্যাক্সেস পাওয়া যায়নি",
    "static.unauthorized.description":
      "এই অ্যাকাউন্টে ওই অ্যাডমিন এলাকায় যাওয়ার অনুমতি নেই। অন্য অ্যাকাউন্ট ব্যবহার করুন অথবা অ্যাডমিনকে অ্যাক্সেস আপডেট করতে বলুন।",
    "static.error.title": "কিছু ভুল হয়েছে",
    "static.error.description":
      "অ্যাডমিন কনসোল এই অনুরোধটি সম্পন্ন করতে পারেনি। পেজটি আবার চেষ্টা করুন, সমস্যা থাকলে সাপোর্টে যোগাযোগ করুন।",
    "static.error.retry": "আবার চেষ্টা করুন",
    "static.maintenance.title": "মেইনটেন্যান্স চলছে",
    "static.maintenance.description":
      "প্ল্যাটফর্ম মেইনটেন্যান্স চলায় এই অ্যাডমিন এলাকা সাময়িকভাবে unavailable।",
    "static.maintenance.note":
      "অপারেটররা কিছুক্ষণ পর আবার চেষ্টা করতে পারবেন। মেইনটেন্যান্স চলাকালীন গুরুত্বপূর্ণ কাস্টমার ডেটা সুরক্ষিত থাকে।",
  },
};

const phraseTranslationsBn: Record<string, string> = {
  "Dashboard": "ড্যাশবোর্ড",
  "All Products": "সব প্রোডাক্ট",
  "Add Product": "প্রোডাক্ট যোগ করুন",
  "Add New Store": "নতুন স্টোর যোগ করুন",
  "Store Settings": "স্টোর সেটিংস",
  "All Orders": "সব অর্ডার",
  "Abandoned Carts": "পরিত্যক্ত কার্ট",
  "All Customers": "সব কাস্টমার",
  "Support Tickets": "সাপোর্ট টিকিট",
  "All Merchants": "সব মার্চেন্ট",
  "Pending Approval": "অনুমোদনের অপেক্ষায়",
  "Theme Builder": "থিম বিল্ডার",
  "App Marketplace": "অ্যাপ মার্কেটপ্লেস",
  "Payment Methods": "পেমেন্ট মেথড",
  "Payout Batches": "পেআউট ব্যাচ",
  "Fees & Adjustments": "ফি ও সমন্বয়",
  "Taxes & Duties": "ট্যাক্স ও ডিউটি",
  "Tax Rules": "ট্যাক্স নিয়ম",
  "VAT/GST": "ভ্যাট/জিএসটি",
  "Billing Cycles": "বিলিং সাইকেল",
  "In-store Orders": "ইন-স্টোর অর্ডার",
  "Localization & Currency": "লোকালাইজেশন ও মুদ্রা",
  "FX Rates": "এফএক্স রেট",
  "Pricing Rules": "প্রাইসিং নিয়ম",
  "Price Lists": "প্রাইস তালিকা",
  "Tiered Pricing": "ধাপভিত্তিক প্রাইসিং",
  "Stock Alerts": "স্টক অ্যালার্ট",
  "Low Stock": "কম স্টক",
  "Reorder Points": "রি-অর্ডার পয়েন্ট",
  "Vendors & Purchasing": "ভেন্ডর ও পারচেজিং",
  "Purchase Orders": "পারচেজ অর্ডার",
  "Goods Receipts": "গুডস রিসিপ্ট",
  "Returns & RMAs": "রিটার্ন ও আরএমএ",
  "Shipping & Logistics": "শিপিং ও লজিস্টিকস",
  "Rates & Zones": "রেট ও জোন",
  "Loyalty & Referrals": "লয়্যালটি ও রেফারেল",
  "Loyalty Programs": "লয়্যালটি প্রোগ্রাম",
  "Points Rules": "পয়েন্টস নিয়ম",
  "Referral Links": "রেফারেল লিংক",
  "Gift Cards": "গিফট কার্ড",
  "A/B Testing": "এ/বি টেস্টিং",
  "Social Ads": "সোশ্যাল বিজ্ঞাপন",
  "ROAS Dashboard": "ROAS ড্যাশবোর্ড",
  "Conversion API": "কনভার্শন API",
  "Audience Sync": "অডিয়েন্স সিঙ্ক",
  "Creatives Library": "ক্রিয়েটিভস লাইব্রেরি",
  "UTM Builder": "UTM বিল্ডার",
  "Email Marketing": "ইমেইল মার্কেটিং",
  "SMS Marketing": "এসএমএস মার্কেটিং",
  "Push Notifications": "পুশ নোটিফিকেশন",
  "API Keys": "API কী",
  "Audit Logs": "অডিট লগ",
  "Fraud Risk": "প্রতারনা ঝুঁকি",
  "Fraud Checks": "প্রতারনা যাচাই",
  "Data Privacy": "ডেটা প্রাইভেসি",
  "Audit Reports": "অডিট রিপোর্ট",
  "Manage settings settings and data.": "সেটিংসের সেটিংস ও ডেটা পরিচালনা করুন।",
  "Manage pos settings and data.": "POS সেটিংস ও ডেটা পরিচালনা করুন।",
};

const tokenTranslationsBn: Record<string, string> = {
  dashboard: "ড্যাশবোর্ড",
  products: "প্রোডাক্ট",
  product: "প্রোডাক্ট",
  catalog: "ক্যাটালগ",
  categories: "ক্যাটাগরি",
  collections: "কালেকশন",
  inventory: "ইনভেন্টরি",
  attributes: "অ্যাট্রিবিউট",
  brands: "ব্র্যান্ড",
  stores: "স্টোর",
  store: "স্টোর",
  orders: "অর্ডার",
  pending: "অপেক্ষমান",
  completed: "সম্পন্ন",
  refunds: "রিফান্ড",
  fulfillment: "ফুলফিলমেন্ট",
  returns: "রিটার্ন",
  abandoned: "পরিত্যক্ত",
  customers: "কাস্টমার",
  segments: "সেগমেন্ট",
  reviews: "রিভিউ",
  support: "সাপোর্ট",
  merchants: "মার্চেন্ট",
  analytics: "অ্যানালিটিক্স",
  reports: "রিপোর্ট",
  themes: "থিম",
  templates: "টেমপ্লেট",
  custom: "কাস্টম",
  payments: "পেমেন্ট",
  transactions: "ট্রানজ্যাকশন",
  payouts: "পেআউট",
  methods: "মেথড",
  settlements: "সেটেলমেন্ট",
  reconciliation: "রিকনসিলিয়েশন",
  fees: "ফি",
  taxes: "ট্যাক্স",
  regions: "রিজিয়ন",
  exemptions: "এক্সেম্পশন",
  subscriptions: "সাবস্ক্রিপশন",
  plans: "প্ল্যান",
  billing: "বিলিং",
  cycles: "সাইকেল",
  dunning: "ডানিং",
  pos: "POS",
  terminals: "টার্মিনাল",
  registers: "রেজিস্টার",
  localization: "লোকালাইজেশন",
  languages: "ভাষা",
  currencies: "মুদ্রা",
  pricing: "প্রাইসিং",
  promotions: "প্রোমোশন",
  stock: "স্টক",
  alerts: "অ্যালার্ট",
  backorders: "ব্যাকঅর্ডার",
  vendors: "ভেন্ডর",
  suppliers: "সাপ্লায়ার",
  purchase: "পারচেজ",
  goods: "গুডস",
  receipts: "রিসিপ্ট",
  shipping: "শিপিং",
  tracking: "ট্র্যাকিং",
  marketing: "মার্কেটিং",
  campaigns: "ক্যাম্পেইন",
  coupons: "কুপন",
  messaging: "মেসেজিং",
  email: "ইমেইল",
  loyalty: "লয়্যালটি",
  referrals: "রেফারেল",
  links: "লিংক",
  rewards: "রিওয়ার্ড",
  discounts: "ডিসকাউন্ট",
  bundles: "বান্ডেল",
  warehousing: "ওয়্যারহাউজিং",
  locations: "লোকেশন",
  transfers: "ট্রান্সফার",
  integrations: "ইন্টিগ্রেশন",
  accounting: "অ্যাকাউন্টিং",
  affiliates: "অ্যাফিলিয়েট",
  commissions: "কমিশন",
  compliance: "কমপ্লায়েন্স",
  privacy: "প্রাইভেসি",
  policies: "পলিসি",
  automation: "অটোমেশন",
  workflows: "ওয়ার্কফ্লো",
  triggers: "ট্রিগার",
  webhooks: "ওয়েবহুক",
  logs: "লগ",
  settings: "সেটিংস",
  general: "জেনারেল",
  security: "নিরাপত্তা",
  notifications: "নোটিফিকেশন",
  team: "টিম",
  docs: "ডকস",
  enterprise: "এন্টারপ্রাইজ",
  manage: "পরিচালনা করুন",
  and: "ও",
  data: "ডেটা",
};

export function isSupportedLanguage(value: string): value is Language {
  return SUPPORTED_LANGUAGES.some((item) => item.code === value);
}

export function resolveInitialLanguage(): Language {
  if (typeof window === "undefined") {
    return DEFAULT_LANGUAGE;
  }

  const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
  if (stored && isSupportedLanguage(stored)) {
    return stored;
  }

  const browserLanguage = window.navigator.language.toLowerCase();
  if (browserLanguage.startsWith("bn")) {
    return "bn";
  }

  return DEFAULT_LANGUAGE;
}

export function translate(language: Language, key: string): string {
  return translations[language][key] ?? translations[DEFAULT_LANGUAGE][key] ?? key;
}

export function formatMessage(
  language: Language,
  key: string,
  params: Record<string, string | number>,
): string {
  let message = translate(language, key);
  for (const [paramKey, value] of Object.entries(params)) {
    message = message.replaceAll(`{${paramKey}}`, String(value));
  }
  return message;
}

export function translateLooseText(language: Language, text: string): string {
  if (language === "en") return text;

  if (phraseTranslationsBn[text]) {
    return phraseTranslationsBn[text];
  }

  const manageMatch = text.match(/^Manage (.+) settings and data\.$/i);
  if (manageMatch) {
    const scope = manageMatch[1];
    if (!scope) {
      return text;
    }

    const translatedScope = translateLooseText(language, scope);
    return `${translatedScope} সেটিংস ও ডেটা পরিচালনা করুন।`;
  }

  return text
    .split(/(\s+|\/|-|&|\(|\)|,)/)
    .map((part) => {
      const normalized = part.trim().toLowerCase();
      if (!normalized || /^[\/\-&,()]+$/.test(part) || /^\s+$/.test(part)) {
        return part;
      }
      const translated = tokenTranslationsBn[normalized];
      if (!translated) return part;
      return translated;
    })
    .join("");
}
