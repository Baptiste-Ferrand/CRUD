import express from "express";
import {
  getRestaurant,
  getRestaurantById,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
} from "../controllers/restaurantController";

const Router = express.Router();

// GET method route
Router.get("", getRestaurant);

Router.get("/:id", getRestaurantById);

// route pour créer un nouveau restaurant
Router.post("", createRestaurant);

// route pour mettre à jour un restaurant
Router.put("/:id", updateRestaurant);

// route pour supprimer un restaurant
Router.delete("/:id", deleteRestaurant);

export default Router;
