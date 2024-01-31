import axios from "axios";
import React, { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/Modal";

// Functional component for updating a user
const UpdateUser = ({ user }) => {
  // State to manage the visibility of the update modal
  const [show, setShow] = useState(false);

  // Function to close the update modal
  const handleClose = () => setShow(false);
  
  // Function to show the update modal
  const handleShow = () => setShow(true);

  // State to manage the updated user data
  const [userUpdated, setUserUpdated] = useState(user);

  // Function to handle changes in the input fields of the update modal
  const handleChange = (event) => {
    // Update the state with the new value for the corresponding input field
    if (event.target.name === "contactNumber") {
      setUserUpdated({
        ...userUpdated,
        [event.target.name]: parseInt(event.target.value),
      });
    } else {
      setUserUpdated({
        ...userUpdated,
        [event.target.name]: event.target.value,
      });
    }
  };


  // Function to handle the update process
  const handelUpdate = async (id) => {
    try {
      // Make a PUT request to the server to update the user data
      await axios.put("http://localhost:5000/" + id, userUpdated);
      
      // Reload the page to reflect the updated user data
      window.location.reload();
    } catch (error) {
      // Log any errors that occur during the user update process
      console.log(error);
      alert(error.response.data.errors[0].msg )
    }
  };


  // JSX to render the UpdateUser component
  return (
    <>
      {/* Button to trigger the display of the update modal */}
      <Button
        className="updateBTN"
        onClick={handleShow}
        variant="outline-success"
      >
        Update
      </Button>

      {/* Modal component for updating user data */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update User</Modal.Title>
        </Modal.Header>
        <form className="sectionAddUser update">
          {/* Input fields for updated user details */}
          <input
            type="text"
            name="name"
            placeholder={user.name}
            onChange={(event) => handleChange(event)}
          />
          <input
            type="email"
            placeholder={user.email}
            name="email"
            onChange={(event) => handleChange(event)}
          />
          <input
            type="number"
            placeholder={user.contactNumber}
            name="contactNumber"
            onChange={(event) => handleChange(event)}
          />
        </form>
        {/* Footer of the modal with cancel and update buttons */}
        <Modal.Footer className="bgModal">
          <Button variant="outline-danger" onClick={handleClose}>
            Cancel
          </Button>
          
          <Button
            variant="outline-success"
            onClick={() => (handleClose(), handelUpdate(user._id))}
          >
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

// Export the UpdateUser component as the default export
export default UpdateUser;
