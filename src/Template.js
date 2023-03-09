import { NavLink, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Template() {
  const navigate = useNavigate();
  const [activeNote, setActiveNote] = useState(false);
  const [notes, setNotes] = useState(
    JSON.parse(localStorage.getItem("notes")) || []
  );
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);
  const onDeleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };
  const onSearch = (searchText) => {
    let filteredNotes = notes.filter((note) =>
      note.title.toLowerCase().includes(searchText.toLowerCase())
    );
    setNotes(filteredNotes);
  };
  const onAddNote = () => {
    const newNote = {
      id: uuidv4(),
      title: "Untitled Note",
      body: "",
      lastModified: Date.now(),
    };
    setNotes([newNote, ...notes]);
    setActiveNote(newNote.id);
    navigate(`/Edit/${newNote.id}`, { replace: true });
  };
  const sortedNotes = notes.sort((a, b) => b.lastModified - a.lastModified);
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
    <div className="App">
      <div className="container">
        <div className="container-right">
          <div className="app-header">
            <h1>Lotion</h1>
          </div>
          <div className="sub-header">
            <p>just like notion, but a little shittier</p>
          </div>
        </div>
        <button
          id="sidebar-toggler"
          onClick={() => {
            let sidebar = document.getElementById("sidebar");
            if (sidebar.style.display === "none") {
              sidebar.style.display = "block";
            } else {
              sidebar.style.display = "none";
            }
          }}
        >
          {String.fromCodePoint(0x2630)}
        </button>
      </div>
      <div className="app-body">
        <div id="sidebar">
          <div className="app-sidebar">
            <div className="app-sidebar-header">
              <h1>Notes</h1>
              <button onClick={onAddNote}>&#43;</button>
            </div>
            <p>{notes.body && notes.body.substr(0, 100) + "...."}</p>
            <div className="app-sidebar-notes">
              {notes.map((note) => (
                <div
                  className={`app-sidebar-note ${
                    note.id === activeNote && "active"
                  }`}
                  onClick={() => {
                    navigate(`/Preview/${note.id}`, { replace: true });
                    setActiveNote(note.id);
                  }}
                >
                  <div className="sidebar-note-title">
                    <strong>{note.title}</strong>
                    <button
                      onClick={() => {
                        const answer = window.confirm(
                          "Are you sure you want to delete this note?"
                        );
                        if (answer) {
                          onDeleteNote(note.id);
                        }
                      }}
                    >
                      Delete
                    </button>
                  </div>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: note.body && note.body.substr(0, 50) + "...",
                    }}
                  ></div>
                  <small className="note-meta">
                    Last Modified {formatDate(note.lastModified)}
                  </small>
                </div>
              ))}
            </div>
          </div>
        </div>
        <Outlet context={[notes, setNotes]} />
      </div>
    </div>
  );
}
export default Template;
