import React from "react";
import { useOutletContext, useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";

function Preview() {
  const { id } = useParams();
  const [notes, setNotes] = useOutletContext();
  const note = notes.find((note) => note.id === id);
  const navigate = useNavigate();

  const onDeleteNote = (id) => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      setNotes(notes.filter((note) => note.id !== id));
      navigate(`/`, { replace: true });
    }
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

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  const formatDate = (when) => {
    const formatted = new Date(when).toLocaleString("en-US", options);
    if (formatted === "Invalid Date") {
      return "";
    }
    return formatted;
  };

  return (
    <>
      <div className="preview">
        <div className="top-bar">
          <div className="top-bar-left">
            <div id="title">{note.title}</div>
            <small className="note-meta">
              Last Modified {formatDate(note.lastModified)}
            </small>
          </div>
          <div className="Date">Date:{note.date}</div>
          <div className="tag">tag:{note.tag}</div>
          <div className="buttons">
            <button
              id="Edit"
              onClick={() => {
                navigate(`/Edit/${note.id}`);
              }}
            >
              Edit
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
        <div className="app-preview">
          <div dangerouslySetInnerHTML={{ __html: note.body }}></div>
        </div>
      </div>
    </>
  );
}

export default Preview;
