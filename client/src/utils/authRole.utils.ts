export const isSuperAdmin = (): boolean => {
  try {
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");

    const rawRole =
      currentUser?.PrimaryRole ??
      currentUser?.role ??
      localStorage.getItem("PrimaryRole") ??
      localStorage.getItem("role") ??
      "";

    const normalizedRole = String(rawRole)
      .toLowerCase()
      .replace(/[\s_-]+/g, ""); // "Super Admin" -> "superadmin"

    return normalizedRole === "superadmin";
  } catch {
    return false;
  }
};
