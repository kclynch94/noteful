import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import ApiContext from '../ApiContext';
import Note from '../Note/Note';
import './NoteList.css';

class NoteList extends Component {
    static defaultProps = {
        match: {
          params: {}
        }
    }
    static contextType = ApiContext

    render() {
        const { folderId } = this.props.match.params
        const { notes=[] } = this.context
        const notesList = folderId ? notes.filter(note => note.folder === +folderId).map(n => (
            <li key={n.id}>
                <Note
                    id={n.id}
                    name={n.note_name}
                    modified={new Date(n.date_modified)}
                    onDeleteNote={this.handleDeleteNote}               
                />
            </li>) 
        ) : notes.map(n => (
            <li key={n.id}>
                <Note
                    id={n.id}
                    name={n.note_name}
                    modified={new Date(n.date_modified)}
                    onDeleteNote={this.handleDeleteNote}               
                />
            </li>) );
        return(
            <div className='NoteList'>
                <ul>
                    {notesList}
                </ul>
                <div className='NoteList_button-container'>
                    <NavLink to='/add-note' className='NoteList_add-note-button'>
                        Add note
                    </NavLink>
                </div>
            </div>
        )
    }
}

export default NoteList;