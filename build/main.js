"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var http = __importStar(require("http"));
var fs = __importStar(require("fs"));
var path = __importStar(require("path"));
require("./string.extensions"); // depends on where the file is relative to your source code
var host = '127.0.0.1';
var port = 8000;
var clients = [];
var requestListener = function (req, res) {
    res.setHeader("Content-Type", "text/html");
    //res.setHeader("Content-Type", "application/json");
    //res.writeHead(200);
    var url = req.url;
    console.log(url);
    if (url.contains("index.html") || url === "/") {
        fs.readFile(path.join(__dirname, "/Templates/index.html"), function (err, contents) {
            if (err)
                throw err;
            try {
                res.setHeader("Content-Type", "text/html");
                res.cookie("twisted", "somerandomnumber");
                res.writeHead(200);
                res.write(contents);
            }
            catch (except) {
                console.error(except);
            }
        });
    }
};
var server = http.createServer(requestListener);
//setInterval(() => {
//    res.write("test");
//}, 1000);
server.listen(port, host, function () {
    console.log("Server is running on http://" + host + ":" + port);
});
