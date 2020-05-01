import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';
import NoteListNav from '../NoteListNav/NoteListNav'
import NotePageNav from '../NotePageNav/NotePageNav'
import NoteListMain from '../NoteListMain/NoteListMain';
import noteContext from '../noteContext';
import AddFolder from '../AddFolder/AddFolder';
import AddNote from '../AddNote/AddNote';
import NotePageMain from '../NotePageMain/NotePageMain';
import NoteError from '../NoteError';

class App extends Component {
  state = {
    notes: [],
    folders: [],
    addFolder: this.addFolder,
    addNote: this.addNote
  };

  componentDidMount() {
    const baseUrl = 'http://localhost:9090';
    const notesEndPoint = '/notes';
    const foldersEndPoint = '/folders';

    Promise.all([
      fetch(baseUrl + notesEndPoint),
      fetch(baseUrl + foldersEndPoint)
    ])
      .then(([notesResolve, foldersResolve]) => {
        if (!notesResolve.ok) {
          return notesResolve.json().then(e => Promise.reject(e));
        }
        if (!foldersResolve.ok) {
          return foldersResolve.json().then(e => Promise.reject(e));
        }
        return Promise.all([notesResolve.json(), foldersResolve.json()]);
      })
      .then(([notes, folders]) => {
        this.setState({ notes, folders });
      })
      .catch(error => {
        console.error({ error })
      });
  }
  handleDeleteNote = noteId => {
    this.setState({
      notes: this.state.notes.filter(note => note.id !== noteId)
    });
  }

  addFolder = name => {
    this.setState({
      folders: [...this.state.folders, name]
    })
  }

  addNote = note => {
    this.setState({
      notes: [...this.state.notes, note]
    });
  }

  render() {
    const value = {
      notes: this.state.notes,
      folders: this.state.folders,
      deleteNote: this.handleDeleteNote,
      addFolder: this.addFolder,
      addNote: this.addNote
    }

    return (
      <NoteError>
        <noteContext.Provider value={value}>
          <div className="App">
            <nav className="navigation">
              <Route exact path="/" component={NoteListNav} />
              <Route path="/folder/:folder_id" component={NoteListNav} />
              <Route path="/note/:note_id" component={NotePageNav} />
              <Route path="/AddFolder" component={NotePageNav} />
              <Route path="/AddNote" component={NotePageNav} />
            </nav>
            <header className="appHeader">
              <Link to="/">Noteful</Link>{' '}
            </header>
            <main className="appMain">
              <Route exact path="/" component={NoteListMain} />
              <Route path="/folder/:folder_id" component={NoteListMain} />
              <Route path="/AddNote" component={AddNote} />
              <Route path="/note/:note_id" component={NotePageMain} />
              <Route path="/AddFolder" component={AddFolder} />

            </main>
          </div>
        </noteContext.Provider>
      </NoteError>

    );
  }
}

export default App;
