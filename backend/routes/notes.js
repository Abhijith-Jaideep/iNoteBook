const express = require('express')
const router = express.Router()
const Notes = require('../models/Notes')
const fetchUser = require('../middleware/fetchUser')
const { body, validationResult } = require('express-validator')
const { findById } = require('../models/Notes')

router.get("/fetch", fetchUser, async (req, res) => {
    const note = await Notes.find({ user: req.user.id })
    res.send(note)
})

router.post("/addnote", fetchUser, body('title',"invalid title").isLength({ min: 1 }),
    body('description',"invalid description").isLength({min:1}), async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        await Notes.create({
            user: req.user.id,
            title : req.body.title,
            description : req.body.description,
            tag : req.body.tag,
        }
        )
        res.send("Note added to Database")
    })

router.put('/updatenote/:id',fetchUser,async (req,res)=>{
    const {title,description,tag} = req.body

    let newNote={}
    if(title){newNote.title = title}
    if(description){newNote.description = description}
    if(tag){newNote.tag = tag}

    let note = await Notes.findById(req.params.id)
    if(!note){
        return res.status(400).send("Not found")
    }
 
    if(note.user.toString()!==req.user.id){
        return res.status(401).send("illegal move")
    }

    
    note=await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
    res.send(note)



})

router.delete("/deletenote/:id",fetchUser,async (req,res)=>{
    let notes = await Notes.findById(req.params.id)
    
    if(!notes){return res.status(400).send("not found")}

    if(notes.user.toString()!==req.user.id){return res.status(401).send("illegal move")}


    await Notes.findByIdAndDelete(req.params.id)

    res.send("Deleted Successfully")


})

module.exports = router