import { Channel } from "amqplib";
import { randomUUID } from "crypto";



export default class Producer {
    constructor( private channel: Channel) { }

    async produce(data: any, correlationId: string, replyQueue: string) {
        console.log("Data is ", data)
        this.channel.sendToQueue(
            replyQueue, 
            Buffer.from(JSON.stringify(data)), {
                correlationId: correlationId,
                expiration: 10,
            })
    }


}