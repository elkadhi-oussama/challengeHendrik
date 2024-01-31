// Import the express library and the User model
import express from "express";
import User from "../Models/User.js";
import {userRules, validation} from "../middleware/validator.js"
// Create an instance of an Express Router
const router = express.Router();

// Route to handle the creation of a new user (POST method)
router.post("/user",userRules(), validation,async (req, res) => {
  // Extract data from the request body
  const { name, email, contactNumber } = req.body;
  try {
    // Create a new User instance with the provided data
    const newUser = new User({ name, email, contactNumber });

    // Save the new user to the database
    await newUser.save();

    // Send a success response with the new user data
    res.status(200).send({ msg: "New user saved", response: newUser });
  } catch (error) {
    // Send an error response if there's an issue saving the user
    res.status(500).send({ msg: "Cannot save a new user", response: error });
  }
});

// Route to retrieve all users from the database (GET method)
router.get("/user", async (req, res) => {
  try {
    // Retrieve all users from the database
    const getAllUsers = await User.find();

    // Send a success response with the retrieved user data
    res.status(200).send({ msg: "All data retrieved from the database", response: getAllUsers });
  } catch (error) {
    // Send an error response if there's an issue retrieving users
    res.status(500).send({ msg: "Cannot get users", response: error });
  }
});

// Route to delete a user by ID (DELETE method)
router.delete("/:id", async (req, res) => {
  try {
    // Delete a user by ID from the database
    const userDeleted = await User.deleteOne({ _id: req.params.id });

    // Check if the user was successfully deleted and send the appropriate response
    userDeleted.deletedCount
      ? res.status(200).send({ msg: "User deleted", response: userDeleted })
      : res.status(200).send({ msg: "User already deleted" });
  } catch (error) {
    // Send an error response if there's an issue deleting the user
    res.status(500).send({ msg: "Cannot delete user", response: error });
  }
});

// Route to update a user by ID (PUT method)
router.put("/:id",userRules(), validation, async (req, res) => {
  try {
    // Update a user by ID with the provided data
    const updateUser = await User.updateOne(
      { _id: req.params.id },
      { $set: {...req.body} }
    );

    // Check if the user was successfully updated and send the appropriate response
    updateUser.modifiedCount
      ? res.status(200).send({ msg: "User updated", response: updateUser })
      : res.status(200).send({ msg: "User already updated" });
  } catch (error) {
    // Send an error response if there's an issue updating the user
    res.status(500).send({ msg: "Cannot update user", response: error });
  }
});

// Export the router for use in other parts of the application
export default router;
