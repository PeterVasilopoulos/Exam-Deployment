import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const RandomNote = () => {
    // Variable to hold note
    const [oneNote, setOneNote] = useState([]);

    // Get all notes
    useEffect(() => {
        axios.get("http://localhost:8000/api/notes")
            .then((res) => {
                // Log data
                console.log("Dashboard get success.", res.data.results)
                const results = res.data.results
                const num = Math.floor(Math.random() * results.length)

                // Set oneNote variable
                setOneNote(results[num])
            })
            .catch((err) => {
                // Log error if we get one
                console.log("Dashboard get error.", err)
            })
    }, [])


    return (
        <div>

            {/* Navbar */}
            <div id='navbar'>
                {/* Navbar Left */}
                <div id='navbar-left'>
                    <div className='title'>Note Wall</div>
                    <div className='leave-note'>Random Note</div>
                </div>

                {/* Navbar Right */}
                <div id='navbar-right'>
                    <Link to={'/'}>
                        <p>go back home</p>
                    </Link>
                </div>
            </div>

            {/* Note Data */}
            <div className='single-note'>
                <p className='note-title'>{oneNote.title}</p>
                <div className='note-bottom'>
                    <p className='note-body'>{oneNote.body}</p>
                </div>
            </div>

        </div>
    )
}

export default RandomNote