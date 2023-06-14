import express from "express";
import {
    createContact,
    deleteContact,
    getContact,
    getContactById,
    updateContact,
    fillContact
} from "../controllers/contactController";


const Router = express.Router();


// GET method route
Router.get("", getContact);

//Get id method route
Router.get("/:id", getContactById);

// route pour créer un nouveau restaurant
Router.post("", createContact);

// route pour mettre à jour un restaurant
Router.put("/:id", updateContact);

// route pour supprimer un restaurant
Router.delete("/:id", deleteContact);

Router.post("/fill", fillContact);

export default Router;

