import React from 'react';
import Note from '../Note/Note';
import NoteContext from '../noteContext';
import { findNote } from '../NoteFunctions';
import './NotePageMain.css';

export default class NotePageMain extends React.Component {
  static defaultProps = {
    match: {
      params: {}
    }
  }  

  onDelete = () => {
    this.props.history.push('/')
    console.log("On delete");
  }

  static contextType = NoteContext;
  render(){
      const { notes=[] } = this.context;
      const { note_id } = this.props.match.params;
      console.log("props", this.props)
      console.log("notes", notes)
      console.log("note_id", note_id)
      console.log(findNote(notes, note_id));
      const note = findNote(notes, note_id) || { content: '' }
      console.log(note);



      return (
        <section className='NotePageMain'>
          <Note
            id={note.id}
            name={note.note_name}
            modified={note.modified}
            onDelete={this.onDelete}
          />
          <div className='NotePageMainContent'>
            {note.content.split(/\n \r|\n/).map((para, i) =>
              <p key={i}>{para}</p>
            )}
          </div>
        </section>
  )
}
}