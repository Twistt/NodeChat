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
var http_1 = require("http");
var fs = __importStar(require("fs"));
var path = __importStar(require("path"));
require("./string.extensions"); // depends on where the file is relative to your source code
var models_1 = require("./models");
var host = '127.0.0.1';
var port = 8000;
var serverData = new models_1.ServerData();
var clients = [];
//const messages: Message[] = [];
var requestListener = function (req, res) {
    var _a;
    var cookies = parseCookies(req.headers.cookie);
    //console.log(cookies);
    var url = req.url;
    var client;
    console.log(url);
    client = clients.first('name', cookies.name);
    if (client === null || url.contains("index.html") || url === "/") {
        if (client === null)
            console.log("client is null");
        else {
            console.log("client is not null - we need to pop him off");
            clients.remove(clients.position('name', client.name));
        }
        client = new models_1.Client(req, res);
        client.request = req;
        client.response = res;
        client.login = Date.now();
        client.name = (_a = (cookies.name === undefined || cookies.name === null ? randomName() : cookies.name)) !== null && _a !== void 0 ? _a : randomName; //this should come from the login
        cookies = { 'name': client.name };
        res.setHeader("Content-Type", "text/html");
        res.setHeader("Set-Cookie", stringifyCookies(cookies));
        console.log(stringifyCookies(cookies));
        clients.push(client);
        fs.readFile(path.join(__dirname, "/Templates/index.html"), function (err, contents) {
            client.response.write(contents);
            serverData.Messages.last(100).forEach(function (msg) {
                client.send(msg);
            });
        });
    }
    else {
        var body_1 = [];
        req.on('data', function (chunk) {
            body_1.push(chunk);
        });
        req.on('end', function () {
            res.setHeader("Content-Type", "text/html");
            res.setHeader("Set-Cookie", stringifyCookies(cookies));
            //end of data
            var result = decodeURIComponent(Buffer.concat(body_1).toString()).toString().replaceAll("+", " ").replace("message=", "").split('&');
            var msg = new models_1.Message();
            msg.Text = result[0];
            msg.UserName = client.name;
            msg.TimeStamp = Date.now();
            serverData.Messages.push(msg);
            console.log(client.name + ": " + result[0]);
            fs.readFile(path.join(__dirname, "/Templates/chatform.html"), 'utf8', function (err, contents) {
                res.write(contents);
                res.end();
            });
            clients.forEach(function (user) {
                //console.log(user.name);
                user.send(msg);
            });
        });
    }
};
loadServerData();
var server = http_1.createServer(requestListener);
function randomName() {
    return Math.random().toString(16).substr(2, 8);
}
function parseCookies(str) {
    var rx = /([^;=\s]*)=([^;]*)/g;
    var obj = {};
    for (var m = void 0; m = rx.exec(str);)
        obj[m[1]] = decodeURI(m[2]);
    return obj;
}
function stringifyCookies(cookies) {
    return Object.entries(cookies)
        .map(function (_a) {
        var k = _a[0], v = _a[1];
        return k + '=' + encodeURI(v);
    })
        .join('; ');
}
function saveServerdata() {
    var fs = require('fs');
    fs.writeFile(__dirname, "/serverdata.json", JSON.stringify(serverData), function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    });
}
function loadServerData() {
    fs.readFile(path.join(__dirname, "/serverdata.json"), 'utf8', function (err, contents) {
        serverData = JSON.parse(contents);
    });
}
server.listen(port, host, function () {
    console.log("Server is running on http://" + host + ":" + port);
});
