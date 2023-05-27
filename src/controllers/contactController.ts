import { Request, Response } from "express";
import {
    createNewContact, deleteContactById,
    getAllContact,
    getContactById as getOneContact, updateContactById
} from "../services/contactService";


export async function getContact(
    req: Request,
    res: Response
): Promise<void> {
    try {
        const contacts = await getAllContact();
        res.status(200).json(contacts);
    } catch (error) {
        res.status(500).send("Error getting contact");
    }
}

export async function getContactById(req: Request, res: Response) {
    try {
        const id = req.params.id;
        const contact = await getOneContact(id);
        res.status(200).json(contact);
    } catch (error) {
        res.status(500).send("error");
    }
}

export async function createContact(req: Request, res: Response) {
    const {
        title,
        name,
        adress,
        realAdress,
        departement,
        country,
        tel,
        email} = req.body;

    if (title && name && adress && realAdress && departement && country && tel && email) {
        try {
            const newRestaurant = await createNewContact(
                title,
                name,
                adress,
                realAdress,
                departement,
                country,
                tel,
                email);
            res.status(201).json(newRestaurant);
        } catch (error) {
            res.status(500).send("Error creating restaurant");
        }
    } else {
        res.status(500).send("Error no data");
    }
}

export async function deleteContact(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    if (id) {
        try {
            const delRestaurant = await deleteContactById(id);
            res.status(200).send(delRestaurant);
        } catch (error) {
            res.status(500).send(error);
        }
    } else {
        res.status(400).send("Id is not a number");
    }
}

export async function updateContact(
    req: Request,
    res: Response
): Promise<void> {
    try {
        const id = req.params.id;
        const { name, address, note } = req.body;
        const updatedRestaurant = await updateContactById(
            id,
            name,
            address,
            note
        );
        if (!updatedRestaurant) {
            res.status(404).send(`Restaurant with id ${id} not found`);
        } else {
            res.status(200).json(updatedRestaurant);
        }
    } catch (error) {
        res.status(500).send("Error updating restaurant");
    }
}