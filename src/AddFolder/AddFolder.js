import React, {Component} from 'react'
import NoteContext from '../noteContext'
import './AddFolder.css'
import ValidationError from '../ValidationError';

export default class AddFolder extends Component {

    static contextType = NoteContext;
    constructor(props){
        super(props);
        this.state = {
            name: {
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
        })
    }

    handleSubmit(event){
        event.preventDefault();
        const newFolder = {
            name: this.state.name.value
        };


        const baseUrl = 'http://localhost:9090';
        const foldersEndPoint = '/folders';

        fetch(baseUrl + foldersEndPoint, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(newFolder)
        })
        .then(res => {
            if(!res.ok){
                return res.json().then(e => Promise.reject(e))
            }
            return res.json()
        })
        .then(data => {
            this.context.addFolder(data);
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

    render(){
        const nameError = this.validateName();
        return(  
                <form className="AddFolderForm"
                    onSubmit= {e => this.handleSubmit(e)} >
                    <div className="nameInput">
                        <label>Name</label>
                        <input
                            required
                            type="text"   
                            name="name"   
                            id="name"
                            placeholder="name"
                            onChange={e => this.updateName(e.target.value)}
                        />
                        {this.state.name.touched && <ValidationError message={nameError} />}
                     </div>
                    <input type="submit"
                    ></input>
                </form>
        );
    }
}