const path = require("path");
const router = require('express').Router();
const fs = require("fs"); 
const { v4: uuidv4 } = require('uuid');

// Every route in this file is prefixed with '/api'

// GET route using DB.JSON file
router.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "../db/db.json"));
});

// Creating POST route- takes JSON input, "title" "text" and adds a new note object to the db.json file
router.post("/notes", function(req, res) {
    fs.readFile(path.join(__dirname, "../db/db.json"), "utf8", function(error, response) {
        if (error) {
            console.log(error);
        }
        const notes = JSON.parse(response);
        const noteRequest = req.body;
        //const newNoteID = notes.length + 1;
        const newNote = {
            id: uuidv4(),
            title: noteRequest.title,
            text: noteRequest.text
        };

        notes.push(newNote);
        res.json(newNote);
        fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(notes, null, 2), function(err) {
            if (err) throw err;
        });
    });
});

// Creates DELETE function- deleting the note object with the id from the DB.JSON FILE
router.delete("/notes/:id", (req, res) => {

    const deleteID = req.params.id;
    console.log(req.params.id)

    fs.readFile(path.join(__dirname, "../db/db.json"), 'utf-8', function(error, data) {
       if(error) {
        throw error;
       } 
       console.log("Data: ", data)
        console.log(typeof data)
        const js = JSON.parse(data);
        console.log("Data: ", js)
         console.log(typeof js)

       const result = js.filter((note) => note.id !== deleteID);
   
       fs.writeFile(path.join(__dirname,"../db/db.json"), JSON.stringify(result), function(error, data) {
            if(error) {
            throw error;
            }
            console.log(data);   
            res.json(`Item ${deleteID} has been deleted 🗑️`);
         })

    }) 
    });

module.exports = router;