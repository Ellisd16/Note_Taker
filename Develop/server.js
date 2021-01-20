const express = require("express");
const path = require("path");
const fs = require("fs");
const { notStrictEqual } = require("assert");

// Setting up the Express App

const app = express();
const PORT = 3000;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//We need 5 routes for this app (2 HTML routes, 3 API routes)

//Routes
//===============================

fs.readFile("db/db.json", (err, data) => {
    if (err) throw err;

    const notes = JSON.parse(data)

    app.get("/notes", (req, res) => {
        res.sendFile(path.join(__dirname, "/public/notes.html"))
    });

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "/public/index.html"))
    });



    //How do i call on the database from here?
    //Using the file directory to call the database

    //This will return all the notes
    app.get("/api/notes", (req, res) => {
        res.sendFile(path.join(__dirname, "db/db.json"));
        console.log("Here are all of the current notes!");
    });

    //This will receive new notes and add them to the db.json file
    app.post("/api/notes", (req, res) => {


        //Using fs.writeFile should add the data to the JSON, but i have to figure out how to get the data (or from where)

        let newNote = req.body;
        notes.push(newNote)

        fs.writeFile("/db/db.json", JSON.stringify(notes));
        console.log("Note was added! Mint Berrrrrryyy CRUNCH!")

    });


    //This will allow us to delete notes
    app.delete("/api/notes/:id", (req, res) => {

    });


    app.listen(PORT, () => {
        console.log("App listening on PORT " + PORT);
    });
});