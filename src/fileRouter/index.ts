import { Response, Request, Router } from "express";
import * as path from "path";
import { resizeImage } from "../utils";

const router = Router();

router.get("/upload", async (req: Request, res: Response) => {
  // eslint-disable-next-line no-unsafe-optional-chaining
  const { filename, width, height } = req?.query;
  if (filename) {
    const file = path.join(__dirname.replace("fileRouter", "") + "/assets/" + filename + ".jpg");
    const outPut = path.join(__dirname.replace("fileRouter", "") + `/public/images/${filename}_thumb.jpg`);
    const requetWidth = Number(width) || 300;
    const requetHidth = Number(height) || 300;

    const result = await resizeImage(file, requetWidth, requetHidth, outPut);

    if (result) {
      res.json({ message: "Your image successfully resized" });
    }
  } else {
    console.log("Error Input file is missing");
  }
});

router.post("/upload", async (req: Request, res: Response) => {
  // eslint-disable-next-line no-unsafe-optional-chaining
  const { filename, width, height } = req?.query;
  if (filename) {
    const file = path.join(__dirname.replace("fileRouter", "") + "/assets/" + filename + ".jpg");
    const outPut = path.join(__dirname.replace("fileRouter", "") + `/public/images/${filename}_thumb.jpg`);
    const requetWidth = Number(width) || 300;
    const requetHidth = Number(height) || 300;

    const result = await resizeImage(file, requetWidth, requetHidth, outPut);

    if (result) {
      res.json({ message: "Your image successfully resized" });
    }
  } else {
    console.log("Error Input file is missing");
  }
});

export default router;
