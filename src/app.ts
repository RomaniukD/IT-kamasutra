import express from "express";
import { getCoursesRoutes } from "./routes/courses.js";
import { getTestsRouter } from "./routes/testRouter.js";
import { db } from "./db/db.js";

export const app = express();
const jsonBodyMiddleware = express.json();
app.use(jsonBodyMiddleware);

app.use("/courses", getCoursesRoutes(db));
app.use("/__test__", getTestsRouter(db));