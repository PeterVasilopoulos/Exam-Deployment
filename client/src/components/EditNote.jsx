import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';

const EditNote = () => {
    // Title variable
    const [title, setTitle] = useState("");
    // Body variable
    const [body, setBody] = useState("");

    // Variable to store note id
    const {id} = useParams();

    // Navigate variable
    const navigate = useNavigate();

    // Variable to store errors
    const [errors, setErrors] = useState([]);

    // useEffect to get note info
    useEffect(() => {
        axios.get(`http://localhost:8000/api/notes/${id}`)
        .then((res) => {
            // Log data
            console.log("Edit page get request.", res)
            // Store retrieved data
            const note = res.data.results;
            setTitle(note.title)
            setBody(note.body)
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
            console.log("Edit page get request error.", err)
        })
    }, [])

    // Form submit handler
    const handleSubmit = (e) => {
        e.preventDefault();

        // Variable to hold updated data
        const updatedNote = {title, body};

        axios.put(`http://localhost:8000/api/notes/update/${id}`, updatedNote, {new: true})
        .then((res) => {
            // Log data
            console.log("Edit page put request.", res)
            // Navigate to home
            navigate('/')
        })
        .catch((err) => {
            // Log error if we get one
            console.log("Edit page put request error.", err)
        })
    }

    // Delete button function
    const deleteNote = (e) => {
        e.preventDefault();

        axios.delete(`http://localhost:8000/api/notes/delete/${id}`)
        .then((res) => {
            // Log data
            console.log("Note deleted.", res)
            // Navigate to home
            navigate('/')
        })
        .catch((err) => {
            // Log error if we get one
            console.log("Note delete error.", err)
        })
    }

    return (
        <div>

        {/* Navbar */}
        <div id='create-navbar'>
                {/* Navbar Left */}
                <div id='navbar-left'>
                    <div className='title'>Note</div>
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
                <form id='edit-form' onSubmit={handleSubmit}>
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

                    
                </form>
            </div>

            {/* Edit and Delete Buttons */}
            <div id='edit-delete'>
                <button form='edit-form' className='button edit-button'>Edit Note</button>
                <button className='button delete-button' onClick={deleteNote}>Delete Note</button>
            </div>

        </div>
    )
}

export default EditNote