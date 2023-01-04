import { Response, Request, Router } from "express";
import * as path from "path";
import * as fs from "fs";
import * as fsp from "fs/promises";
import { resizeImage } from "../utils";

const router = Router();

router.get("/upload", async (req: Request, res: Response) => {
  // eslint-disable-next-line no-unsafe-optional-chaining
  const { filename, width, height } = req?.query;

  if (!filename || !width || !height) {
    res.status(400).send("Please, enter your filename,width,height");
  } else {
    const requetWidth: number = Number(width) || 300;
    const requetHidth: number = Number(height) || 300;

    if (!requetWidth || !requetHidth) {
      res.status(500).send("Width and height must be a number");
    } else {
      const imagePath = path.join(__dirname.replace("fileRouter", "") + "/assets/" + filename + ".jpg");
      const outPut = path.join(__dirname.replace("fileRouter", "") + `/public/images/${filename}_thumb.jpg`);
      fs.stat(outPut, (error) => {
        if (error == null) {
          fsp
            .readFile(outPut)
            .then((Data: Buffer) => {
              res.status(200).contentType("jpg").send(Data);
            })
            .catch((err) => {
              res.status(500).send(err);
            });
        } else if (error.code === "ENOENT") {
          fs.stat(imagePath, function (er) {
            if (er == null) {
              try {
                resizeImage(imagePath, requetWidth, requetHidth, outPut).then(() => {
                  fsp
                    .readFile(outPut)
                    .then((Data: Buffer) => {
                      res.status(200).contentType("jpg").send(Data);
                    })
                    .catch(() => {
                      res.status(500).send("Error occurred processing the image");
                    });
                });
              } catch (err) {
                res.status(500).send("Error occurred processing the image" + err);
              }
            } else if (error.code === "ENOENT") {
              res.send("File not Exists");
            }
          });
        } else {
          console.log("Some other error: ", error.code);
        }
      });
    }
  }
});

router.post("/upload", async (req: Request, res: Response) => {
  try {
    // eslint-disable-next-line no-unsafe-optional-chaining
    const { filename, width, height } = req?.query;
    if (filename) {
      const imagePath = path.join(__dirname.replace("fileRouter", "") + "/assets/" + filename + ".jpg");
      const outPut = path.join(__dirname.replace("fileRouter", "") + `/public/images/${filename}_thumb.jpg`);
      const requetWidth = Number(width) || 300;
      const requetHidth = Number(height) || 300;

      const result = await resizeImage(imagePath, requetWidth, requetHidth, outPut);

      if (result) {
        res.json({ message: "Your image successfully resized" });
      }
    } else {
      console.log("Error Input file is missing");
    }
  } catch (error) {
    throw new Error(error + "your image could not be processed - | - or does not exist ");
  }
});

export default router;
