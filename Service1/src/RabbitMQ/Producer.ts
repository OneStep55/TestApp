import { Channel } from "amqplib";
import { randomUUID } from "crypto";
import EventEmitter from "events";
import config from "../config";


export default class Producer {
    constructor( private channel: Channel, 
        private replyQueueName: string, 
        private eventEmitter: EventEmitter ) { }

    async produce(data: any) {

        let id = randomUUID()
        console.log("the corr id is ", id)
        
        this.channel.sendToQueue(
            config.rabbitMQ.rpcQueue, 
            Buffer.from(JSON.stringify(data)), {
                replyTo: this.replyQueueName,
                correlationId: id,
                expiration: 10,
            })

        return new Promise((resolve, reject) => {
            this.eventEmitter.once(id, (data) => {
                console.log("The reply data  ", data)
                const reply = JSON.parse(data.content.toString())
                if (reply.error) {
                    reject(reply)
                }
                resolve(reply)
            })
        })
    }


}