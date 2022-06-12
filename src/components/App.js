import React from 'react'
import NavBar from './NavBar'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import About from './About'
import Home from './Home'
import NoteState from '../context/notes/NoteState'


const App = () => {
    return (
        <NoteState>

            <Router>
                <div>
                    <NavBar />
                    <div className='container'>
                        <Routes>
                            <Route exact path="/" element={<Home />} />
                            <Route exact path="/about" element={<About />} />
                        </Routes>
                    </div>
                </div>
            </Router>

        </NoteState>
    )
}

export default App