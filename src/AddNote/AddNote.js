import React, {Component} from 'react';
import NoteContext from '../noteContext'
import './AddNote.css'
import ValidationError from '../ValidationError';
import API_ENDPOINT from '../config';

export default class AddNote extends Component {
    static contextType = NoteContext;

    constructor(props){
        super(props);
        this.state = {
            name: {
                value: "",
                touched: false
            },
            content:{
                value: "",
                touched: false
            },
            folderId: {
                value: 1,
                touched:  false 
            },
            modified:{
                value: "",
                touched: false
            }
        }
    }
    updateName(name){
        console.log({name});
        this.setState({
            name: {
                value: name,
                touched: true
            }
        });
    }

    updateContent(content){
        console.log({content});
        this.setState({
            content: {
                 value: content,
                 touched: true
            }
        });
    }

    updateFolder = (folderId) => {

        console.log(folderId);
        this.setState({
            folderId: {
                value: folderId,
                touched: true
            }
        });
    }
  
     handleSubmit(event){
         console.log("handlesubmit");
         event.preventDefault();
 
         const newNote = {
            note_name: this.state.name.value,
            content: this.state.content.value,
            folder_id: this.state.folderId.value,
            modified: new Date(),
       };
        console.log(newNote);
        // const baseUrl = 'http://localhost:8000';
        const NoteEndPoint = '/api/notes';
        const baseUrl = API_ENDPOINT.API_ENDPOINT;

        fetch(`${baseUrl}/api/notes`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newNote),
        })
        .then((res) => {
            if(!res.ok){
                return res.json().then(e => Promise.reject(e))
            }
            return res.json()
        })
        .then((data) => {
            this.context.addNote(data);
            console.log(data);
            this.props.history.push("/");
      
        
        })
        .catch(error => {
            console.error(error);
        });  
     }

     validateName(){
         const name = this.state.name.value.trim();
         if(name.length === 0){
             return "name is required";
         }else if (name.length < 3 || name.length >20){
             return "Name must be between 3 and 20 characters";
         }
     }

     validateContent(){
        const content = this.state.content.value.trim();
        if(content.length === 0){
            return "Content is required";
        }else if (content.length > 100){
            return "Content must be less than 100 characters";
        }
    }
    render(){
        const nameError = this.validateName();
        const contentError = this.validateContent();
        const options = this.context.folders.map((folder) => {
            return(
                <option key={folder.id} value={folder.id}>
                    {folder.folder_name}
                </option>
            )
        })
        return(  
                <form className="AddNoteForm"
                    onSubmit= {e => this.handleSubmit(e)} >
                    <div className = "nameInput">
                        <label>Name</label>
                        <input
                            required
                            type="text"   
                            id="name"
                            placeholder="name"
                            onChange={e => this.updateName(e.target.value)}
                        />
                         {this.state.name.touched && <ValidationError message={nameError} />}
                    </div>
                    <div className="contentInput">
                        <label>Content</label>
                        <input
                            required
                            type="text"   
                            name="content"   
                            id="content"
                            placeholder="content"
                            onChange={e => this.updateContent(e.target.value)}
                        /> 
                         {this.state.content.touched && <ValidationError message={contentError} />}
                    </div>
                    <div className="folderInput">
                        <label>
                            Folder: 
                        </label>
                        <select 
                            className="folderId"
                            onChange={e => this.updateFolder(e.target.value)}>
                            {options}
                        </select>
                    </div>
                    <input type="submit"
                        className="submit"
                    ></input>
            
                </form>
        );
    }
}
