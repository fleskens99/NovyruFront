export function getCurrentUser() {
  try {
    const stored = sessionStorage.getItem("user");

    if (!stored) return null;

    const user = JSON.parse(stored);

    if (!Number.isInteger(user?.id) || user.id <= 0) {
      return null;
    }

    return user;
  } catch {
    return null;
  }
}
