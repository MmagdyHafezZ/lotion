import React from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Edit() {
  const [notes, setNotes] = useOutletContext();
  const [other, setOther] = useOutletContext();
  const { id } = useParams();
  const note = notes.find((note) => note.id === id);
  const [text, setText] = useState(note.body);
  const [place, setPlace] = useState(note.tag);
  useEffect(() => {
    if (note.tag === "") {
      setPlace("Add tags");
    }
  }, [note.tag]);
  const [date, setDate] = useState(note.date);

  const navigate = useNavigate();
  const onDeleteNote = (id) => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      setNotes(notes.filter((note) => note.id !== id));
      navigate(`/`, { replace: true });
    }
  };
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  const onEditfield = (field, value) => {
    const updateNote = notes.map((note) => {
      if (note.id === id) {
        return {
          ...note,
          [field]: value,
          lastModified: Date.now(),
        };
      }
      return note;
    });
    setNotes(updateNote);
  };
  const onEditBody = (field, value) => {
    const updateNote = notes.map((note) => {
      if (note.id === id) {
        return {
          ...note,
          [field]: value,
          lastModified: Date.now(),
        };
      }
      return note;
    });
    setNotes(updateNote);
  };

  const changeTags = (value) => {
    const updateNote = notes.map((note) => {
      if (note.id === id) {
        return {
          ...note,
          tag: value,
        };
      }
      return note;
    });
    setNotes(updateNote);
  };

  const onSaveNote = () => {
    const updateNote = notes.map((note) => {
      if (note.id === id) {
        return {
          ...note,
          lastModified: Date.now(),
        };
      }
      return note;
    });
    setNotes(updateNote);
    navigate(`/Preview/${id}`);
  };

  return (
    <>
      <div className="edit">
        <div className="top-bar">
          <input
            type="text"
            placeholder="Note Title"
            id="title"
            value={note.title}
            onChange={(e) => onEditfield("title", e.target.value)}
            autoFocus
          />
          <input
            type="datetime-local"
            value={note.lastModified}
            onChange={(e) => {
              setDate(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder={place}
            id="tags"
            onChange={(e) => {
              changeTags(e.target.value);
            }}
          />
          <div className="buttons">
            <button
              id="save"
              onClick={() => {
                onSaveNote();
              }}
            >
              Save
            </button>
            <button
              id="delete"
              onClick={() => {
                onDeleteNote(note.id);
              }}
            >
              Delete
            </button>
          </div>
        </div>
        <div className="note-body">
          <CKEditor
            editor={ClassicEditor}
            data={note.body}
            onChange={(event, editor) => {
              const data = editor.getData();
              setText(data);
              onEditBody("body", data);
            }}
          />
        </div>
      </div>
    </>
  );
}
export default Edit;
