import React from 'react'
import { NavLink, Link,useNavigate } from 'react-router-dom'

const NavBar = () => {

    const navigate = useNavigate()

    const handleLogout=()=>{
        localStorage.removeItem('token')
        navigate('/login')
    }

    return (
        <nav className="navbar navbar-dark navbar-expand-lg bg-dark ">
            <div className="container-fluid">
                <NavLink className="navbar-brand" to="/">iNoteBook</NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink className="nav-link " aria-current="page" to="/">Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/about">About</NavLink>
                        </li>
                    </ul>

                    {
                        !localStorage.getItem('token') ? <>
                            <Link to="/login"><button className="btn btn-light mx-1" >Log In</button></Link>
                            <Link to="/signup"><button className="btn btn-light mx-1" >Sign Up</button></Link>
                        </> : <>
                            <li className="nav-item" style={{ color: 'white', listStyle: 'none' }}>Hello User</li>
                            <Link to="/login"><button className="btn btn-light mx-2 " onClick={handleLogout} >Log Out</button></Link>
                        </>

                    }









                </div>
            </div>
        </nav>
    )
}

export default NavBar