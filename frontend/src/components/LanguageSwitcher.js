import React from 'react';

function LanguageSwitcher({ setLang }) {
  return (
    <select onChange={e => setLang(e.target.value)}>
      <option value="en">English</option>
      <option value="fr">Français</option>
      <option value="es">Español</option>
      {/* Add more languages */}
    </select>
  );
}

export default LanguageSwitcher;