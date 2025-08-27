import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { NotesProvider } from "@/context/NotesContext";

export const metadata: Metadata = {
  title: "Note Keeper",
  description: "A minimal note-taking app with client-side auth and CRUD.",
  openGraph: {
    title: "Note Keeper",
    description: "A minimal note-taking app with client-side auth and CRUD.",
    type: "website",
    url: "http://localhost:3000",
  },
};

type ThemeVars = Partial<Record<`--color-${"primary" | "secondary" | "accent" | "bg"}`, string>>;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // CSS variables reflect the required palette
  // primary: #2563eb, secondary: #f1f5f9, accent: #f59e42
  const themeVars: ThemeVars = {
    "--color-primary": "#2563eb",
    "--color-secondary": "#f1f5f9",
    "--color-accent": "#f59e42",
    "--color-bg": "#f8fafc",
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning style={themeVars as React.CSSProperties} className="text-slate-900">
        <AuthProvider>
          <NotesProvider>{children}</NotesProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
