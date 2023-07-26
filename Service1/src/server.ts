import bodyParser from "body-parser";
import express from "express";
import service1 from "./RabbitMQ/Service1";

const app = express()

app.use(bodyParser.json())

app.post("/convert", async(req, res, next) => {
    console.log(req.body)
    const value = await service1.produce(req.body)
    res.send({value})
})

app.listen(8080, () => {
    console.log("Server is listening in port 8080")
    service1.initilize()
})

