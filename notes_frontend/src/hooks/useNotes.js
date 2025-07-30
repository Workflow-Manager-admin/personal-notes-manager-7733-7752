import { useState, useEffect } from "react";

/**
 * Custom hook managing notes in localStorage.
 * @returns {[Array, Function, Function, Function]}
 * - notes: Array of notes.
 * - createNote: function (initial = {title, content})
 * - updateNote: function (id, {title, content})
 * - deleteNote: function (id)
 */
 // PUBLIC_INTERFACE
function useNotes() {
  const [notes, setNotes] = useState([]);

  // Load notes from localStorage
  useEffect(() => {
    const stored = window.localStorage.getItem("notes-app-data");
    if (stored) {
      try {
        setNotes(JSON.parse(stored));
      } catch {
        setNotes([]);
      }
    }
  }, []);

  // Save notes to localStorage whenever changed
  useEffect(() => {
    window.localStorage.setItem("notes-app-data", JSON.stringify(notes));
  }, [notes]);

  // PUBLIC_INTERFACE
  const createNote = (note) => {
    // Create a new note (ID = ISO string)
    const id = Date.now().toString();
    const newNote = { id, ...note };
    setNotes([newNote, ...notes]);
    return id;
  };

  // PUBLIC_INTERFACE
  const updateNote = (id, data) => {
    setNotes(notes =>
      notes.map(n => (n.id === id ? { ...n, ...data } : n))
    );
  };

  // PUBLIC_INTERFACE
  const deleteNote = (id) => {
    setNotes(notes => notes.filter(n => n.id !== id));
  };

  return [notes, createNote, updateNote, deleteNote];
}

export default useNotes;
