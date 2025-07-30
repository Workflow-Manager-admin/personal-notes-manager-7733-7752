import React from "react";

/**
 * Read-only note viewer.
 * @param {object} props
 * @param {object|null} props.note - Note to view.
 * @param {() => void} props.onEdit - Edit click handler.
 */
 // PUBLIC_INTERFACE
function NoteViewer({ note, onEdit }) {
  if (!note) {
    return (
      <div className="viewer viewer--empty">
        <p>Select a note or create a new one.</p>
      </div>
    );
  }
  return (
    <div className="viewer" tabIndex={0}>
      <h2 className="viewer__title">{note.title || <em>Untitled</em>}</h2>
      <pre className="viewer__content" aria-label="Note Content">{note.content || <em>(No Content)</em>}</pre>
      <button className="btn btn--primary viewer__editbtn" onClick={onEdit}>
        Edit
      </button>
    </div>
  );
}

export default NoteViewer;
