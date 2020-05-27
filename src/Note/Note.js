import React from 'react';
import { Link } from 'react-router-dom'
import NoteContext from '../noteContext'
import './Note.css'
import PropTypes from 'prop-types';
import { format } from 'date-fns';


export default class Note extends React.Component {

    static contextType = NoteContext;
    
        handleDelete = e => {
            e.preventDefault();
            const noteId = this.props.id;
            const baseUrl = 'http://localhost:8000/api/notes';
            
            console.log(noteId)
            
            fetch(`${baseUrl}/${noteId}`, {
                method: 'DELETE',
                headers:{
                    'content-type': 'application/json'
                },
            })
            .then(res => {
                if(!res.ok){
                    return res.json().then(e => Promise.reject(e))
                }
                console.log(res);
                return res
            })
            .then(() => {
                console.log(this.props);
                this.props.onDelete();
                this.context.deleteNote(noteId);
                console.log(this.props);
            })
            .catch(error => {
                console.error({error})
            })
        }
        
    render(){
        const {name, id, modified} = this.props;
        console.log("name", name);
        console.log("id", id);
        console.log("modified",modified)
        // const modified = {(modified) ? format(modified, 'dd-MM-yyyy') : ''};

        return(
            <div className="note">
                <h2 className="noteTitle">
                    <Link to={`/note/${id}`}>
                        {name}
                    </Link>
                </h2>
                <button
                    className="noteDelete"
                    type="button"
                    onClick={this.handleDelete}    
                >
                    Delete
                </button>
                <div className='Note__dates'>
                    <div className='Note__dates-modified'>
                    <span className='Date'>
                    {(modified) ? format(new Date(modified), 'dd-MM-yyyy') : ''}
                    </span>
                    </div>
                </div>
            </div>
            
        );
    }
}

Note.propTypes = {
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
};

