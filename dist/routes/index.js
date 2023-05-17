"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const restaurantController_1 = require("../controllers/restaurantController");
const Router = express_1.default.Router();
// GET method route
Router.get("", restaurantController_1.getRestaurant);
Router.get("/:id", restaurantController_1.getRestaurantById);
// route pour créer un nouveau restaurant
Router.post("", restaurantController_1.createRestaurant);
// route pour mettre à jour un restaurant
Router.put("/:id", restaurantController_1.updateRestaurant);
// route pour supprimer un restaurant
Router.delete("/:id", restaurantController_1.deleteRestaurant);
exports.default = Router;
