import { Channel } from "amqplib";
import { EventEmitter } from "events";


export default class Consumer {
    constructor(private channel: Channel, private replyQueueName: string, private eventEmitter: EventEmitter ) { }

    async consume() {
        this.channel.consume(this.replyQueueName, (msg) => {
            if (msg) {
                console.log("The result is ", JSON.parse(msg.content.toString()))
                this.eventEmitter.emit(msg.properties.correlationId.toString(), msg)
            }
        }, {
            noAck: true
        })
    }
}