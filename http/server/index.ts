import "reflect-metadata";
import express from "express";
import {apiPort, apiVersion} from "../../src/infrastructure/config/envrionmentVariables";
import authRoutes from "../routes/auth.route";
import userRoutes from "../routes/user.route";
import taskRoutes from "../routes/task.route";

const server = express();
server.use(express.json());

server.use(`/v${apiVersion}/`, authRoutes);
server.use(`/v${apiVersion}/user`, userRoutes);
server.use(`/v${apiVersion}/task`, taskRoutes);
console.log(apiPort);
server.listen(Number(apiPort), "0.0.0.0", () => {
    console.log("Listening");
});

