import service from "./RabbitMQ/Service2"
export default class ConvertationManager {

    public static async convert(
       data: any,
       correlationId: string,
       replyTo: string
   ) {

       let response = {}

       const {operation, value} = data

       console.log("The operation is ", operation)

       switch (operation) {
           case "USD/KZT":
               response = value * 445
               break
           case "RUB/KZT":
                   response = value * 5
                   break
            case "KZT/USD":
                response =  value / 445
                break
         
            case "KZT/RUB":
                response =  value / 5
                break
                
            default:
                response = 0
                break
           
       }

       await service.produce(response, correlationId, replyTo)
   }
}