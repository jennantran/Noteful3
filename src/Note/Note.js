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
            const baseUrl = 'http://localhost:9090/notes/';
            
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
                return res.json()
            })
            .then(() => {
                this.context.deleteNote(noteId);
                this.props.onChange();
                console.log(this.props);
            })
            .catch(error => {
                console.error({error})
            })
        }
        
    render(){
        const {name, id, modified} = this.props;
        console.log(new Date(modified));
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
                    Modified
                    {' '}
                    <span className='Date'>
                        {format(new Date(modified), 'dd-MM-yyyy')}
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