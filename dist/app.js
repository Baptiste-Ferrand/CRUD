"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const morgan_1 = __importDefault(require("morgan"));
const index_1 = __importDefault(require("./routes/index"));
const contactRoutes_1 = __importDefault(require("./routes/contactRoutes"));
dotenv_1.default.config();
// APP CEST EXPRESS
const app = (0, express_1.default)();
const port = process.env.PORT;
//MORGAN POUR LE LOGS
app.use((0, morgan_1.default)("combined"));
//
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
//ROUTE RESTAURANTS
app.use("/restaurants", index_1.default);
//ROUTE CONTACT
app.use("/contact", contactRoutes_1.default);
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
