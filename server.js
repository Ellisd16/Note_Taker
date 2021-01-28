const express = require("express");
const path = require("path");
const fs = require("fs");
const { notStrictEqual } = require("assert");

// Setting up the Express App

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "public")))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


//We need 5 routes for this app (2 HTML routes, 3 API routes)

//Routes
//===============================
app.get("/notes", (req, res) => {
    console.log("aaaaaaaaa");
    res.sendFile(path.join(__dirname, "./public/notes.html"))
});
//this link is ok

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"))
});

//fs readFile will allow all the routes to have access to the json
// fs.readFile("db/db.json", (err, data) => {
//     if (err) throw err;

//     const notes = JSON.parse(data)



// I need to move the fs readfile around


//How do i call on the database from here?
//Using the file directory to call the database

//This will return all the notes
app.get("/api/notes", (req, res) => {

    fs.readFileSync("./db/db.json", "utf-8", (function (data) {
        return res.json(JSON.parse(data))
    }));
    console.log("Here are all of the current notes!");
});

//This will receive new notes and add them to the db.json file
app.post("/api/notes", (req, res) => {
    let newNote = req.body;

    fs.readFileSync("./db/db.json", "utf-8", (function (data) {
        const notes = JSON.parse(data);
        if (newNote.id || newNote.id === 0) {
            let currentNote = notes[newNote.id];
            currentNote.title = newNote.title;
            currentNote.text = newNote.text;
        } else {
            notes.push(newNote);
        }
        //Using fs.writeFile should add the data to the JSON, but i have to figure out how to get the data (or from where)
        fs.writeFile("db/db.json", JSON.stringify(notes));
        console.log("Note was added! Mint Berrrrrryyy CRUNCH!");
    }));
    res.json(newNote);

});


//How to do i give the notes a specific array?

//I think i might need a another route

// app.get("/api/notes/:id", (req, res) => {
//     res.json(notes[req.params.id])
// })


//This will allow us to delete notes
app.delete("/api/notes/:id", (req, res) => {
    const id = req.params.id
    fs.readFileSync("./db/db.json", "utf-8", (function (data) {
        const notes = JSON.parse(data)
        //splice removes the contents of the array (the selected notes)
        notes.splice(id, 1)
        fs.writeFile(path.join(__dirname, "./db/db.json"), JSON.stringify(notes));
        console.log("Note was deleted! ZoooWeeeMama!")
    })
    )

    res.json(id);
});





app.listen(PORT, () => {
    console.log("App listening on PORT " + PORT);
});
