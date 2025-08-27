import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[var(--color-bg)]">
      <div className="text-center">
        <h1 className="text-3xl font-semibold text-slate-900">Page not found</h1>
        <p className="mt-2 text-slate-600">The page you’re looking for doesn’t exist.</p>
        <Link
          href="/"
          className="mt-4 inline-block rounded-lg bg-[var(--color-primary)] px-4 py-2 text-white"
        >
          Go home
        </Link>
      </div>
    </main>
  );
}
