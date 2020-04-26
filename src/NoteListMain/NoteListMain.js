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

    render(){
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
                                name={note.name}    
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

