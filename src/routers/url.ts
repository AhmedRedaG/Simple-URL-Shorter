import { Router } from "express";

import * as urlController from "../controllers/url.js";

const router = Router();

router.post("/", urlController.shortUrl);

router.get("/:shortUrlId", urlController.redirectUrl);

router.get("/:shortUrlId/info", urlController.urlInfo);

export default router;
