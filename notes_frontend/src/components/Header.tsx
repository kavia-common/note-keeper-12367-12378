"use client";

import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

/**
 * PUBLIC_INTERFACE
 * Header displays the app title, global search hint, and auth actions.
 */
export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
        <Link href="/notes" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-md bg-[var(--color-accent)]" />
          <span className="text-lg font-semibold tracking-tight text-slate-900">
            Note Keeper
          </span>
        </Link>
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <span className="hidden sm:block text-sm text-slate-600">
                {user.email}
              </span>
              <button
                onClick={logout}
                className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm hover:bg-slate-50"
              >
                Sign out
              </button>
            </>
          ) : (
            <Link
              href="/auth"
              className="rounded-lg bg-[var(--color-primary)] px-3 py-1.5 text-sm text-white hover:opacity-95"
            >
              Sign in
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
