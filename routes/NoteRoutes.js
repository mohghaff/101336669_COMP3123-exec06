const express = require("express");
const mongoose = require("mongoose");
const noteModel = require("../models/NotesModel");
const routes = express.Router();




//TODO - Create a new Note
//http://mongoosejs.com/docs/api.html#document_Document-save
routes.post("/notes", async (req, res) => {
  // Validate request

  if (!req.body) {
    return res.status(400).send({
      message: "Note content can not be empty",
    });
  }

  try {
  
      const newNote = new noteModel(req.body);
      const note = await newNote.save();
      res.status(200).send(note);

    }
   
    catch (error) {
    res.status(400).send(error);
  }
});

//TODO - Retrieve all Notes
//http://mongoosejs.com/docs/api.html#find_find
routes.get("/notes", async (req, res) => {
  //Validate request
  if (!req.body) {
    return res.status(400).send({
      message: "Note content can not be empty",
    });
  }
  try {
    const notes = await noteModel.find();
    res.status(200).send(notes);
  } catch (error) {
    res.status(400).send(error);
  }
});


/*

{

    "noteTitle": "studyPlan",
    "noteDescription": "This is a plan to study for full stack test",
    "priority" : "High",
    "dateAdded": "10-13-2022",
    "dateUpdated": "10-14-2022"
}

*/





//TODO - Retrieve a single Note with noteId
//http://mongoosejs.com/docs/api.html#findbyid_findById
routes.get("/notes/:noteId", async (req, res) => {
  // Validate request
  if (!req.body) {
    return res.status(400).send({
      message: "Note content can not be empty",
    });
  }
  try {
    const newNote = await noteModel.findById(req.params.noteId, req.body);
    res.status(201).send(newNote);
  } catch (error) {
    res.status(400).send(error);
  }
});

//TODO - Update a Note with noteId
//http://mongoosejs.com/docs/api.html#findbyidandupdate_findByIdAndUpdate
routes.put("/notes/:noteId", async (req, res) => {
  // Validate request
  if (!req.body) {
    return res.status(400).send({
      message: "Note content can not be empty",
    });
  }
  try {
    const newNote = await noteModel.findByIdAndUpdate(
      req.params.noteId,
      req.body
    );

    res.status(200).send(newNote);
  } catch (error) {
    res.status(400).send(error);
  }
});

//TODO - Delete a Note with noteId
//http://mongoosejs.com/docs/api.html#findbyidandremove_findByIdAndRemove
routes.delete("/notes/:noteId", async (req, res) => {
  // Validate request
  if (!req.body) {
    return res.status(400).send({
      message: "Note content can not be empty",
    });
  }
  try {
    const deletedNote = await noteModel.findByIdAndDelete(req.params.noteId);
    if (!deletedNote) {
      res.status(400).send({ message: "No Note to be Deleted" });
    }
    res.status(200).send(deletedNote);
  } catch (error) {
    res.status(400).send(error);
  }
});


module.exports = routes;
