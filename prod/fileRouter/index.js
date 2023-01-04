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
var express_1 = require("express");
var path = require("path");
var utils_1 = require("../utils");
var router = (0, express_1.Router)();
router.get("/upload", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, filename, width, height, file, outPut, requetWidth, requetHidth, result, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                _a = req === null || req === void 0 ? void 0 : req.query, filename = _a.filename, width = _a.width, height = _a.height;
                if (!filename) return [3 /*break*/, 2];
                file = path.join(__dirname.replace("fileRouter", "") + "/assets/" + filename + ".jpg");
                outPut = path.join(__dirname.replace("fileRouter", "") + "/public/images/".concat(filename, "_thumb.jpg"));
                requetWidth = Number(width) || 300;
                requetHidth = Number(height) || 300;
                return [4 /*yield*/, (0, utils_1.resizeImage)(file, requetWidth, requetHidth, outPut)];
            case 1:
                result = _b.sent();
                if (result) {
                    res.json({ message: "Your image successfully resized" });
                }
                return [3 /*break*/, 3];
            case 2:
                console.log("Error Input file is missing");
                _b.label = 3;
            case 3: return [3 /*break*/, 5];
            case 4:
                error_1 = _b.sent();
                throw new Error(error_1 + "your image could not be processed - | - or does not exist ");
            case 5: return [2 /*return*/];
        }
    });
}); });
router.post("/upload", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, filename, width, height, file, outPut, requetWidth, requetHidth, result, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                _a = req === null || req === void 0 ? void 0 : req.query, filename = _a.filename, width = _a.width, height = _a.height;
                if (!filename) return [3 /*break*/, 2];
                file = path.join(__dirname.replace("fileRouter", "") + "/assets/" + filename + ".jpg");
                outPut = path.join(__dirname.replace("fileRouter", "") + "/public/images/".concat(filename, "_thumb.jpg"));
                requetWidth = Number(width) || 300;
                requetHidth = Number(height) || 300;
                return [4 /*yield*/, (0, utils_1.resizeImage)(file, requetWidth, requetHidth, outPut)];
            case 1:
                result = _b.sent();
                if (result) {
                    res.json({ message: "Your image successfully resized" });
                }
                return [3 /*break*/, 3];
            case 2:
                console.log("Error Input file is missing");
                _b.label = 3;
            case 3: return [3 /*break*/, 5];
            case 4:
                error_2 = _b.sent();
                throw new Error(error_2 + "your image could not be processed - | - or does not exist ");
            case 5: return [2 /*return*/];
        }
    });
}); });
exports.default = router;
