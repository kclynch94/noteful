import React, { Component } from 'react'
import NotefulForm from '../NotefulForm/NotefulForm'
import ApiContext from '../ApiContext'
import config from '../config'
import ValidationError from './ValidationError'
import './AddNote.css'

export default class AddNote extends Component {
  static defaultProps = {
    history: {
      push: () => { }
    },
  }
  static contextType = ApiContext;

  state = {
    noteName: '',
    noteNameValid: false,
    noteFormValid: false,
    noteValidationMessages: {
      noteName: '',
    }
  }

  updateNoteName(noteName) {
    this.setState({noteName}, () => {this.validateNoteName(noteName)});
  }

  handleSubmit = e => {
    e.preventDefault()
    const newNote = {
      name: e.target['note-name'].value,
      content: e.target['note-content'].value,
      folderId: e.target['note-folder-id'].value,
      modified: new Date(),
    }
    fetch(`${config.API_ENDPOINT}/notes`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(newNote),
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e))
        return res.json()
      })
      .then(note => {
        this.context.addNote(note)
        this.props.history.push(`/folder/${note.folderId}`)
      })
      .catch(error => {
        console.error({ error })
      })
  }

  validateNoteName(fieldValue) {
    const fieldErrors = {...this.state.noteValidationMessages};
    let hasError = false;

    fieldValue = fieldValue.trim();
    if(fieldValue.length === 0) {
      fieldErrors.noteName = 'Name is required';
      hasError = true;
    } else {
      if (fieldValue.length < 3) {
        fieldErrors.noteName = 'Name must be at least 3 characters long';
        hasError = true;
      } else {
        fieldErrors.noteName = '';
        hasError = false;
      }
    }

    this.setState({
      noteValidationMessages: fieldErrors,
      noteNameValid: !hasError
    }, this.noteFormValid );

  }

  noteFormValid() {
    this.setState({
      noteFormValid: this.state.noteNameValid
    });
  }

  render() {
    const { folders=[] } = this.context
    return (
      <section className='AddNote'>
        <h2>Create a note</h2>
        <NotefulForm onSubmit={this.handleSubmit}>
          <div className='field'>
            <label htmlFor='note-name-input'>
              Name
            </label>
            <input type='text' id='note-name-input' name='note-name' onChange={e => this.updateNoteName(e.target.value)} />
            <ValidationError hasError={!this.state.noteNameValid} message={this.state.noteValidationMessages.noteName}/>
          </div>
          <div className='field'>
            <label htmlFor='note-content-input'>
              Content
            </label>
            <textarea id='note-content-input' name='note-content' />
          </div>
          <div className='field'>
            <label htmlFor='note-folder-select'>
              Folder
            </label>
            <select id='note-folder-select' name='note-folder-id'>
              <option value={null}>...</option>
              {folders.map(folder =>
                <option key={folder.id} value={folder.id}>
                  {folder.name}
                </option>
              )}
            </select>
          </div>
          <div className='buttons'>
            <button type='submit' disabled={!this.state.noteFormValid}>
              Add note
            </button>
          </div>
        </NotefulForm>
      </section>
    )
  }
}