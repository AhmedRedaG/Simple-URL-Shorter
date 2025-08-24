import express from "express";
import jsendMiddleware from "jsend-middleware";
import cors from "cors";

import urlRouter from "./routers/url.js";
import errorHandler from "./middlewares/errorHandler.js";

const app = express();

app.use(cors());
app.use(jsendMiddleware());
app.use(express.json());

app.use("/", urlRouter);
app.use(errorHandler);

export default app;
