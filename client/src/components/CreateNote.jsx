import React, {useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';

const CreateNote = () => {
    // Title variable
    const [title, setTitle] = useState("");
    // Body variable
    const [body, setBody] = useState("");

    // Navigate variable
    const navigate = useNavigate();

    // Variable to store errors
    const [errors, setErrors] = useState([]);

    // Submit handler
    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post("http://localhost:8000/api/notes/new", {title, body})
        .then((res) => {
            // Log data
            console.log("Create page success.", res)
            // Navigate back to home
            navigate('/')
        })
        .catch((err) => {
            const errorResponse = err.response.data.errors
            const errorArr = []
            for(const key of Object.keys(errorResponse)) {
                errorArr.push(errorResponse[key].message)
            }
            // Set errors
            setErrors(errorArr)

            // Log error if we get one
            console.log("Create page error.", err)
        })
    }

    return (
        <div>

            {/* Navbar */}
            <div id='create-navbar'>
                {/* Navbar Left */}
                <div id='navbar-left'>
                    <div className='title'>Write Notes</div>
                    <p className='leave-note'>Write a new note!</p>
                </div>

                {/* Navbar Right */}
                <div id='navbar-right'>
                    <Link to={'/'}>
                        <p>go back home</p>
                    </Link>
                </div>
            </div>

            {/* Errors */}
            <div id='error-block'>
            {
                errors.map((err, i) => {
                    return (
                        <p className='error' key={i}>{err}</p>
                    )
                })
            }
            </div>

            {/* Note Form */}
            <div id='note-form'>
                <form onSubmit={handleSubmit}>
                    {/* Note Title */}
                    <label>Note Title</label>
                    <input 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    type="text" 
                    className='note-input'/>
                    {/* Note Body */}
                    <label>Note Body</label>
                    <textarea 
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    className='note-input'
                    name="" 
                    id="" 
                    cols="30" 
                    rows="10"
                    ></textarea>

                {/* Create Note Button */}
                <div>
                    <button className='button'>Write this note!</button>
                </div>
                </form>
            </div>

        </div>
    )
}

export default CreateNote