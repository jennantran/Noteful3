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
  static contextType = NoteContext;
  render(){
      const { notes=[] } = this.context;
      console.log(this.context);
      const { note_id } = this.props.match.params;
      console.log(this.props);
      const note = findNote(notes, note_id) || { content: '' }
      return (
        <section className='NotePageMain'>
          <Note
            id={note.id}
            name={note.name}
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