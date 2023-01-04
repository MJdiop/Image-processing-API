import * as express from "express";
import fileRouter from "./fileRouter";

const PORT = 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", express.static(__dirname + "/public"));

app.use("/", fileRouter);

app.listen(PORT, () => {
  console.log("Server started on port " + PORT);
});
