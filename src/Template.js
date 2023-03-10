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
  const [other, setOther] = useState([]);
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);
  const onAddNote = () => {
    const newNote = {
      id: uuidv4(),
      title: "Untitled Note",
      body: "",
      tag: "",
      date: "",
      lastModified: Date.now(),
    };
    setNotes([newNote, ...notes]);
    setActiveNote(newNote.id);
    navigate(`/Edit/${newNote.id}`, { replace: true });
  };
  const handlefilter = (searchText) => {
    if (searchText) {
      const searchword = searchText.toLowerCase();
      const newfilter = notes.filter((note) => {
        return (
          note.title.toLowerCase().includes(searchword) ||
          note.tag.toLowerCase().includes(searchword)
        );
      });
      setOther(newfilter);
    } else {
      setOther(null);
    }
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
        <div className="searchbar">
          <input
            type="text"
            placeholder="Search"
            onChange={(e) => handlefilter(e.target.value)}
          />
        </div>
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
              {other && other.length > 0
                ? other.map((note) => (
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
                  ))
                : notes.map((note) => (
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
        <Outlet context={[notes, setNotes, other, setOther]} />
      </div>
    </div>
  );
}
export default Template;
