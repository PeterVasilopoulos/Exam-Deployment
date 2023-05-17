import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

// Things to import:
// axios, useEffect, useState, Link, useNavigate

const Dashboard = () => {
    // Variable to hold notes
    const [notes, setNotes] = useState([]);

    // Variable to determine display order
    const [reverse, setReverse] = useState(false);

    // Navigate variable
    const navigate = useNavigate();

    // useEffect to get notes from database
    useEffect(() => {
        axios.get("http://localhost:8000/api/notes")
            .then((res) => {
                // Log data
                console.log("Dashboard get success.", res)
                // Put data into notes variable
                const requestedNotes = res.data.results
                console.log(requestedNotes)
                if (reverse) {
                    // Reverse order
                    setNotes(requestedNotes.reverse())
                } else {
                    // Default order
                    setNotes(requestedNotes)
                }
            })
            .catch((err) => {
                // Log error if we get one
                console.log("Dashboard get error.", err)
            })
    }, [reverse])

    // Function to sort by oldest first
    const oldestFirst = (e) => {
        e.preventDefault();

        setReverse(false);
    }

    //Function to sort by newest first
    const newestFirst = (e) => {
        e.preventDefault();

        setReverse(true);
    }

    // Write note button function
    const newNote = (e) => {
        e.preventDefault();
        navigate('/notes/new');
    }

    // Random note page button
    const randomNote = (e) => {
        e.preventDefault();
        navigate('/notes/rand');
    }

    return (
        <div>
            {/* Navbar */}
            <div id='navbar'>
                {/* Navbar Left */}
                <div id='navbar-left'>
                    <div className='title'>Note Wall</div>
                    <div className='leave-note'>
                        <p>Leave a note</p>

                        {/* Sort Buttons */}
                        <div id='sort-buttons'>
                            {/* Sort by Oldest */}
                            <button
                                className='button'
                                onClick={oldestFirst}
                            >Sort by Oldest</button>
                            {/* Sort by Newest */}
                            <button
                                className='button'
                                onClick={newestFirst}
                            >Sort by Newest</button>
                        </div>
                    </div>
                </div>

                {/* Navbar Right */}
                <div id='navbar-right'>
                    <button
                        className='button'
                        onClick={(e) => newNote(e)}
                    >
                        Write note
                    </button>
                </div>
            </div>

            {/* List of Notes */}
            {
                notes.map((note, i) => {
                    return (
                        <div className='single-note' key={i}>
                            <p className='note-title'>{note.title}</p>
                            <div className='note-bottom'>
                                <p className='note-body'>{note.body}</p>

                                {/* Edit Button */}
                                <Link to={`/notes/${note._id}`}>
                                    <p>edit</p>
                                </Link>
                            </div>
                        </div>
                    )
                })
            }

            {/* Random Notes Button */}
            <div id='random-button'>
                <button
                    className='button'
                    onClick={randomNote}>
                    Random Note
                </button>
            </div>
        </div>
    )
}

export default Dashboard