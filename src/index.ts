import * as express from "express";
import fileRouter from "./fileRouter";
import path = require("path");
import { readFiles, resizeImage } from "./utils";

const PORT = 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", fileRouter);

app.use("/", express.static(__dirname + "/public"));
app.use("/image", async (req, res) => {
  try {
    // eslint-disable-next-line no-unsafe-optional-chaining
    const { filename, width, height } = req?.query;
    const file = path.join(__dirname.replace("fileRouter", "") + "/assets/" + filename + ".jpg");
    const outPut = path.join(__dirname.replace("fileRouter", "") + `/public/images/${filename}_thumb.jpg`);
    const requetWidth = Number(width) || 300;
    const requetHidth = Number(height) || 300;

    await resizeImage(file, requetWidth, requetHidth, outPut);

    if (filename) {
      const fileToRead = path.join(__dirname + "/public/index.html");
      readFiles(res, fileToRead, filename);
    } else {
      console.log("Error Input file is missing");
    }
  } catch (error) {
    throw new Error(error + "your image could not be processed - | - or does not exist ");
  }
});

app.listen(PORT, () => {
  console.log("Server started on port " + PORT);
});
