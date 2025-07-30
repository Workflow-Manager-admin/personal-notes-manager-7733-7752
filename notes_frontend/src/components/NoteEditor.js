import React, { useState, useEffect, useRef } from "react";

/**
 * Editor for creating or editing a note.
 * @param {object} props
 * @param {object|null} props.note - Note object being edited or null for new note.
 * @param {boolean} props.editing - Whether the editor is in editing mode.
 * @param {(note: {id?:string, title: string, content: string}) => void} props.onSave - Save handler.
 * @param {() => void} props.onCancel - Cancel handler.
 * @param {(id: string) => void} [props.onDelete] - Delete handler.
 */
 // PUBLIC_INTERFACE
function NoteEditor({ note, editing, onSave, onCancel, onDelete }) {
  const [title, setTitle] = useState(note ? note.title : "");
  const [content, setContent] = useState(note ? note.content : "");
  const textareaRef = useRef();

  useEffect(() => {
    setTitle(note ? note.title : "");
    setContent(note ? note.content : "");
  }, [note]);

  useEffect(() => {
    if (editing && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [editing, note]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      id: note && note.id,
      title: title.trim(),
      content: content.trim(),
    });
  };

  return (
    <form className="editor" onSubmit={handleSubmit}>
      <input
        className="editor__title"
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        disabled={!editing}
        autoFocus
        required
        aria-label="Note Title"
      />
      <textarea
        className="editor__content"
        placeholder="Type your note here..."
        value={content}
        onChange={e => setContent(e.target.value)}
        disabled={!editing}
        ref={textareaRef}
        rows={12}
        aria-label="Note Content"
      />
      {editing ? (
        <div className="editor__actions">
          <button type="submit" className="btn btn--primary">Save</button>
          <button type="button" className="btn btn--secondary" onClick={onCancel}>Cancel</button>
          {onDelete && note?.id && (
            <button
              type="button"
              className="btn btn--danger"
              onClick={() => window.confirm("Delete this note?") && onDelete(note.id)}
              style={{ marginLeft: "auto" }}
            >
              Delete
            </button>
          )}
        </div>
      ) : null}
    </form>
  );
}

export default NoteEditor;
