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
exports.updateRestaurant = exports.deleteRestaurant = exports.createRestaurant = exports.getRestaurantById = exports.getRestaurant = void 0;
const restaurantService_1 = require("../services/restaurantService");
function getRestaurant(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const restaurants = yield (0, restaurantService_1.getAllRestaurants)();
            res.status(200).json(restaurants);
        }
        catch (error) {
            res.status(500).send("Error getting restaurants");
        }
    });
}
exports.getRestaurant = getRestaurant;
function getRestaurantById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            const restaurant = yield (0, restaurantService_1.getRestaurantById)(id);
            res.status(200).json(restaurant);
        }
        catch (error) {
            res.status(500).send("error");
        }
    });
}
exports.getRestaurantById = getRestaurantById;
function createRestaurant(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name, address, note } = req.body;
        if (name && address && note) {
            try {
                const newRestaurant = yield (0, restaurantService_1.createNewRestaurant)(name, address, note);
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
exports.createRestaurant = createRestaurant;
function deleteRestaurant(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = parseInt(req.params.id);
        if (id) {
            try {
                const delRestaurant = yield (0, restaurantService_1.deleteRestaurantById)(id);
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
exports.deleteRestaurant = deleteRestaurant;
function updateRestaurant(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            const { name, address, note } = req.body;
            const updatedRestaurant = yield (0, restaurantService_1.updateRestaurantById)(id, name, address, note);
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
exports.updateRestaurant = updateRestaurant;
