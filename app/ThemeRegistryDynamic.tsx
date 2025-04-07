"use client";

import dynamic from "next/dynamic";

const ThemeRegistryDynamic = dynamic(() => import("./ThemeRegistry"), {
  ssr: false,
});

export default function ClientThemeRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ThemeRegistryDynamic>{children}</ThemeRegistryDynamic>;
}
