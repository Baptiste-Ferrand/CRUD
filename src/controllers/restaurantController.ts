// regarde les body si t'es données sont la, controlle que le donnee correcpond a tes interface avant appeler les service
import { Request, Response } from "express";
import {
  getAllRestaurants,
  getRestaurantById as getOneRestaurant,
  createNewRestaurant,
  updateRestaurantById,
  deleteRestaurantById,
} from "../services/restaurantService";
import { log } from "console";

export async function getRestaurant(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const restaurants = await getAllRestaurants();
    res.status(200).json(restaurants);
  } catch (error) {
    res.status(500).send("Error getting restaurants");
  }
}

export async function getRestaurantById(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const restaurant = await getOneRestaurant(id);
    res.status(200).json(restaurant);
  } catch (error) {
    res.status(500).send("error");
  }
}

export async function createRestaurant(req: Request, res: Response) {
  const { name, address, note } = req.body;

  if (name && address && note) {
    try {
      const newRestaurant = await createNewRestaurant(name, address, note);
      res.status(201).json(newRestaurant);
    } catch (error) {
      res.status(500).send("Error creating restaurant");
    }
  } else {
    res.status(500).send("Error no data");
  }
}

export async function deleteRestaurant(req: Request, res: Response) {
  const id = parseInt(req.params.id);
  if (id) {
    try {
      const delRestaurant = await deleteRestaurantById(id);
      res.status(200).send(delRestaurant);
    } catch (error) {
      res.status(500).send(error);
    }
  } else {
    res.status(400).send("Id is not a number");
  }
}

export async function updateRestaurant(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const id = req.params.id;
    const { name, address, note } = req.body;
    const updatedRestaurant = await updateRestaurantById(
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
