import { create } from "zustand";

export type Role = string;
export type PrincipalType = string;
export type Permission = string;

export const fallbackErrorMessage = "Login failed.";
export const AUTH_TOKENS_KEY = "admin.auth.tokens";
export const SHARED_AUTH_TOKENS_KEY = "system.auth.tokens";
export const ACCESS_TOKEN_KEY = "access_token";
export const ALLOWED_ADMIN_PRINCIPAL_TYPES = ["system", "staff", "admin", "owner"] as const;

type StoredAuthTokens = {
  role?: Role | null;
  principalType?: PrincipalType | null;
  rememberUntil?: string | null;
  permissions?: Permission[] | string | null;
};

export type AdminAuthTokenPayload = StoredAuthTokens & {
  accessToken?: string;
  refreshToken?: string;
  tokenType?: string;
  accessExpiresIn?: number;
  refreshExpiresIn?: number;
  userId?: string | null;
  orgId?: string | null;
  siteId?: string | null;
  roleId?: string | null;
  permissions?: Permission[] | string | null;
  rememberMe?: boolean;
};

const clearAuthFromStorage = (storage: Storage) => {
  storage.removeItem(ACCESS_TOKEN_KEY);
  storage.removeItem(AUTH_TOKENS_KEY);
  storage.removeItem(SHARED_AUTH_TOKENS_KEY);
};

const parseStoredTokens = (storage: Storage): StoredAuthTokens | null => {
  const raw = storage.getItem(AUTH_TOKENS_KEY);
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as StoredAuthTokens;
  } catch {
    return null;
  }
};

const isExpiredRememberedSession = (storage: Storage): boolean => {
  if (typeof window === "undefined" || storage !== window.localStorage) {
    return false;
  }

  const tokens = parseStoredTokens(storage);
  if (!tokens?.rememberUntil) {
    return false;
  }

  const expiresAt = Date.parse(tokens.rememberUntil);
  return !Number.isFinite(expiresAt) || expiresAt <= Date.now();
};

const getStorageWithToken = () => {
  if (typeof window === "undefined") {
    return null;
  }

  const localAccessToken = window.localStorage.getItem(ACCESS_TOKEN_KEY);
  if (localAccessToken) {
    if (isExpiredRememberedSession(window.localStorage)) {
      clearAuthFromStorage(window.localStorage);
    } else {
      return {
        storage: window.localStorage,
        accessToken: localAccessToken,
      };
    }
  }

  const sessionAccessToken = window.sessionStorage.getItem(ACCESS_TOKEN_KEY);
  if (sessionAccessToken) {
    return {
      storage: window.sessionStorage,
      accessToken: sessionAccessToken,
    };
  }

  return null;
};

const normalizePrincipalType = (value: PrincipalType | null | undefined): string | null => {
  if (!value) return null;
  return value.toLowerCase();
};

const normalizePermissions = (
  value: Permission[] | string | null | undefined,
): Permission[] => {
  if (Array.isArray(value)) {
    return value.filter((permission) => permission.trim().length > 0);
  }

  if (typeof value === "string") {
    const trimmed = value.trim();
    if (!trimmed) {
      return [];
    }

    try {
      const parsed = JSON.parse(trimmed) as unknown;
      if (Array.isArray(parsed)) {
        return parsed
          .filter((permission): permission is string => typeof permission === "string")
          .filter((permission) => permission.trim().length > 0);
      }
    } catch {
      // Fall through to comma-separated permission support.
    }

    return trimmed
      .split(",")
      .map((permission) => permission.trim())
      .filter(Boolean);
  }

  return [];
};

export const isAllowedAdminPrincipal = (
  principalType: PrincipalType | null | undefined
): boolean => {
  const normalized = normalizePrincipalType(principalType);
  if (!normalized) return false;
  return ALLOWED_ADMIN_PRINCIPAL_TYPES.includes(
    normalized as (typeof ALLOWED_ADMIN_PRINCIPAL_TYPES)[number]
  );
};

export const getStoredAccessToken = (): string | null => {
  const withToken = getStorageWithToken();
  return withToken?.accessToken ?? null;
};

export const getStoredAuthIdentity = (): {
  role: Role | null;
  principalType: PrincipalType | null;
  permissions: Permission[];
} => {
  if (typeof window === "undefined") {
    return { role: null, principalType: null, permissions: [] };
  }

  try {
    const withToken = getStorageWithToken();
    if (!withToken) {
      return { role: null, principalType: null, permissions: [] };
    }

    const parsed = parseStoredTokens(withToken.storage);
    if (!parsed) {
      return { role: null, principalType: null, permissions: [] };
    }

    return {
      role: parsed?.role ?? null,
      principalType: normalizePrincipalType(parsed?.principalType) ?? null,
      permissions: normalizePermissions(parsed?.permissions),
    };
  } catch {
    return { role: null, principalType: null, permissions: [] };
  }
};

export const clearStoredAuth = () => {
  if (typeof window === "undefined") {
    return;
  }

  for (const storage of [window.localStorage, window.sessionStorage]) {
    clearAuthFromStorage(storage);
  }
};

export const buildRememberUntil = (days = 7) =>
  new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString();

export const persistAdminAuthTokens = ({
  rememberMe,
  tokens,
}: {
  rememberMe: boolean;
  tokens: AdminAuthTokenPayload;
}) => {
  if (typeof window === "undefined") {
    return;
  }

  const targetStorage = rememberMe ? window.localStorage : window.sessionStorage;
  const otherStorage = rememberMe ? window.sessionStorage : window.localStorage;
  const normalizedTokens: AdminAuthTokenPayload = {
    ...tokens,
    rememberMe,
    rememberUntil: rememberMe ? tokens.rememberUntil ?? buildRememberUntil(7) : null,
  };

  if (normalizedTokens.accessToken) {
    targetStorage.setItem(ACCESS_TOKEN_KEY, normalizedTokens.accessToken);
  }
  targetStorage.setItem(AUTH_TOKENS_KEY, JSON.stringify(normalizedTokens));
  targetStorage.setItem(SHARED_AUTH_TOKENS_KEY, JSON.stringify(normalizedTokens));

  otherStorage.removeItem(ACCESS_TOKEN_KEY);
  otherStorage.removeItem(AUTH_TOKENS_KEY);
  otherStorage.removeItem(SHARED_AUTH_TOKENS_KEY);
};

const readAuthFromStorage = (): {
  isAuthenticated: boolean;
  role: Role | null;
  principalType: PrincipalType | null;
  permissions: Permission[];
} => {
  if (typeof window === "undefined") {
    return { isAuthenticated: false, role: null, principalType: null, permissions: [] };
  }

  try {
    let localAccessToken = window.localStorage.getItem(ACCESS_TOKEN_KEY);
    if (localAccessToken && isExpiredRememberedSession(window.localStorage)) {
      clearAuthFromStorage(window.localStorage);
      localAccessToken = null;
    }
    const sessionAccessToken = window.sessionStorage.getItem(ACCESS_TOKEN_KEY);
    const accessToken = localAccessToken || sessionAccessToken;

    if (!accessToken) {
      return { isAuthenticated: false, role: null, principalType: null, permissions: [] };
    }

    const storage = localAccessToken ? window.localStorage : window.sessionStorage;
    const parsed = parseStoredTokens(storage);
    if (!parsed) {
      return { isAuthenticated: true, role: null, principalType: null, permissions: [] };
    }

    return {
      isAuthenticated: true,
      role: parsed?.role ?? null,
      principalType: normalizePrincipalType(parsed?.principalType) ?? null,
      permissions: normalizePermissions(parsed?.permissions),
    };
  } catch {
    return { isAuthenticated: false, role: null, principalType: null, permissions: [] };
  }
};

type AuthState = {
  isAuthenticated: boolean;
  role: Role | null;
  principalType: PrincipalType | null;
  permissions: Permission[];
  login: (identity?: {
    role?: Role;
    principalType?: PrincipalType;
    permissions?: Permission[] | string | null;
  }) => void;
  logout: () => void;
  setRole: (role: Role | null) => void;
  setPrincipalType: (principalType: PrincipalType | null) => void;
  setPermissions: (permissions: Permission[] | string | null | undefined) => void;
};

export const useAuth = create<AuthState>((set) => ({
  ...readAuthFromStorage(),
  login: (identity) =>
    set({
      isAuthenticated: true,
      role: identity?.role ?? "user",
      principalType: normalizePrincipalType(identity?.principalType) ?? null,
      permissions: normalizePermissions(identity?.permissions),
    }),
  logout: () => {
    clearStoredAuth();
    set({ isAuthenticated: false, role: null, principalType: null, permissions: [] });
  },
  setRole: (role) => set({ role }),
  setPrincipalType: (principalType) =>
    set({ principalType: normalizePrincipalType(principalType) ?? null }),
  setPermissions: (permissions) => set({ permissions: normalizePermissions(permissions) })
}));
