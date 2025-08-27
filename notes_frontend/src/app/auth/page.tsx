"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

/**
 * AuthPage renders a minimal login/signup form.
 * Since there's no backend defined yet, authentication is simulated locally.
 * A successful login creates a local "user" and redirects to /notes.
 */
export default function AuthPage() {
  const router = useRouter();
  const { user, login, signup } = useAuth();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (user) {
      router.replace("/notes");
    }
  }, [user, router]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "login") {
      login(email, password);
    } else {
      signup(email, password);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-[var(--color-bg)] px-4">
      <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-semibold text-slate-900 mb-6">
          {mode === "login" ? "Welcome back" : "Create your account"}
        </h1>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm text-slate-600">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              placeholder="you@example.com"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm text-slate-600">Password</label>
            <input
              type="password"
              required
              minLength={4}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-lg bg-[var(--color-primary)] text-white py-2 font-medium hover:opacity-95 transition"
          >
            {mode === "login" ? "Sign in" : "Sign up"}
          </button>
        </form>

        <p className="mt-4 text-sm text-slate-600">
          {mode === "login" ? "No account?" : "Already have an account?"}{" "}
          <button
            type="button"
            onClick={() => setMode(mode === "login" ? "signup" : "login")}
            className="text-[var(--color-accent)] hover:underline"
          >
            {mode === "login" ? "Create one" : "Sign in"}
          </button>
        </p>

        <div className="mt-6 text-xs text-slate-500">
          <Link href="/" className="hover:underline">
            Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}
