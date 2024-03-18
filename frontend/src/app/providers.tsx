// app/providers.tsx
"use client";

import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { Toaster } from "react-hot-toast";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <NextThemesProvider
        themes={["dark", "light", "blue"]}
        attribute="class"
        defaultTheme="dark"
      >
        <Toaster position="top-center" reverseOrder={false} />
        <div className="w-screen h-screen">{children}</div>
      </NextThemesProvider>
    </NextUIProvider>
  );
}
