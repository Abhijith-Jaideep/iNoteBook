import React from 'react'
import NavBar from './NavBar'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import About from './About'
import Home from './Home'
import NoteState from '../context/notes/NoteState'
import Login from './Login'
import Signup from './Signup'



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
                                <Route exact path="/login" element={<Login />} />
                                <Route exact path="/signup" element={<Signup />} />
                            </Routes>
                        </div>
                    </div>
                </Router>

            </NoteState>
      
    )
}

export default App