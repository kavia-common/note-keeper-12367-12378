"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type Note = {
  id: string;
  title: string;
  content: string;
  updatedAt: number;
};

type NotesContextType = {
  notes: Note[];
  selectedId: string | null;
  filter: string;
  filteredNotes: Note[];
  // PUBLIC_INTERFACE
  createNote: () => string;
  // PUBLIC_INTERFACE
  updateNote: (id: string, data: Partial<Pick<Note, "title" | "content">>) => void;
  // PUBLIC_INTERFACE
  deleteNote: (id: string) => void;
  // PUBLIC_INTERFACE
  selectNote: (id: string | null) => void;
  // PUBLIC_INTERFACE
  setFilter: (q: string) => void;
};

const NotesContext = createContext<NotesContextType | undefined>(undefined);

function uid() {
  return Math.random().toString(36).slice(2);
}

/**
 * PUBLIC_INTERFACE
 * NotesProvider encapsulates note state and CRUD.
 * It persists notes to localStorage to simulate a backend.
 */
export function NotesProvider({ children }: { children: React.ReactNode }) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [filter, setFilter] = useState("");

  // hydrate
  useEffect(() => {
    const raw = localStorage.getItem("nk_notes");
    const rawSel = localStorage.getItem("nk_selected");
    if (raw) {
      try {
        const parsed: Note[] = JSON.parse(raw);
        setNotes(parsed);
      } catch {
        localStorage.removeItem("nk_notes");
      }
    }
    if (rawSel) {
      setSelectedId(rawSel);
    }
  }, []);

  // persist
  useEffect(() => {
    localStorage.setItem("nk_notes", JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    if (selectedId) localStorage.setItem("nk_selected", selectedId);
    else localStorage.removeItem("nk_selected");
  }, [selectedId]);

  const filteredNotes = useMemo(() => {
    const q = filter.trim().toLowerCase();
    if (!q) return [...notes].sort((a, b) => b.updatedAt - a.updatedAt);
    return [...notes]
      .filter(
        (n) =>
          n.title.toLowerCase().includes(q) ||
          n.content.toLowerCase().includes(q)
      )
      .sort((a, b) => b.updatedAt - a.updatedAt);
  }, [notes, filter]);

  const createNote = () => {
    const id = uid();
    const now = Date.now();
    setNotes((prev) => [
      { id, title: "Untitled", content: "", updatedAt: now },
      ...prev,
    ]);
    setSelectedId(id);
    return id;
  };

  const updateNote = (id: string, data: Partial<Pick<Note, "title" | "content">>) => {
    setNotes((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, ...data, updatedAt: Date.now() } : n
      )
    );
  };

  const deleteNote = (id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
    setSelectedId((sel) => (sel === id ? null : sel));
  };

  const value: NotesContextType = {
    notes,
    selectedId,
    filter,
    filteredNotes,
    createNote,
    updateNote,
    deleteNote,
    selectNote: setSelectedId,
    setFilter,
  };

  return <NotesContext.Provider value={value}>{children}</NotesContext.Provider>;
}

/**
 * PUBLIC_INTERFACE
 * useNotes provides access to notes state and CRUD operations.
 */
export function useNotes() {
  const ctx = useContext(NotesContext);
  if (!ctx) throw new Error("useNotes must be used within NotesProvider");
  return ctx;
}
