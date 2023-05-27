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
exports.updateRestaurantById = exports.deleteRestaurantById = exports.createNewRestaurant = exports.getRestaurantById = exports.getAllRestaurants = void 0;
const supabase_js_1 = require("@supabase/supabase-js");
require('dotenv').config();
const supabase = (0, supabase_js_1.createClient)(process.env.supabaseURL, process.env.supabaseKEY);
function getAllRestaurants() {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const { data, error } = yield supabase.from("restaurant").select("*");
        if (error) {
            throw new Error(error.message);
        }
        return (_a = data === null || data === void 0 ? void 0 : data.map(mapToRestaurant)) !== null && _a !== void 0 ? _a : [];
    });
}
exports.getAllRestaurants = getAllRestaurants;
function getRestaurantById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { data } = yield supabase.from("restaurant").select("*").eq("id", id);
            return data;
        }
        catch (error) {
            return error;
        }
    });
}
exports.getRestaurantById = getRestaurantById;
function createNewRestaurant(name, address, note) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(name, address, note, "les query envoyer a la bdd pour creer resto");
        try {
            const error = yield supabase.from("restaurant").insert({
                name,
                address,
                note,
            });
            return "created";
        }
        catch (error) {
            return error;
        }
    });
}
exports.createNewRestaurant = createNewRestaurant;
function deleteRestaurantById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const error = yield supabase.from("restaurant").delete().eq("id", id);
            console.log(error, "error");
            if (error) {
                return error;
            }
            else {
                return "deleted restaurant : " + id;
            }
        }
        catch (error) {
            return error;
        }
    });
}
exports.deleteRestaurantById = deleteRestaurantById;
function updateRestaurantById(id, name, address, note) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield supabase
                .from("restaurant")
                .update({ name, address, note })
                .eq("id", id);
            console.log(data, "retours des data dans le service");
            return data;
        }
        catch (error) {
            console.log(error, "log error dans le service");
            return error;
        }
    });
}
exports.updateRestaurantById = updateRestaurantById;
function mapToRestaurant(record) {
    return {
        id: record.id,
        name: record.name,
        address: record.address,
        note: record.note,
    };
}
