import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Users from './pages/Users';
import './App.css';

import GenerateToken from './pages/GenerateToken';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    setToken(localStorage.getItem('token'));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  return (
    <Router>
       
      <div className="page">
       
      <nav>
          <Link to="/">Home</Link>
          {token ? (
            <>
              <Link to="/users">Users</Link>
              <Link to="/generate-token">Generate Token</Link>
              <button onClick={handleLogout} className="logout-btn">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </nav>

        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="/users" element={token ? <Users token={token} setToken={setToken} /> : <Login setToken={setToken} />} />
          <Route path="/generate-token" element={token ? <GenerateToken token={token} setToken={setToken} /> : <Login setToken={setToken} />} />
          <Route path="/" element={<h1>Welcome to MERN Auth</h1>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
