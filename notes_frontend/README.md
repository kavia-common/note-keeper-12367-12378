# Note Keeper (notes_frontend)

A modern, minimalistic Next.js app for creating, editing, viewing, and deleting notes with a responsive layout. It includes client-side "authentication" and persists data using localStorage for demo purposes.

## Features
- User authentication (client-side demo)
- Create, edit, delete notes
- View a list of notes with filtering
- Responsive design with header and sidebar
- Minimal light theme using the specified colors (primary, secondary, accent)

## Tech
- Next.js App Router
- TypeScript
- Tailwind CSS v4

## Run locally
```bash
npm install
npm run dev
```
Open http://localhost:3000

## How it works
- Authentication is simulated and stored in localStorage.
- Notes CRUD is handled in a NotesContext and persisted to localStorage.
- When a backend is available, you can replace the context logic with API calls.

## Structure
- src/context/AuthContext.tsx – client-side auth state
- src/context/NotesContext.tsx – notes state and CRUD
- src/components/* – Header, Sidebar, NoteList, NoteEditor
- src/app/auth – login/signup page
- src/app/notes – main app (list + editor)

## Theming
Defined in CSS variables:
- --color-primary: #2563eb
- --color-secondary: #f1f5f9
- --color-accent: #f59e42
- --color-bg: #f8fafc

Update variables in layout if needed for different themes.

## Notes
This is frontend-only. Replace localStorage with real API integrations when the backend is available.
