import React, { useState } from 'react';
import axios from 'axios';


const Users = ({ token }) => {
  const [users, setUsers] = useState([]);

  const handleGetUsers = async () => {
    try {
      const res = await axios.get('https://mernserver-dlko.onrender.com/api/auth/users', {
        headers: {
          'x-auth-token': token,
        },
      });
      setUsers(res.data);
    } catch (error) {
      console.error('Error fetching users:', error.response.data);
    }
  };

  return (
    <div>
      <h2>Users</h2>
      <button onClick={handleGetUsers}>Get Users</button>
      <ul>
        {users.map((user) => (
          <li key={user._id}>{user.name} - {user.email}</li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
