export default function Loading() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[var(--color-bg)]">
      <div className="flex items-center gap-3 text-slate-600">
        <span className="inline-block h-2 w-2 animate-bounce rounded-full bg-[var(--color-primary)] [animation-delay:-0.2s]" />
        <span className="inline-block h-2 w-2 animate-bounce rounded-full bg-[var(--color-primary)]" />
        <span className="inline-block h-2 w-2 animate-bounce rounded-full bg-[var(--color-primary)] [animation-delay:0.2s]" />
        <span className="ml-2">Loading…</span>
      </div>
    </main>
  );
}
