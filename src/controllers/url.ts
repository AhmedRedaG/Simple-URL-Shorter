import { Request, Response } from "express";
import { randomBytes } from "crypto";
import { URL } from "url";

import Url from "../models/url.js";
import AppError from "../utils/appError.js";

const BASE_URL: string = "http://localhost:3000/";
const URL_ID_LENGTH: number = 4;

interface shortUrlRequestBody {
  url: string;
}

export const shortUrl = async (req: Request, res: Response) => {
  const { url: originalUrl } = req.body as shortUrlRequestBody;

  try {
    new URL(originalUrl);
  } catch (err: any) {
    return new AppError(err.message, 422);
  }

  let shortedUrlId: string;
  while (true) {
    shortedUrlId = randomBytes(URL_ID_LENGTH).toString("base64url");

    const oldUrlId: object | null = await Url.findOne({ shortedUrlId });
    if (!oldUrlId) {
      await Url.create({ originalUrl, shortedUrlId });
      break;
    }
  }

  const shortedUrl: string = BASE_URL + shortedUrlId;

  res.jsend.success(
    { message: "Shorted url created successfully", shortedUrl },
    201
  );
};

export const redirectOriginalUrl = (req: Request, res: Response) => {};
