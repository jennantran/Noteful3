import React from 'react';
import { NavLink, Link } from 'react-router-dom'
import './NoteListNav.css';
import { countNotesForFolder } from '../NoteFunctions';
import NoteContext from '../noteContext';
import Button from '../Button/Button';


export default class NoteListNav extends React.Component {
    static contextType = NoteContext;

    render(){
        const { folders=[], notes=[] } = this.context
        return (
            <div className="NoteListNav">
                <ul className="NoteList">
                    {folders.map(folder =>
                            <li key={folder.id}>
                                <NavLink
                                    className="NavFoldersLink"
                                    to={`/folder/${folder.id}`}
                                    >
                                         <span className='NoteListNav__num-notes'>
                                             {countNotesForFolder(notes, folder.id)}
                                         </span>
                                    {folder.name}
                                </NavLink>
                            </li>
                    )}
                </ul>
                    <div className="NoteListNavAddButton">
                        <Button
                            tag={Link}
                            className="addFolderButton"
                            to="/AddFolder"
                            type="button"    
                        >Add Folder</Button>
                    </div>
            </div>
        );
    }
}


