import { Channel } from "amqplib";

import config from "../config";
import ConvertationManager from "../ConertationManager";


export default class Consumer {
    constructor(private channel: Channel, private rpcQuene: string ) { }
    
    async consume() {
        console.log("Ready to consume the messages... ")
        
        this.channel.consume(this.rpcQuene, async (msg) => {
            if (msg) {
                const {correlationId, replyTo} = msg.properties

                if (!correlationId || !replyTo) {
                    console.log("Missing some properties")
                } else {
                    console.log("Consumed ", JSON.parse(msg.content.toString()))
                    await ConvertationManager.convert(
                        JSON.parse(msg.content.toString()),
                        correlationId,
                        replyTo
                    )
                }
            }
        }, {
            noAck: true
        })
    }
}