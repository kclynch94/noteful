import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import FolderNav from './FolderNav/FolderNav';
import NoteList from './NoteList/NoteList';
import NotePageNav from './NotePageNav/NotePageNav';
import NotePageMain from './NotePageMain/NotePageMain';
import ApiContext from './ApiContext';
import AddFolder from './AddFolder/AddFolder'
import AddNote from './AddNote/AddNote'
import config from './config';
import './App.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      folders: [],
      notes: [],
    }
  }

  componentDidMount() {
    Promise.all([
      fetch(`${config.API_ENDPOINT}/notes`),
      fetch(`${config.API_ENDPOINT}/folders`)
    ])
      .then(([notesRes, foldersRes]) => {
        if (!notesRes.ok)
          return notesRes.json().then(e => Promise.reject(e))
        if (!foldersRes.ok)
          return foldersRes.json().then(e => Promise.reject(e))

        return Promise.all([
          notesRes.json(),
          foldersRes.json(),
        ])
      })
      .then(([notes, folders]) => {
        this.setState({ notes, folders })
      })
      .catch(error => {
        console.error({ error })
      })
  }

  handleAddFolder = folder => {
    this.setState({
      folders: [
        ...this.state.folders,
        folder
      ]
    })
  }

  handleAddNote = note => {
    this.setState({
      notes: [
        ...this.state.notes,
        note
      ]
    })
  }

  handleDeleteNote = noteId => {
    this.setState({
      notes: this.state.notes.filter(note => note.id !== noteId)
    })
  }

  render () {
    const value = {
      notes: this.state.notes,
      folders: this.state.folders,
      addFolder: this.handleAddFolder,
      addNote: this.handleAddNote,
      deleteNote: this.handleDeleteNote,
    }
    return (
      <ApiContext.Provider value={value}>
        <div className='App'>
          <nav className='App_nav'>
            <Route
              exact path='/'
              component={FolderNav}
            />
            <Route
              path='/folder/:folderId'
              component={FolderNav}
            />
            <Route
              path='/note/:noteId'
              component={NotePageNav}
            />
            <Route
              path='/add-folder'
              component={NotePageNav}
            />
            <Route
              path='/add-note'
              component={NotePageNav}
            />
          </nav>
          <header className='App_header'>
              <h1>
                <Link to='/'>Noteful</Link>
              </h1>
          </header>
          <main className='App_main'>   
            <Route
              exact path='/'
              component={NoteList}
            />
            <Route
              path='/folder/:folderId'
              component={NoteList}
            />
            <Route
              path='/note/:noteId'
              component={NotePageMain}
            />
            <Route
              path='/add-folder'
            component={AddFolder}
            />
            <Route
              path='/add-note'
              component={AddNote}
            />
          </main>
        </div>
      </ApiContext.Provider>
    );
  }
}

export default App;