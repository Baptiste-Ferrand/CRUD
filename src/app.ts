import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import morgan from "morgan";
import restaurantRoutes from "./routes/index";

dotenv.config();
// APP CEST EXPRESS
const app: Express = express();
const port = process.env.PORT;
//MORGAN POUR LE LOGS
app.use(morgan("combined"));
//
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//ROUTE RESTAURANTS
app.use("/restaurants", restaurantRoutes);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
