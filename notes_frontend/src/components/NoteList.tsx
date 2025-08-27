"use client";

import { Note } from "@/context/NotesContext";

type Props = {
  notes: Note[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
};

/**
 * PUBLIC_INTERFACE
 * NoteList renders a vertical list of notes with title, preview, and updated time.
 */
export default function NoteList({ notes, selectedId, onSelect, onDelete }: Props) {
  return (
    <div className="h-[calc(100vh-57px)] overflow-y-auto">
      {notes.length === 0 ? (
        <div className="p-6 text-sm text-slate-600">No notes yet.</div>
      ) : (
        <ul>
          {notes.map((n) => (
            <li
              key={n.id}
              className={`group border-b border-slate-100 px-4 py-3 cursor-pointer ${
                selectedId === n.id ? "bg-[var(--color-secondary)]" : "bg-white"
              } hover:bg-[var(--color-secondary)]`}
              onClick={() => onSelect(n.id)}
            >
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-sm font-medium text-slate-900 line-clamp-1">
                  {n.title || "Untitled"}
                </h3>
                <button
                  className="invisible group-hover:visible text-xs text-red-600 hover:underline"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(n.id);
                  }}
                >
                  Delete
                </button>
              </div>
              <p className="mt-1 text-xs text-slate-600 line-clamp-2">
                {n.content || "No content"}
              </p>
              <p className="mt-1 text-[10px] text-slate-500">
                {new Date(n.updatedAt).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
