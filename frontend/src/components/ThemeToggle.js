import React, { useState } from 'react';

function ThemeToggle() {
  const [dark, setDark] = useState(true);

  function toggleTheme() {
    setDark(!dark);
    document.body.className = dark ? 'light' : 'dark';
  }

  return (
    <button onClick={toggleTheme}>
      {dark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    </button>
  );
}

export default ThemeToggle;