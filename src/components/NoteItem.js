import React, { useContext } from 'react'
import NoteContext from '../context/notes/NoteContext'


const NoteItem = (props) => {


    const context = useContext(NoteContext)
    const { deleteNote } = context
    const { notes } = props
    return (
        <div className='container'>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{notes.title}</h5>
                    <span className="badge text-bg-warning" >{notes.tag}</span>
                    <p className="card-text">{notes.description}</p>
                    <button  onClick={()=>{deleteNote(notes._id)}} className="btn btn-danger" ><i className="fa-solid fa-trash-can"></i></button>
                    <button className="btn btn-info mx-2"><i className="fa-solid fa-pen-to-square"></i></button>
                </div>
            </div>
        </div>
    )

}

export default NoteItem