import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
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
    state = {redirect:false}
    
    handleDeleteNote () {
        this.setState({redirect:true})
      }

    renderNote() {
        const { notes=[] } = this.context
        const { noteId } = this.props.match.params
        const note = notes.find(n => n.id===noteId)
        if (this.state.redirect || !note) {
            return (
                <Redirect to='/' />
            )
        } else {           
            return ( 
                <div>                                     
                    <Note
                        id={note.id}
                        name={note.name}
                        modified={note.modified}
                        onDeleteNote={() => this.handleDeleteNote()}               
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

    render () {
        return(
            <div className='NotePageMain'>
                {this.renderNote()} 
            </div>
        )
    }
}

export default NotePageMain;