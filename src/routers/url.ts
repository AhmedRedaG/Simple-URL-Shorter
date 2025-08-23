import { Router } from "express";

import * as urlController from "../controllers/url.js";

const router = Router();

router.post("/", urlController.shortUrl);

router.get("/:shortedUrl", urlController.redirectOriginalUrl);

export default router;
