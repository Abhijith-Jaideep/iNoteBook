import React, { useContext,useEffect } from 'react'
import NoteContext from '../context/notes/NoteContext'
import NoteItem from './NoteItem'
import AddNote from './AddNote'

const Note = () => {

    const context = useContext(NoteContext)
    const { notes,getNotes } = context

    useEffect(() => {
      getNotes()
      // eslint-disable-next-line
    }, [notes])
    

    return (
        <>
            <AddNote />
            <div>
                <h1>Your Notes</h1>
                <div className='row row-cols-md-4 g-4'>
                    {notes.map((notes) => {
                        return <div className='col' key={notes._id}>
                            <NoteItem notes={notes} key={notes._id} />
                        </div>
                    })}

                </div>

            </div>
        </>
    )
}

export default Note