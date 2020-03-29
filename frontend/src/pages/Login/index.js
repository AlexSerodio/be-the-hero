import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import api from '../../services/api';
import './styles.css';

import logo from '../../assets/logo.svg';
import heroesImg from '../../assets/heroes.png';

export default function Login() {
  const [id, setId] = useState('');
  const history = useHistory();

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const response = await api.post('/session', { id });

      localStorage.setItem('ngoId', id);
      localStorage.setItem('ngoName', response.data.name);

      history.push('/profile');
    } catch (err) {
      alert('Invalid login, try again.');
    }
  }

  return (
    <div className="login-container">
      <section className="form">
        <img src={logo} alt="Be The Hero" />

        <form onSubmit={handleLogin}>
          <input
            placeholder="Your ID"
            value={id}
            onChange={e => setId(e.target.value)}
          />
          <button className="button" type="submit">Sign in</button>

          <Link className="back-link" to="/register">
            <FiLogIn size={16} color="#e02041" />
            Sign up now
          </Link>
        </form>
      </section>

      <img src={heroesImg} alt="Heroes" />
    </div>
  );
}