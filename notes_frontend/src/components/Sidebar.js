import React from "react";

/**
 * Sidebar navigation for notes list.
 * @param {object} props
 * @param {Array<{id: string, title: string}>} props.notes - Notes to display.
 * @param {string} props.selectedId - Currently selected note.
 * @param {(id: string) => void} props.onSelect - Callback when a note is selected.
 */
 // PUBLIC_INTERFACE
function Sidebar({ notes, selectedId, onSelect }) {
  return (
    <nav className="sidebar" aria-label="Note navigation">
      <h2 className="sidebar__title">Notes</h2>
      <ul className="sidebar__list">
        {notes.map(note => (
          <li
            key={note.id}
            className={
              "sidebar__item" + (selectedId === note.id ? " sidebar__item--active" : "")
            }
          >
            <button
              className="sidebar__button"
              onClick={() => onSelect(note.id)}
              aria-current={selectedId === note.id ? "page" : undefined}
            >
              {note.title || <span className="sidebar__untitled">Untitled</span>}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Sidebar;
