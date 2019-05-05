import React, { Component } from 'react';
import ApiContext from '../ApiContext';
import './NotePageNav.css';

class NotePageNav extends Component {
    static defaultProps = {
        history: {
          goBack: () => { }
        },
        match: {
          params: {}
        }
      }
    static contextType = ApiContext;

    render() {
        const { notes, folders, } = this.context
        const { noteId } = this.props.match.params
        const note = noteId ? notes.find(n => n.id===noteId) : ''
        const folder = note ? folders.find(f => f.id===note.folderId) : ''
        return(
            <div className='NotePageNav'>
                <button
                    className='NotePageNav_back-button'
                    onClick={() => this.props.history.goBack()}
                >
                    Go Back
                </button>
                <h2>{folder.name}</h2>
            </div>
        )
    }    
}

export default NotePageNav;