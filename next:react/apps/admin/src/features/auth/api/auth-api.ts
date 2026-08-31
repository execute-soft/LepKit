export async function loginAdminUser(_input: unknown) {
  return {
    accessToken: "mock-access-token-" + Date.now(),
    refreshToken: "mock-refresh-token-" + Date.now(),
  };
}

export async function fetchCurrentAdminUser() {
  return {
    userId: "mock-user-001",
    orgId: "mock-org-001",
    siteId: "mock-site-001",
    roleId: "mock-role-001",
    role: "admin" as const,
    principalType: "admin" as const,
    permissions: ["*"],
  };
}

export async function logoutAdminUser(_input?: unknown) {
  return undefined;
}
