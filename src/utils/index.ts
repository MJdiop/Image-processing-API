import * as sharp from "sharp";
import { promises as fs } from "fs";
import { Response } from "express";

export const resizeImage = async (file: string, width: number, height: number, outPut: string) => {
  try {
    const result = await sharp(file)
      .resize(width, height)
      .jpeg({ quality: width <= 400 ? 50 : 80 })
      .toFile(outPut);
    return result;
  } catch (error) {
    throw new Error("error " + error);
  }
};

export const readFiles = async (
  response: Response,
  fileToRead: string,
  filename: unknown
): Promise<string | undefined> => {
  try {
    const files = await fs.readFile(fileToRead, "utf8").then((data) => {
      response.writeHead(200, { "Content-Type": "text/html" });
      const newData = data.replace("{{data}}", `<img src="/images/${filename}_thumb.jpg" alt="alt" />`);
      response.write(newData);
      response.end();
      return newData;
    });
    return files;
  } catch (error) {
    throw new Error("error " + error);
  }
};
