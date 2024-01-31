import axios from "axios";
import React from "react";
import Button from "react-bootstrap/Button";
import UpdateUser from "./UpdateUser";
const Users = ({users}) => {

    // delete function 
    const handelDelete = async (id) => {
        try {
          await axios.delete("http://localhost:5000/" + id);
          window.location.reload();
        } catch (error) {
          console.log(error);
        }
      };
      // end

  return (
    <div className="allusers">
    <h1>Hello Welcome to my app</h1>
      {users &&
        users.map((user) => (
          <div className="userCss" key={user._id}>
            <div>
                <h5> Name : {user.name}</h5>
                <h5> Email : {user.email}</h5>
                <h5> Phone : {user.contactNumber}</h5>
            </div>
            <div className="userBtn">
                <UpdateUser  user ={user}  />
                <Button  onClick={()=>handelDelete(user._id)} variant="outline-danger">Delete</Button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Users;
