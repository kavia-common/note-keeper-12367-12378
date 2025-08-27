"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.replace("/notes");
    }
  }, [user, router]);

  return (
    <main className="min-h-screen bg-[var(--color-bg)] flex items-center justify-center">
      <div className="max-w-xl mx-auto p-8 rounded-2xl border border-slate-200 bg-white shadow-sm">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
          Note Keeper
        </h1>
        <p className="mt-2 text-slate-600">
          A modern, minimalistic note-taking app. Sign in to start creating notes.
        </p>
        <div className="mt-6 flex items-center gap-3">
          <Link
            href="/auth"
            className="rounded-lg bg-[var(--color-primary)] px-4 py-2 text-white hover:opacity-95"
          >
            Sign in
          </Link>
          <Link
            href="/notes"
            className="rounded-lg border border-slate-300 px-4 py-2 hover:bg-slate-50"
          >
            Continue as guest
          </Link>
        </div>
      </div>
    </main>
  );
}
