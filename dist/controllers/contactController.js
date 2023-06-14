"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fillContact = exports.updateContact = exports.deleteContact = exports.createContact = exports.getContactById = exports.getContact = void 0;
const contactService_1 = require("../services/contactService");
function getContact(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const contacts = yield (0, contactService_1.getAllContact)();
            res.status(200).json(contacts);
        }
        catch (error) {
            res.status(500).send("Error getting contact");
        }
    });
}
exports.getContact = getContact;
function getContactById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            const contact = yield (0, contactService_1.getContactById)(id);
            res.status(200).json(contact);
        }
        catch (error) {
            res.status(500).send("error");
        }
    });
}
exports.getContactById = getContactById;
function createContact(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { title, name, adress, realAdress, departement, country, tel, email } = req.body;
        if (title && name && adress && realAdress && departement && country && tel && email) {
            try {
                const newRestaurant = yield (0, contactService_1.createNewContact)(title, name, adress, realAdress, departement, country, tel, email);
                res.status(201).json(newRestaurant);
            }
            catch (error) {
                res.status(500).send("Error creating restaurant");
            }
        }
        else {
            res.status(500).send("Error no data");
        }
    });
}
exports.createContact = createContact;
function deleteContact(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = parseInt(req.params.id);
        if (id) {
            try {
                const delRestaurant = yield (0, contactService_1.deleteContactById)(id);
                res.status(200).send(delRestaurant);
            }
            catch (error) {
                res.status(500).send(error);
            }
        }
        else {
            res.status(400).send("Id is not a number");
        }
    });
}
exports.deleteContact = deleteContact;
function updateContact(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            const { name, address, note } = req.body;
            const updatedRestaurant = yield (0, contactService_1.updateContactById)(id, name, address, note);
            if (!updatedRestaurant) {
                res.status(404).send(`Restaurant with id ${id} not found`);
            }
            else {
                res.status(200).json(updatedRestaurant);
            }
        }
        catch (error) {
            res.status(500).send("Error updating restaurant");
        }
    });
}
exports.updateContact = updateContact;
function fillContact(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const contacts = yield (0, contactService_1.getAllContact)();
            console.log(contacts.length);
            if (contacts.length <= 0) {
                (0, contactService_1.readcsv)();
                res.status(201).send("Data Base Filled");
            }
            else {
                res.status(500).send("Data Base Already Fill");
            }
        }
        catch (error) {
            console.log(error);
            res.status(500).send("Error getting contact");
        }
    });
}
exports.fillContact = fillContact;
