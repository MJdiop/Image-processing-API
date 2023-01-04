import * as express from "express";
import fileRouter from "./fileRouter";
import path = require("path");
import { readFiles } from "./utils";

const PORT = 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", fileRouter);

app.use("/", express.static(__dirname + "/public"));
app.use("/image", (req, res) => {
  // eslint-disable-next-line no-unsafe-optional-chaining
  const { filename } = req?.query;
  if (filename) {
    const fileToRead = path.join(__dirname + "/public/index.html");
    readFiles(res, fileToRead, filename);
  } else {
    console.log("Error Input file is missing");
  }
});

app.listen(PORT, () => {
  console.log("Server started on port " + PORT);
});
