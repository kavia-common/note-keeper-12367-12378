"use client";

import { useEffect, useMemo } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import NoteList from "@/components/NoteList";
import NoteEditor from "@/components/NoteEditor";
import { useNotes } from "@/context/NotesContext";

/**
 * NotesPage renders the main app layout composed of Header, Sidebar, and the main area
 * with NoteList and NoteEditor. It requires authentication.
 */
export default function NotesPage() {
  const router = useRouter();
  const { user } = useAuth();
  const {
    notes,
    selectedId,
    selectNote,
    createNote,
    updateNote,
    deleteNote,
    filteredNotes,
    setFilter,
    filter,
  } = useNotes();

  const selectedNote = useMemo(
    () => notes.find((n) => n.id === selectedId) || null,
    [notes, selectedId]
  );

  useEffect(() => {
    if (!user) {
      router.replace("/auth");
    }
  }, [user, router]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-slate-900">
      <Header />
      <div className="flex">
        <Sidebar
          onNewNote={() => {
            const id = createNote();
            selectNote(id);
          }}
          onSetFilter={setFilter}
          filter={filter}
        />
        <main className="flex-1 grid md:grid-cols-[360px_1fr]">
          <section className="border-r border-slate-200 bg-white">
            <NoteList
              notes={filteredNotes}
              selectedId={selectedId}
              onSelect={selectNote}
              onDelete={deleteNote}
            />
          </section>
          <section className="bg-white">
            <NoteEditor
              note={selectedNote}
              onChange={(title, content) => {
                if (selectedNote) updateNote(selectedNote.id, { title, content });
              }}
              onCreate={() => {
                const id = createNote();
                selectNote(id);
              }}
              onDelete={() => {
                if (selectedNote) {
                  deleteNote(selectedNote.id);
                }
              }}
            />
          </section>
        </main>
      </div>
    </div>
  );
}
