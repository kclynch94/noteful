import React, { Component } from 'react';
import ApiContext from '../ApiContext';
import Note from '../Note/Note';
import './NotePageMain.css';

class NotePageMain extends Component {
    static defaultProps = {
        match: {
          params: {}
        },
    }
    static contextType = ApiContext

    handleDeleteNote = noteId => {
        this.props.history.push(`/`)
      }

    render () {
        const { notes=[] } = this.context
        const { noteId } = this.props.match.params
        const note = notes.find(n => n.id===noteId)
        return (
            <div className='NotePageMain'>
                <Note
                    id={note.id}
                    name={note.name}
                    modified={note.modified}
                    onDeleteNote={this.handleDeleteNote}               
                />
                <div className='NotePageMain__content'>
                    {note.content.split(/\n \r|\n/).map((para, i) =>
                    <p key={i}>{para}</p>
                    )}
                </div>
            </div>
        )
    }
}

export default NotePageMain;