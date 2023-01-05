"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cacheMiddleware = void 0;
var NodeCache = require("node-cache");
var cache = new NodeCache({ stdTTL: 5000 });
var cacheMiddleware = function (req, res, next) {
    var key = "http://localhost:3000" + req.originalUrl || req.url;
    var cachedBody = cache.get(key);
    if (cachedBody) {
        res.send(cachedBody);
    }
    else {
        (function (body) {
            res.send(key);
            cache.set(key, body);
        });
        next();
    }
};
exports.cacheMiddleware = cacheMiddleware;
