import express from "express";
import { NextFunction, Request, Response } from "express";
import * as http from "http"
import cors from "cors";
import helmet from "helmet";
import { ErrorCustom } from "./common/types";
import { errorMessageHandler } from "./util/errorHandler"
import charts from "./routes/charts";


require("dotenv").config();

//App initialization
const app = express();
const HTTP_PORT = process.env.HTTP_PORT;


//Define middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/", charts);


app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, Content-Length, X-Requested-With, Accept");
  res.setHeader("Content-Type", "application/json");
  next();
});



//Not found message
app.use((req, res) => {
  return res.status(404).send({ message: "Not found" });
})

//Error message handler
app.use((err: ErrorCustom, req: Request, res: Response, next: NextFunction) => {

  if (err.status) {
    let error = errorMessageHandler(err.status, err.message);
    res.status(err.status).send(error);
  } else {
    return res.status(500).send(err);
  }
})

// USE IN PRODUCTION
const startServer = () => {

  http.createServer(app).listen(HTTP_PORT, () => {
    console.log("HTTP server started on port %s", HTTP_PORT);
  });
}

setImmediate(startServer);