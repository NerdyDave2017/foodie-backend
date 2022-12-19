Use SOLID principles

Controller Layer
Service Layer
Data Access Layer

Middlewares - Authentication, logging, Error Handling, 
session based authentication
Redis
Utils
Role based authentication

Proper commenting and documentation
Use Swagger to detect endpoints for documentation

Write script to automate deployment

Database - MongoDB
Server - Render / Heroku

UberEats Clone Working Process:
The customer places a new order
The restaurant accepts/rejects the new order
If the restaurant accepts the order, it is assigned to a driver that is available nearby therestaurant.
The driver can decide to either accept or reject the order
If the driver accepts the order, he is assigned to pick up and drop delivery
The driver reaches the restaurant to pick up the order. Once the order is picked, the driverupdates the status in the app for the customer
After delivery, the driver can mark the order as completed on the driver app
If the driver rejects the order, the dispatch starts again from a driver available nearby.
Customers can track all the order delivery status on their delivery app. App uses Fluttercode for making most of the order updates mentioned above.
But there is some difference in the delivery system as it works on the backend side, it will have access to all available nearby drivers and restaurants.