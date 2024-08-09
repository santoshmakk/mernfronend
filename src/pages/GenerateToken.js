// src/GenerateToken.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GenerateToken = ({ token, setToken }) => {
  const [scopes, setScopes] = useState([]);
  const [tokens, setTokens] = useState([]);

  const handleGenerateToken = async () => {
    try {
      const res = await axios.post('https://mernserver-dlko.onrender.com/api/tokens/generate', { scopes }, {
        headers: { 'x-auth-token': token }
      });
      setTokens([...tokens, { token: res.data.token, scopes }]);
    } catch (error) {
      console.error('Error generating token:', error.response.data);
    }
  };

  const handleDeleteToken = async (id) => {
    try {
      await axios.delete(`https://mernserver-dlko.onrender.com/api/tokens/${id}`, {
        headers: { 'x-auth-token': token }
      });
      setTokens(tokens.filter(t => t._id !== id));
    } catch (error) {
      console.error('Error deleting token:', error.response.data);
    }
  };

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        const res = await axios.get('https://mernserver-dlko.onrender.com/api/tokens', {
          headers: { 'x-auth-token': token }
        });
        setTokens(res.data);
      } catch (error) {
        console.error('Error fetching tokens:', error.response.data);
      }
    };
    fetchTokens();
  }, [token]);

  return (
    <div className="container">
      <h2>Generate and Manage Tokens</h2>
      <form onSubmit={(e) => { e.preventDefault(); handleGenerateToken(); }}>
        <input
          type="text"
          placeholder="Scopes (comma separated)"
          value={scopes.join(',')}
          onChange={(e) => setScopes(e.target.value.split(','))}
        />
        <button type="submit">Generate Token</button>
      </form>

      <h3>Existing Tokens</h3>
      <ul>
        {tokens.map(t => (
          <li key={t._id}>
            {t.token} - Scopes: {t.scopes.join(', ')}
            <button onClick={() => handleDeleteToken(t._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GenerateToken;
