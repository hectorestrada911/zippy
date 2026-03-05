"use client";

import { TwentyFirstToolbar } from "@21st-extension/toolbar-next";
import { ReactPlugin } from "@21st-extension/react";

/**
 * Only mounts the 21st.dev Toolbar when NEXT_PUBLIC_21ST_TOOLBAR is set.
 * When the toolbar is loaded but the browser extension isn't connected,
 * it triggers "Max reconnection attempts reached" and [object Event] in the console.
 */
export function TwentyFirstToolbarWrapper() {
  const enabled =
    process.env.NODE_ENV === "development" &&
    process.env.NEXT_PUBLIC_21ST_TOOLBAR === "true";

  if (!enabled) return null;

  return <TwentyFirstToolbar config={{ plugins: [ReactPlugin] }} />;
}
