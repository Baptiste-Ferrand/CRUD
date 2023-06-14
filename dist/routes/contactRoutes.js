"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const contactController_1 = require("../controllers/contactController");
const Router = express_1.default.Router();
// GET method route
Router.get("", contactController_1.getContact);
//Get id method route
Router.get("/:id", contactController_1.getContactById);
// route pour créer un nouveau restaurant
Router.post("", contactController_1.createContact);
// route pour mettre à jour un restaurant
Router.put("/:id", contactController_1.updateContact);
// route pour supprimer un restaurant
Router.delete("/:id", contactController_1.deleteContact);
Router.post("/fill", contactController_1.fillContact);
exports.default = Router;
