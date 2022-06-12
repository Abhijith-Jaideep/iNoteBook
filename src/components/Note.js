import React, { useContext, useEffect, useRef ,useState} from 'react'
import NoteContext from '../context/notes/NoteContext'
import NoteItem from './NoteItem'
import AddNote from './AddNote'

const Note = () => {

    const context = useContext(NoteContext)
    const { notes, getNotes,editNote } = context
    const [currentnote, setcurrentnote] = useState({id:"",title:"",description:"",tag:""})

    useEffect(() => {
        getNotes()
        // eslint-disable-next-line
    }, [notes])

    const ref = useRef(null)
    const refClose = useRef(null) 

    const updatenote = (note) => {
        ref.current.click()
        setcurrentnote({id:note._id,title:note.title,description:note.description,tag:note.tag})
        
    }

    const handleClick=()=>{
        refClose.current.click()
        editNote(currentnote.id,currentnote.title,currentnote.description,currentnote.tag)

    }

    const onChange=(e)=>{
        setcurrentnote({...currentnote, [e.target.name]:e.target.value})
    }

    return (
        <>
            <AddNote />

            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal"></button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" value={currentnote.title} data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">

                            <form className="my-3">

                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" value={currentnote.title} onChange={onChange} name="title" id="title" placeholder="Enter Title" />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" value={currentnote.tag} name="tag" id="tag" placeholder="Enter Tag" onChange={onChange} />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <textarea className="form-control" id="description" value={currentnote.description}  onChange={onChange} name="description" rows="5"></textarea>
                                </div>
                            </form>


                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" onClick={handleClick} className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div>


                <h1>Your Notes</h1>
                {notes.length===0 && "No Notes to Display"}
                <div className='row row-cols-md-4 g-4'>
                    {notes.map((notes) => {
                        return <div className='col' key={notes._id}>
                            <NoteItem notes={notes} updatenote={updatenote} key={notes._id} />
                        </div>
                    })}

                </div>

            </div>
        </>
    )
}

export default Note