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

  let shortedUrlId: string = "";
  let idFound: boolean = false;
  for (let i = 0; i < URL_ID_RETRIES; i++) {
    shortedUrlId = randomBytes(URL_ID_LENGTH).toString("base64url");

    const oldUrlId: object | null = await Url.findOne({ shortedUrlId });
    if (!oldUrlId) {
      await Url.create({ originalUrl, shortedUrlId });
      idFound = true;
      break;
    }
  }

  if (!idFound) {
    throw new Error("Failed to generate unique short url");
  }

  const shortedUrl: string = BASE_URL + shortedUrlId;

  res.jsend.success(
    { message: "Short URL created successfully", shortedUrl },
    201
  );
};

export const redirectOriginalUrl = (req: Request, res: Response) => {};
