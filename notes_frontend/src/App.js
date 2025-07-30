import React, { useState, useEffect, useMemo } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import NoteEditor from "./components/NoteEditor";
import NoteViewer from "./components/NoteViewer";
import FabNewNote from "./components/FabNewNote";
import useNotes from "./hooks/useNotes";

// PUBLIC_INTERFACE
function App() {
  const [theme, setTheme] = useState('light');
  const [notes, createNote, updateNote, deleteNote] = useNotes();
  const [selectedId, setSelectedId] = useState(null);
  const [editing, setEditing] = useState(false);
  const [creating, setCreating] = useState(false);

  // Effect to apply theme to document element
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === "light" ? "dark" : "light");
  };

  // Select latest note on mount if none selected
  useEffect(() => {
    if (!selectedId && notes.length > 0) {
      setSelectedId(notes[0].id);
    }
  }, [notes, selectedId]);

  const selectedNote = useMemo(() => (
    notes.find(n => n.id === selectedId) || null
  ), [notes, selectedId]);

  // CRUD handlers
  // PUBLIC_INTERFACE
  const handleCreate = () => {
    setCreating(true);
    setEditing(true);
  };

  // PUBLIC_INTERFACE
  const handleSaveNew = (note) => {
    const id = createNote(note);
    setCreating(false);
    setEditing(false);
    setSelectedId(id);
  };

  // PUBLIC_INTERFACE
  const handleCancelNew = () => {
    setCreating(false);
    setEditing(false);
  };

  // PUBLIC_INTERFACE
  const handleEdit = () => setEditing(true);

  // PUBLIC_INTERFACE
  const handleSaveEdit = (note) => {
    updateNote(note.id, { title: note.title, content: note.content });
    setEditing(false);
  };

  // PUBLIC_INTERFACE
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      deleteNote(id);
      setEditing(false);
      setCreating(false);
      // Go to first note or none
      const remaining = notes.filter(n => n.id !== id);
      setSelectedId(remaining[0]?.id || null);
    }
  };

  // PUBLIC_INTERFACE
  const handleSelect = (id) => {
    setSelectedId(id);
    setEditing(false);
    setCreating(false);
  };

  return (
    <div className="NotesApp">
      <aside className="sidebar-container">
        <Sidebar
          notes={notes}
          selectedId={selectedId}
          onSelect={handleSelect}
        />
      </aside>
      <main className="main-area">
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        >
          {theme === "light" ? "🌙 Dark" : "☀️ Light"}
        </button>

        {creating ? (
          <NoteEditor
            note={{ title: "", content: "" }}
            editing
            onSave={handleSaveNew}
            onCancel={handleCancelNew}
          />
        ) : editing && selectedNote ? (
          <NoteEditor
            note={selectedNote}
            editing
            onSave={handleSaveEdit}
            onCancel={() => setEditing(false)}
            onDelete={handleDelete}
          />
        ) : (
          <NoteViewer
            note={selectedNote}
            onEdit={selectedNote ? handleEdit : () => {}}
          />
        )}
      </main>
      <FabNewNote onClick={handleCreate} />
    </div>
  );
}

export default App;
