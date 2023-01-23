const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

//check to see if accurate 
const PORT = process.env.port || 8081;

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

// GET * - will return the index.html
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, './public/index.html')));
  console.log("Your index!");

//GET/notes - will return the notes.html file
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, './public/notes.html')));
console.log("Your Notes!");




// GET /api/notes
// Should read the db.json file and return all saved notes as JSON

// Working, console logs object 
// In class example response.json(response);
app.get('/api/notes', (req, response) => {

//use fs(file system).readFile to read the data on a file/db.json file
    fs.readFile(path.join(__dirname, './db/db.json'), 'utf8', (err, jsonString) => {
        if (err) {
            console.log("File read failed:", err)
            return
        }
        console.log('File data:', jsonString)
        response.json(JSON.parse(jsonString));
        // json.parse
    })
})

//POST/api notes
//Should receive a new note to save on the request body, add it to db.json file and return new note to client 
app.post("/api/notes", function (request, response) {
     // Inform the client that their POST request was received
     //from class notes activity 14 solved folder (?)
  res.json(`${req.method} request received to notes`);
   // Log our request to the terminal
   console.info(`${req.method} request received to upvote`);

    fs.readFile(path.join(__dirname, "db", "db.json"), 'utf8', (err, jsonString) => {
        if (err) {
            console.log("File read failed:", err)
            return
        }
        console.log('File data:', jsonString);
        // json.parse
        var notes = JSON.parse(jsonString);

        // Note object 
        const newNote = {
            title: request.body.title,
            text: request.body.text,
            // Github code 
            id: Math.random().toString(36).substr(2, 9)
        };

        // console.log(newNote);
        // array
        // let noteText = [];
        notes.push(newNote);
        // Will not push to newNote
        let NotesJSON = JSON.stringify(notes);
        // push to array 
        // then stringify 

        fs.writeFile(path.join(__dirname, "db", "db.json"), NotesJSON, (err) => {
            if (err) {
                return console.log(err);
            }
            // this is console logging
            console.log("Success!", NotesJSON);
            return NotesJSON;
        });

    })

});


// DELETE /api/notes/:id 
//  Should recieve a query paramter containing the id of a note to delete. This means you'll need to find a way to give each note a unique id when it's saved. In order to delete a note, you'll need to read all notes from the db.json file, remove the note with the given id property, and then rewrite the notes to the db.json file.

// Internal Server Error
app.delete('/api/notes/:id', function (request, response) {

    // console.log(request);
    // if (err) {
    //     console.log("Delete failed:", err)
    // }


    // set request to variable 
    // set request id

    fs.readFile(path.join(__dirname, "db", "db.json"), 'utf8', (err, jsonString) => {
        if (err) {
            console.log("File read failed:", err)
            return
        }
        console.log('File data:', jsonString);
        // json.parse
        var notes = JSON.parse(jsonString);

        // Note object 
        const newNote = {
            title: request.body.title,
            text: request.body.text,
            // Github code 
            id: Math.random().toString(36).substr(2, 9)
        };

        // console.log(newNote);
        // array
        // let noteText = [];
        notes.splice(request.params.id, 1);
        // notes.push(newNote);
        // Will not push to newNote
        let NotesJSON = JSON.stringify(notes);
        // push to array 
        // then stringify 

        fs.writeFile(path.join(__dirname, "db", "db.json"), NotesJSON, (err) => {
            if (err) {
                return console.log(err);
            }
            // this is console logging
            console.log("Success!", NotesJSON);
            return NotesJSON;
        });

    })

});
// Server listening confirmation
app.listen(PORT, () => {
    console.log(`Server is listening on PORT ${PORT}`);
});
