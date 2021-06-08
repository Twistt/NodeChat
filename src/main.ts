import { createServer, ServerResponse } from "http";
import * as fs from 'fs';
import * as path from 'path';
import client = require("./models");
import './string.extensions' // depends on where the file is relative to your source code
import { Client, Message, ServerData } from "./models";
import { decode } from "querystring";

const host = '127.0.0.1';
const port = 8000;
let serverData = new ServerData();
const clients: Client[] = [];
//const messages: Message[] = [];

const requestListener = function (req: any, res: ServerResponse) {
    let cookies = parseCookies(req.headers.cookie);
    //console.log(cookies);
    var url = req.url;
    let client: Client;
    console.log(url);
    client = clients.first('name', cookies.name);

    if (client === null || url.contains("index.html") || url === "/") {
        if (client === null) console.log("client is null");
        else {
            console.log("client is not null - we need to pop him off");
            clients.remove(clients.position('name', client.name));
        }
        client = new Client(req, res);
        client.request = req;
        client.response = res;
        client.login = Date.now();
        client.name = (cookies.name === undefined || cookies.name === null ? randomName() : cookies.name) ?? randomName; //this should come from the login
        cookies = { 'name': client.name };
        res.setHeader("Content-Type", "text/html");
        res.setHeader("Set-Cookie", stringifyCookies(cookies));
        console.log(stringifyCookies(cookies));
        clients.push(client);

        fs.readFile(path.join(__dirname, "/Templates/index.html"), (err, contents) => {
            client.response.write(contents);
            serverData.Messages.last(100).forEach((msg) => {
                client.send(msg);
            });
        });

        
    } else {
        let body:any = [];
        req.on('data', (chunk: string) => {
            body.push(chunk);
        });
        req.on('end', () => {
            res.setHeader("Content-Type", "text/html");
            res.setHeader("Set-Cookie", stringifyCookies(cookies));
            //end of data
            var result = decodeURIComponent(Buffer.concat(body).toString()).toString().replaceAll("+", " ").replace("message=", "").split('&');
            var msg = new Message();
            msg.Text = result[0];
            msg.UserName = client.name;
            msg.TimeStamp = Date.now();
            serverData.Messages.push(msg);
            console.log(`${client.name}: ${result[0]}`);
            fs.readFile(path.join(__dirname, "/Templates/chatform.html"), 'utf8', (err, contents) => {
                res.write(contents);
                res.end();
            });

            clients.forEach((user) => {
                //console.log(user.name);
                user.send(msg);
            });
            //this saves the data to a file - BUT it does not need to saved every time anyone sends a message it SHOULD be done on a timer so it saves every so often.
            saveServerdata();
        });


    }
};
loadServerData();
const server = createServer(requestListener);

function randomName() {
    return Math.random().toString(16).substr(2, 8);
}
function parseCookies(str:any) {
    let rx = /([^;=\s]*)=([^;]*)/g;
    let obj:any = {};
    for (let m; m = rx.exec(str);)
        obj[m[1]] = decodeURI(m[2]);
    return obj;
}
function stringifyCookies(cookies:any) {
    return Object.entries(cookies)
        .map(([k, v]) => k + '=' + encodeURI(v as string))
        .join('; ');
}
function saveServerdata():void {
    var fs = require('fs');
    fs.writeFile(__dirname, "/serverdata.json", JSON.stringify(serverData), function (err:any) {
        if (err) {
            return console.log(err);
        }

        console.log("The file was saved!");
    }); 
}
function loadServerData(): void {
    fs.exists(path.join(__dirname, "/serverdata.json"), (exists) => {

        if (exists) fs.readFile(path.join(__dirname, "/serverdata.json"), 'utf8', (err, contents) => {
            console.log(contents);
            serverData = JSON.parse(contents);
        });
    });

}
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});
