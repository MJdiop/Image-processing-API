import * as supertest from "supertest";
import * as path from "path";
import * as fsp from "fs/promises";
import { resizeImage } from "../utils";
const request = supertest("http://localhost:3000");
const url = "/upload?filename=palmtunnel&width=340&height=300";

describe("Test endpoint response", () => {
  it("test server is work", async () => {
    const response = await request.get(url);
    expect(response.status).toBe(200);
  });

  it("Test endpoint by POST METHOD", async () => {
    const result = await request.post(url);
    expect(result.status).toBe(200);
    expect(result.body).toEqual(
      jasmine.objectContaining({
        message: "Your image successfully resized"
      })
    );
  });

  it("Test api with request parameter endpoint  result 200", async () => {
    const response = await request.get("/upload/?filename=fjord&width=900&height=900");
    expect(response.status).toBe(200);
  });

  it("Test api without request parameter endpoint  result 400", async () => {
    const response = await request.get("/upload");
    expect(response.status).toBe(400);
  });

  it("Test api with some request parameter  endpoint result 400", async () => {
    const response = await request.get("/upload/?filename=fjord&height=900");
    expect(response.status).toBe(400);
  });
});

describe("Test processing", () => {
  it("Test Image processed was successfully resized", async () => {
    const imagePath = path.join(__dirname.replace("fileRouter", "") + "/assets/" + "fjord" + ".jpg");
    const outPut = path.join(__dirname.replace("fileRouter", "") + `/public/images/fjord_thumb.jpg`);
    const width = 500;
    const height = 500;
    await resizeImage(imagePath, width, height, outPut);
    const photo = (await fsp.readFile(outPut)).buffer;

    expect(photo).toBeInstanceOf(ArrayBuffer);
  });
});

describe("resizeImage function", () => {
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
        size: 37356
      })
    );
  });
});
