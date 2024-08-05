import express from "express";
import cors from "cors";
import morgan from "morgan";
import { connectDB } from "./config/db";

import dotenv from "dotenv";

import { Router } from "./routers";

const app = express();
dotenv.config();

app.use(cors());

app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));

connectDB(process.env.DB_URI);

Router(app);

export const viteNodeApp = app;
