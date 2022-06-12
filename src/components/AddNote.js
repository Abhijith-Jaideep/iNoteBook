import React, { useContext, useState } from 'react'
import NoteContext from '../context/notes/NoteContext'

const AddNote = () => {

    const context = useContext(NoteContext)
    const { addNote } = context
    const [note, setnote] = useState({title: "", description: "", tag: "general"})


    const handleClick = (e) =>{
        addNote(note.title,note.description,note.tag)
    }

    const onChange  = (e) =>{
        setnote({...note, [e.target.name]:e.target.value})
    }

    return (
        <div>

            <h1>Add A Note</h1>
            <form className="my-3">

                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" onChange={onChange} name="title" id="title" placeholder="Enter Title" />
                </div>

                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control"  name="tag" id="tag" placeholder="Enter Tag" onChange={onChange} />
                </div>

                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea className="form-control" id="description" onChange={onChange}  name="description" rows="5"></textarea>
                </div>

                <button type="submit" onClick={handleClick} className="btn btn-dark">Add Note</button>
            </form>
        </div>
    )
}

export default AddNote

