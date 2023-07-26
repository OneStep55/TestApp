import { Channel, Connection, connect } from "amqplib"
import config from "../config"
import Consumer from "./Consumer"
import Producer from "./Producer"

class Service2 {
    private static instance: Service2 | undefined
    private isInitialized = false
    private consumer: Consumer | undefined
    private producer: Producer | undefined
    private connection: Connection | undefined
    private consumerChannel: Channel | undefined
    private producerChannel: Channel | undefined

    private constructor() {}

    static getInstance() {
        if (!this.instance) {
            this.instance = new Service2()
        }

        return this.instance
    }

    async initilize() {
        if (this.isInitialized) {
            return
        }

        try {
            this.connection = await connect(config.rabbitMQ.url)

        this.producerChannel = await this.connection.createChannel()
        this.consumerChannel = await this.connection.createChannel()

        const {queue: rpcQuene} = await this.consumerChannel.assertQueue(config.rabbitMQ.rpcQueue, {exclusive: true})

        this.producer = new Producer(this.producerChannel)
        this.consumer = new Consumer(this.consumerChannel, rpcQuene)

        this.consumer.consume()
        this.isInitialized = true
        } catch (error) {
            console.log(`rabbitmq error ${error}` )
        }
        
    }

    async produce(data: any, correlationId: string, replyQuene: string) {
        if (!this.isInitialized) {
            await this.initilize()
        }

        if(this.producer) {
            return await this.producer.produce(data, correlationId, replyQuene)
        }
    }   
}

export default Service2.getInstance()