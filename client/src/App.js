// Import necessary modules and components
import React, { useEffect, useState } from "react";
import Users from "./components/Users"; // Importing Users component
import "./App.css";
import AddUser from "./components/AddUser"; // Importing AddUser component
import axios from "axios";

// Main functional component for the App
function App() {
  // State to store the list of users
  const [users, setUsers] = useState([]);

  // useEffect hook to fetch users data when the component mounts
  useEffect(() => {
    // Async function to fetch user data from the server
    const getAllUsers = async () => {
      try {
        // Make a GET request to the server endpoint for users
        const result = await axios.get("http://localhost:5000/user");

        // Set the users state with the data obtained from the server
        setUsers(result.data.response);
      } catch (error) {
        // Log any errors that occur during the data fetching process
        console.log(error);
      }
    };

    // Call the function to fetch users when the component mounts
    getAllUsers();
  }, []); // Empty dependency array means this effect runs only once when the component mounts

  // Render the Users and AddUser components
  return (
    <>
      <Users users={users} />{" "}
      {/* Pass the users data as a prop to the Users component */}
      <AddUser /> {/* Render the AddUser component */}
    </>
  );
}

// Export the App component as the default export
export default App;
