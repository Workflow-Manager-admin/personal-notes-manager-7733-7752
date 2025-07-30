import React from "react";

/**
 * Floating Action Button to create a new note.
 * @param {object} props
 * @param {() => void} props.onClick
 */
 // PUBLIC_INTERFACE
function FabNewNote({ onClick }) {
  return (
    <button
      className="fab"
      aria-label="New Note"
      title="Create New Note"
      onClick={onClick}
    >
      +
    </button>
  );
}

export default FabNewNote;
