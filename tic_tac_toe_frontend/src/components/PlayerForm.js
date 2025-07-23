import React, { useState } from 'react';

const PlayerForm = ({ onSubmit, label }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      onSubmit(name);
      setName('');
    }
  };

  return (
    <form className="player-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder={`Enter ${label}'s name`}
      />
      <button type="submit" className="button">Add Player</button>
    </form>
  );
};

export default PlayerForm;
