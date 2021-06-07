import { ClientRequest, ServerResponse } from "http";

export class Client {
    public name: string ="";
    public id: number=0;
    public request: ClientRequest;
    public response: ServerResponse;
    public login: number = 0;
    public constructor(req: any, res: ServerResponse) {
        this.request = req;
        this.response= res;
    }
    public send(message: Message): void {
        this.response.write(`<div class='message'><span style='color:cyan;'>${message.TimeStamp} ${message.UserName}:</span> ${message.Text}</div>`);
    }
}
export class Message {
    public UserName: string = "";
    public TimeStamp: number = 0;
    public Text: string = "";
}