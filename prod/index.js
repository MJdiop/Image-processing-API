"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var fileRouter_1 = require("./fileRouter");
var PORT = 3000;
var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", express.static(__dirname + "/public"));
app.use("/", fileRouter_1.default);
app.listen(PORT, function () {
    console.log("Server started on port " + PORT);
});
