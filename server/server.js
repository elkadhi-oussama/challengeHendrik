// Clear the console before running the application
console.clear();

// Import necessary libraries and modules
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import router from "./router/user.js";
import cors from "cors"
// Initialize the express application
const app = express();

// Set the port number for the server
const PORT = 5000;

// MongoDB connection URL
const URL_DB = "mongodb+srv://gomycode:27468403@cluster0.q8mbyqz.mongodb.net/";

// Middleware to parse JSON data in the request body
app.use(express.json());
app.use(cors())
// Middleware to parse URL-encoded data in the request body
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB using Mongoose
mongoose
  .connect(URL_DB)
  .then(() => console.log("Database is connected")) // Successful connection
  .catch((err) => console.log("Cannot connect to the database", err)); // Connection error

// Use the defined router for handling routes starting from the root ("/")
app.use("/", router);

// Start the server on the specified port
app.listen(PORT, (err) => {
  if (err) throw err; // Throw an error if there's an issue starting the server
  console.log(`Server is running on Port ${PORT}`); // Log a success message if the server starts successfully
});