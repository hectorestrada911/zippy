/**
 * Turn API error messages into user-friendly copy and suggested actions.
 */
export function getFriendlyError(
  rawMessage: string
): {
  message: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
} {
  const m = rawMessage.toLowerCase();
  if (
    m.includes("unauthorized") ||
    m.includes("401") ||
    m.includes("token") ||
    m.includes("expired") ||
    m.includes("log in")
  ) {
    return {
      message: "Your session may have expired. Please log in again.",
      primary: { label: "Log in", href: "/login" },
    };
  }
  if (
    m.includes("connection failed") ||
    m.includes("quickbooks") ||
    m.includes("reconnect") ||
    m.includes("sync failed") ||
    m.includes("sync error")
  ) {
    return {
      message:
        "QuickBooks connection may have expired or the sync didn’t complete. Try reconnecting in Settings, or contact support if it keeps happening.",
      primary: { label: "Reconnect QuickBooks", href: "/settings/integrations" },
      secondary: { label: "Contact support", href: "/support" },
    };
  }
  return {
    message: rawMessage,
    primary: { label: "Contact support", href: "/support" },
  };
}
