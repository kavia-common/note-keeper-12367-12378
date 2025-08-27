"use client";

type Props = {
  onNewNote: () => void;
  onSetFilter: (q: string) => void;
  filter: string;
};

/**
 * PUBLIC_INTERFACE
 * Sidebar provides quick actions (New Note) and a filter input for searching notes.
 */
export default function Sidebar({ onNewNote, onSetFilter, filter }: Props) {
  return (
    <aside className="hidden md:block w-60 border-r border-slate-200 bg-white">
      <div className="p-4 space-y-3">
        <button
          onClick={onNewNote}
          className="w-full rounded-lg bg-[var(--color-accent)] px-3 py-2 text-white font-medium hover:opacity-95"
        >
          New Note
        </button>
        <div>
          <label className="text-xs text-slate-500">Filter</label>
          <input
            value={filter}
            onChange={(e) => onSetFilter(e.target.value)}
            placeholder="Search notes..."
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
          />
        </div>
      </div>
    </aside>
  );
}
