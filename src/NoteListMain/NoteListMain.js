import React from 'react';
import Note from '../Note/Note';
import NoteContext from '../noteContext'
import {getNotesForFolder} from '../NoteFunctions'
import Button from '../Button/Button';
import './NoteListMain.css';
import { Link } from 'react-router-dom'

export default class NoteListMain extends React.Component {
    static defaultProps = {
        match: {
            params: {}
        }
    }

    static contextType = NoteContext;
    onDelete = () => {
        this.props.history.push('/')
        console.log("On delete");
      }

    render(){
        console.log("Note list main", this.context.notes);
        const { folder_id } = this.props.match.params;
        const { notes =[] } = this.context;
        const notesForFolder = getNotesForFolder(notes,folder_id);

        return (
            <section className="NoteListMain">
                <ul>
                    {notesForFolder.map(note => 
                        <li key={note.id}>
                            <Note
                                id={note.id}
                                name={note.note_name} 
                                modified={note.modified}
                                onDelete={this.onDelete}   
                            />
                        </li>
                        )}
                </ul>
                <div className="NoteListMainAddButton">
                        <Button
                            className="addNoteButton"
                            to="/AddNote"
                            type="button"  
                            tag={Link}  
                        >Add Notes</Button>
                    </div>
            </section>

    )
} 
}

