"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const INTEGRATIONS = "/settings/integrations";
const LOGIN_NEXT = "/login?next=/settings/integrations";

type Props = {
  className?: string;
  children: React.ReactNode;
} & Omit<React.ComponentProps<typeof Link>, "href" | "className" | "children">;

/**
 * Links to integrations when the user has a token, otherwise to login with next=/settings/integrations.
 * Uses client-side token check so landing page can stay static.
 */
export default function ConnectQuickBooksLink({ className, children, ...rest }: Props) {
  const [href, setHref] = useState(LOGIN_NEXT);

  useEffect(() => {
    setHref(typeof window !== "undefined" && localStorage.getItem("access_token") ? INTEGRATIONS : LOGIN_NEXT);
  }, []);

  return (
    <Link href={href} className={className} {...rest}>
      {children}
    </Link>
  );
}
