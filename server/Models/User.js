// Import the mongoose library
import mongoose from "mongoose";

// Create a Schema object from the mongoose library
const Schema = mongoose.Schema;

// Define the structure of the User schema
const userSchema = new Schema({
  // Define a field for the user's name
  name: {
    type: String, // Data type: String
    required: true, // Field is required
  },
  // Define a field for the user's email
  email: {
    type: String, // Data type: String
    required: true, // Field is required
  },
  // Define a field for the user's contact number
  contactNumber: {
    type: Number, // Data type: Number
    required: true, // Field is required
  }
});

// Create a mongoose model named "User" based on the defined schema
const User = mongoose.model("User", userSchema);

// Export the User model for use in other parts of the application
export default User;