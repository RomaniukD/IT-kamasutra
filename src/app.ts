import express from "express";
import { getCoursesRoutes } from "./routes/courses.js";
import { db } from "./db/db.js";
export const app = express();
const jsonBodyMiddleware = express.json();
app.use(jsonBodyMiddleware);

app.use("/courses", getCoursesRoutes(db));
