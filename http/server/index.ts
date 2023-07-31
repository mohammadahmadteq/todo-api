import "reflect-metadata";
import express from "express";
import {apiPort, apiVersion} from "../../src/infrastructure/config/envrionmentVariables";
import authRoutes from "../routes/auth.route";

const server = express();
server.use(express.json());

server.use(`/v${apiVersion}/`, authRoutes);
console.log(apiPort);
server.listen(Number(apiPort), "0.0.0.0", () => {
    console.log("Listening");
});

