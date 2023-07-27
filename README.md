# TestApp
This app contains two Service, to run this application you will need node js, rabbitMQ and nodemon installed in your machine

To run this app you will need to start two Services, rabbitMQ server.

 
### To run serivce1 you need

1. Go to Service1 directory 
 ```
cd Service1/
```
2. Install all depenencies 
```
npm i
```
3. Run the service
```
 npm run start
```


### To run serivce2 you need

1. Go to Service2 directory 
```
  cd Service2/
```
2. Install all depenencies 
```
  npm i
```
3. Run the service
```
   npm run start
```

API of application
POST to /convert
```
{
    "operation": "USD/KZT",
    "value": 400
    
}
```
Possible opertions:
USD/KZT convert from USD to KZT, 
RUB/KZT convert from RUB to KZT, 
KZT/USD convert from KZT to USD,
KZT/RUB convert from KZT to RUB



