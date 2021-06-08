"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerData = exports.Message = exports.User = exports.Client = void 0;
var Client = /** @class */ (function () {
    function Client(req, res) {
        this.name = "";
        this.id = 0;
        this.login = 0;
        this.request = req;
        this.response = res;
    }
    Client.prototype.send = function (message) {
        this.response.write("<div class='message'><span style='color:cyan;'>" + message.TimeStamp + " " + message.UserName + ":</span> " + message.Text + "</div>");
    };
    return Client;
}());
exports.Client = Client;
var User = /** @class */ (function () {
    function User() {
        this.UserName = "";
        this.Password = ""; //hash
    }
    return User;
}());
exports.User = User;
var Message = /** @class */ (function () {
    function Message() {
        this.UserName = "";
        this.TimeStamp = 0;
        this.Text = "";
    }
    return Message;
}());
exports.Message = Message;
var ServerData = /** @class */ (function () {
    function ServerData() {
        this.Messages = [];
        this.Users = [];
    }
    return ServerData;
}());
exports.ServerData = ServerData;
