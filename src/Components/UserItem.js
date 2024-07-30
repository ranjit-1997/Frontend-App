import React from "react";

const UserItem = ({ user }) => (
  <tr>
    <td>{user.id}</td>
    <td>
      <img src={user.image} alt="User Avatar" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
    </td>
    <td>{user.firstName} {user.lastName}</td>
    <td>{user.gender.charAt(0).toUpperCase()}/{user.age}</td>
    <td>{user.company.title || "N/A"}</td> 
    <td>{user.address.state},{user.address.country}</td>
  </tr>
);

export default UserItem;
