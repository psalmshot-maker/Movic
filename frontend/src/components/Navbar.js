import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <Link to="/">Movic</Link>
      <Link to="/search">Search</Link>
      <Link to="/playlist">Playlists</Link>
      <Link to="/profile">Profile</Link>
      <Link to="/upload">Upload</Link>
      <Link to="/about">About</Link>
      <Link to="/contact">Contact</Link>
      <Link to="/auth">Sign In</Link>
      <Link to="/admin">Admin</Link>
    </nav>
  );
}

export default Navbar;