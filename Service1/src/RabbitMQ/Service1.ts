import { Channel, Connection, connect } from "amqplib"
import config from "../config"
import { EventEmitter } from "events"
import Consumer from "./Consumer"
import Producer from "./Producer"

class Service1 {
    private static instance: Service1 | undefined
    private isInitialized = false
    private eventEmitter: EventEmitter | undefined
    private consumer: Consumer | undefined
    private producer: Producer | undefined
    private connection: Connection | undefined
    private consumerChannel: Channel | undefined
    private producerChannel: Channel | undefined

    private constructor() {}

    static getInstance() {
        if (!this.instance) {
            this.instance = new Service1()
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

        const {queue: replyQueueName} = await this.consumerChannel.assertQueue('', {exclusive: true})
        this.eventEmitter = new EventEmitter()

        this.producer = new Producer(this.producerChannel, replyQueueName, this.eventEmitter)
        this.consumer = new Consumer(this.consumerChannel, replyQueueName, this.eventEmitter)

        this.consumer.consume()
        this.isInitialized = true
        } catch (error) {
            console.log(`rabbitmq error ${error}` )
        }
        
    }

    async produce(data: any) {
        if (!this.isInitialized) {
            await this.initilize()
        }

        if(this.producer) {
            return await this.producer.produce(data)
        }
    }   
}

export default Service1.getInstance()