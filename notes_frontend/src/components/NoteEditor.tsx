"use client";

import { Note } from "@/context/NotesContext";
import { useEffect, useState } from "react";

type Props = {
  note: Note | null;
  onChange: (title: string, content: string) => void;
  onCreate: () => void;
  onDelete: () => void;
};

/**
 * PUBLIC_INTERFACE
 * NoteEditor allows editing of the selected note's title and content.
 * It debounces updates for performance and a smoother UX.
 */
export default function NoteEditor({ note, onChange, onCreate, onDelete }: Props) {
  const [title, setTitle] = useState(note?.title ?? "");
  const [content, setContent] = useState(note?.content ?? "");

  useEffect(() => {
    setTitle(note?.title ?? "");
    setContent(note?.content ?? "");
  }, [note?.id, note?.title, note?.content]);

  // debounce updates
  useEffect(() => {
    const id = setTimeout(() => {
      if (note) onChange(title, content);
    }, 250);
    return () => clearTimeout(id);
  }, [title, content, note, onChange]);

  if (!note) {
    return (
      <div className="h-[calc(100vh-57px)] flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-600">Select a note to start editing</p>
          <button
            onClick={onCreate}
            className="mt-3 rounded-lg bg-[var(--color-primary)] px-3 py-2 text-white text-sm hover:opacity-95"
          >
            Create a note
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-57px)] flex flex-col">
      <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Untitled"
          className="flex-1 text-lg font-medium outline-none placeholder:text-slate-400"
        />
        <div className="flex items-center gap-2">
          <button
            onClick={onCreate}
            className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm hover:bg-slate-50"
          >
            New
          </button>
          <button
            onClick={onDelete}
            className="rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-sm text-red-700 hover:bg-red-100"
          >
            Delete
          </button>
        </div>
      </div>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Start typing your note..."
        className="flex-1 resize-none p-4 outline-none"
      />
    </div>
  );
}
