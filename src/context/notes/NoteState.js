import React, { useState } from 'react'
import NoteContext from './NoteContext'




const NoteState = (props) => {

  const [notes, setnotes] = useState([])

  const getNotes = async () => {
    const response = await fetch("http://localhost:5000/api/notes/fetch", {
      method: "GET",
      headers: {
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJhNDY1MDAyYTdkZTMzYjIzZDY1OWE2In0sImlhdCI6MTY1NDk0ODUxMH0.WQbbGgKr3s485O-ihUO4WAkkrRxyP_Ke20Z5gZZCfO8",
        "Content-Type": "application/json"
      }
    }
    )
    const json = await response.json()
    setnotes(json)
  }



  const addNote = async (title, description, tag) => {
    const note = {
      title: title,
      description: description,
      tag: tag
    }

    const response = await fetch("http://localhost:5000/api/notes/addnote", {
      method: "POST",
      headers: {
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJhNDY1MDAyYTdkZTMzYjIzZDY1OWE2In0sImlhdCI6MTY1NDk0ODUxMH0.WQbbGgKr3s485O-ihUO4WAkkrRxyP_Ke20Z5gZZCfO8",
        "Content-Type": "application/json"
      },
      body:JSON.stringify(note)
      }
    )
      console.log(response)
  }

  const deleteNote = (id) => {
    const response = fetch(`http://localhost:5000/api/notes/deletenote/${id}`,{
      method:"DELETE",
      headers: {
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJhNDY1MDAyYTdkZTMzYjIzZDY1OWE2In0sImlhdCI6MTY1NDk0ODUxMH0.WQbbGgKr3s485O-ihUO4WAkkrRxyP_Ke20Z5gZZCfO8",
        "Content-Type": "application/json"
      },
    })

    console.log(response)
  }

  const editNote = async (id,title,description,tag) => {
      const note = {
        title:title,
        description:description,
        tag:tag
      }

      const json = JSON.stringify(note)

      const response = await fetch(`http://localhost:5000/api/notes/updatenote/${id}`,{
        method:"POST",
        headers: {
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJhNDY1MDAyYTdkZTMzYjIzZDY1OWE2In0sImlhdCI6MTY1NDk0ODUxMH0.WQbbGgKr3s485O-ihUO4WAkkrRxyP_Ke20Z5gZZCfO8",
          "Content-Type": "application/json"
        },
        body:json
      })
      console.log(response)
  }


  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState