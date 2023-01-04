import * as supertest from "supertest";
import path = require("path");
import { resizeImage } from "../utils";
const request = supertest("http://localhost:3000");

describe("resizeImage", () => {
  it("should return a resized image", async () => {
    const result = await resizeImage(
      path.join(__dirname + "/assets/" + "palmtunnel" + ".jpg"),
      340,
      300,
      path.join(__dirname + `/public/images/palmtunnel_thumb.jpg`)
    );
    expect(result).toEqual(
      jasmine.objectContaining({
        format: "jpeg",
        width: 340,
        height: 300,
        channels: 3,
        premultiplied: false,
        size: 23210
      })
    );
  });
});

// test endpoint
const url = "/upload?filename=palmtunnel&width=340&height=300";
describe("endpoint", () => {
  it("Test endpoint", async () => {
    const result = await request.post(url);
    expect(result.status).toBe(200);
    expect(result.body).toEqual(
      jasmine.objectContaining({
        message: "Your image successfully resized"
      })
    );
  });
});
