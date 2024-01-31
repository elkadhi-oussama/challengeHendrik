import axios from "axios";
import React, { useState } from "react";

// Functional component for adding a new user
const AddUser = () => {
  // Function to handle the addition of a new user
  const handleAdd = async () => {
    try {
      // Make a POST request to the server to add the new user
      await axios.post("http://localhost:5000/user", newUser);

      // Hide the AddUser section, and reload the page to reflect the updated user list
      setShowAddFil(!showAddFil);
      window.location.reload();
    } catch (error) {
      // Log any errors that occur during the user addition process
      console.log(error);
      alert(error.response.data.errors[0].msg )
    }
  };

  // State variables to manage the visibility and data of the new user form
  const [showAddFil, setShowAddFil] = useState(false);
  const [newUser, setNewUser] = useState({
    id: Math.random(),
    name: "",
    email: "",
    contactNumber: 0,
  });

  // Function to handle changes in the input fields of the new user form
  const handleChange = (event) => {
    if (event.target.name === "contactNumber") {
      // Convert contactNumber to an integer if it's the contactNumber field
      setNewUser({
        ...newUser,
        [event.target.name]: parseInt(event.target.value),
      });
    } else {
      // Update the state with the new value for other input fields
      setNewUser({ ...newUser, [event.target.name]: event.target.value });
    }
  };

  // JSX to render the AddUser component
  return (
    <div className="sectionAddUser">
      {/* Button to toggle the visibility of the AddUser section */}
      <button onClick={() => setShowAddFil(!showAddFil)}>
        {showAddFil ? <>HIDE</> : <>ADD NEW USER</>}{" "}
        {/* Toggle button text based on visibility state */}
      </button>
      {/* Conditionally render the new user form when the AddUser section is visible */}
      <>
        {showAddFil && (
          <>
            {/* Input fields for user details */}
            <input
              type="text"
              name="name"
              placeholder="name"
              onChange={(event) => handleChange(event)}
            />
            <input
              type="email"
              placeholder="email"
              name="email"
              onChange={(event) => handleChange(event)}
            />
            <input
              type="number"
              placeholder="contactNumber"
              name="contactNumber"
              onChange={(event) => handleChange(event)}
            />
            {/* Button to trigger the user addition process */}
            <button onClick={handleAdd}>ADD</button>
          </>
        )}
      </>
    </div>
  );
};

// Export the AddUser component as the default export
export default AddUser;
