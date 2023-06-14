"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.updateContactById = exports.deleteContactById = exports.createNewContact = exports.getContactById = exports.getAllContact = void 0;
const supabase_js_1 = require("@supabase/supabase-js");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const csv_parse_1 = require("csv-parse");
require('dotenv').config();
const supabase = (0, supabase_js_1.createClient)(process.env.supabaseURL, process.env.supabaseKEY);
function getAllContact() {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const { data, error } = yield supabase.from("contact").select("*");
        if (error) {
            throw new Error(error.message);
        }
        return (_a = data === null || data === void 0 ? void 0 : data.map(mapToRestaurant)) !== null && _a !== void 0 ? _a : [];
    });
}
exports.getAllContact = getAllContact;
function getContactById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { data } = yield supabase.from("contact").select("*").eq("id", id);
            return data;
        }
        catch (error) {
            return error;
        }
    });
}
exports.getContactById = getContactById;
function createNewContact(title, name, adress, realAdress, departement, country, tel, email) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(title, name, adress, realAdress, departement, country, tel, email, "les query envoyer a la bdd pour creer contact");
        try {
            const error = yield supabase.from("contact").insert({
                title,
                name,
                adress,
                realAdress,
                departement,
                country,
                tel,
                email,
            });
            console.log(error);
            return "created";
        }
        catch (error) {
            return error;
        }
    });
}
exports.createNewContact = createNewContact;
function deleteContactById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { error } = yield supabase.from("contact").delete().eq("id", id);
            console.log(error, "error");
            if (error) {
                return error;
            }
            else {
                return "deleted contact : " + id;
            }
        }
        catch (error) {
            return error;
        }
    });
}
exports.deleteContactById = deleteContactById;
function updateContactById(id, name, address, note) {
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
exports.updateContactById = updateContactById;
function mapToRestaurant(record) {
    return {
        id: record.id,
        title: record.title,
        name: record.name,
        adress: record.adress,
        realAdress: record.realAdress,
        departement: record.departement,
        country: record.country,
        tel: record.tel,
        email: record.email,
    };
}
function readcsv() {
    const csvFilePath = path.resolve(__dirname, "../../assets/contacts_2.csv");
    const headers = ['title', 'name', 'adress', 'realAdress', 'departement', 'country', 'tel', 'email'];
    const fileContent = fs.readFileSync(csvFilePath, { encoding: 'utf-8' });
    (0, csv_parse_1.parse)(fileContent);
    (0, csv_parse_1.parse)(fileContent, {
        delimiter: ',',
        columns: headers,
    }, (error, result) => __awaiter(this, void 0, void 0, function* () {
        if (error) {
            console.error(error);
        }
        // console.log("Result", result);
        let i = 0;
        for (const item of result) {
            i++;
            const title = item.title;
            const name = item.name;
            const adress = item.adress;
            const realAdress = item.realAdress;
            const departement = item.departement;
            const country = item.country;
            const tel = item.tel;
            const email = item.email;
            yield createNewContact(title, name, adress, realAdress, departement, country, tel, email).then(r => console.log(r));
            console.log(i);
        }
    }));
}
