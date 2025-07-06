"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner, ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "light" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      style={
        {
          "--normal-bg": "var(--sonner)",
          "--normal-text": "var(--sonner-foreground)",
          "--normal-border": "var(--sonner-border)",
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
