import "dotenv/config";
import cors from "cors";
import express from "express";
import { resolve } from "path";
import "express-async-errors";
import swaggerUi from "swagger-ui-express";
import { connect } from "@/infra/database/mongodb";
import swaggerDocument from "../app/docs/swagger.json";
import { routes } from "./routes";

connect();

const app = express();

app.use(cors());
app.use(express.json());



app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api", routes);

export { app };
