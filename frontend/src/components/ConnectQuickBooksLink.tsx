"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const INTEGRATIONS = "/settings/integrations";
const LOGIN_NEXT = "/login?next=/settings/integrations";

type Props = {
  className?: string;
  children: React.ReactNode;
};

/**
 * Links to integrations when the user has a token, otherwise to login with next=/settings/integrations.
 * Uses client-side token check so landing page can stay static.
 */
export default function ConnectQuickBooksLink({ className, children }: Props) {
  const [href, setHref] = useState(LOGIN_NEXT);

  useEffect(() => {
    setHref(typeof window !== "undefined" && localStorage.getItem("access_token") ? INTEGRATIONS : LOGIN_NEXT);
  }, []);

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}
