"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var supertest = require("supertest");
var path = require("path");
var fsp = require("fs/promises");
var utils_1 = require("../utils");
var request = supertest("http://localhost:3000");
var url = "/upload?filename=palmtunnel&width=340&height=300";
describe("Test endpoint response", function () {
    it("test server is work", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.get(url)];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(200);
                    return [2 /*return*/];
            }
        });
    }); });
    it("Test endpoint by POST METHOD", function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.post(url)];
                case 1:
                    result = _a.sent();
                    expect(result.status).toBe(200);
                    expect(result.body).toEqual(jasmine.objectContaining({
                        message: "Your image successfully resized"
                    }));
                    return [2 /*return*/];
            }
        });
    }); });
    it("Test api with request parameter endpoint  result 200", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.get("/upload/?filename=fjord&width=900&height=900")];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(200);
                    return [2 /*return*/];
            }
        });
    }); });
    it("Test api without request parameter endpoint  result 400", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.get("/upload")];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(400);
                    return [2 /*return*/];
            }
        });
    }); });
    it("Test api with some request parameter  endpoint result 400", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.get("/upload/?filename=fjord&height=900")];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(400);
                    return [2 /*return*/];
            }
        });
    }); });
});
describe("Test processing", function () {
    it("Test Image processed was successfully resized", function () { return __awaiter(void 0, void 0, void 0, function () {
        var imagePath, outPut, width, height, photo;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    imagePath = path.join(__dirname.replace("fileRouter", "") + "/assets/" + "fjord" + ".jpg");
                    outPut = path.join(__dirname.replace("fileRouter", "") + "/public/images/fjord_thumb.jpg");
                    width = 500;
                    height = 500;
                    return [4 /*yield*/, (0, utils_1.resizeImage)(imagePath, width, height, outPut)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, fsp.readFile(outPut)];
                case 2:
                    photo = (_a.sent()).buffer;
                    expect(photo).toBeInstanceOf(ArrayBuffer);
                    return [2 /*return*/];
            }
        });
    }); });
});
describe("resizeImage function", function () {
    it("should return a resized image", function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, utils_1.resizeImage)(path.join(__dirname + "/assets/" + "palmtunnel" + ".jpg"), 340, 300, path.join(__dirname + "/public/images/palmtunnel_thumb.jpg"))];
                case 1:
                    result = _a.sent();
                    expect(result).toEqual(jasmine.objectContaining({
                        format: "jpeg",
                        width: 340,
                        height: 300,
                        channels: 3,
                        premultiplied: false,
                        size: 37356
                    }));
                    return [2 /*return*/];
            }
        });
    }); });
});
