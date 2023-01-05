import * as NodeCache from "node-cache";
import { Request, Response, NextFunction } from "express";

const cache = new NodeCache({ stdTTL: 5000 });

export const cacheMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const key = "http://localhost:3000" + req.originalUrl || req.url;
  const cachedBody = cache.get(key);
  if (cachedBody) {
    res.send(cachedBody);
  } else {
    (body: Response) => {
      res.send(key);
      cache.set(key, body);
    };
    next();
  }
};
