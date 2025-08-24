import { Request, Response } from "express";
import { randomBytes } from "crypto";
import { URL } from "url";

import Url from "../models/url.js";
import AppError from "../utils/appError.js";

const BASE_URL: string = "http://localhost:3000/";
const URL_ID_LENGTH: number = 4;
const URL_ID_RETRIES: number = 50;

interface shortUrlRequestBody {
  url: string;
}

export const shortUrl = async (req: Request, res: Response) => {
  const { url: originalUrl } = req.body as shortUrlRequestBody;

  try {
    new URL(originalUrl);
  } catch {
    throw new AppError("Invalid url format", 422);
  }

  let shortUrlId: string = "";
  let idFound: boolean = false;
  for (let i = 0; i < URL_ID_RETRIES; i++) {
    shortUrlId = randomBytes(URL_ID_LENGTH).toString("base64url");

    const oldUrlId: object | null = await Url.findOne({ shortUrlId });
    if (!oldUrlId) {
      await Url.create({ originalUrl, shortUrlId });
      idFound = true;
      break;
    }
  }

  if (!idFound) {
    throw new Error("Failed to generate unique short url");
  }

  const shortUrl: string = BASE_URL + shortUrlId;

  res.jsend.success(
    { message: "Short URL created successfully", shortUrl },
    201
  );
};

export const redirectOriginalUrl = async (req: Request, res: Response) => {
  const { shortUrlId } = req.params;

  const url = await Url.findOneAndUpdate(
    { shortUrlId },
    { $inc: { visits: 1 } }
  );
  if (!url) {
    throw new AppError("Url not found", 404);
  }

  res.redirect(301, url.originalUrl);
};
