import express from "express";

import urlRouter from "./routers/url.js";

const app = express();

app.use(express.json());

app.use("/", urlRouter);

export default app;
