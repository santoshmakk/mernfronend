import React, { useState } from 'react';
import axios from 'axios';

require('dotenv').config();

const Login = ({ setToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(process.env.SERVER_URL+'/api/auth/login', {
        email,
        password,
      });
      const token = res.data.token;
      setToken(token);
      localStorage.setItem('token', token); // Store token in localStorage
      console.log('Logged in Successfully:', res.data);
    } catch (error) {
      console.error('Error logging in:', error.response.data);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
