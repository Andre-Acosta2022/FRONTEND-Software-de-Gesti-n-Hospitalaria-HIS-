import React, { useState } from 'react';

import '@/presentation/styles/common/ToggleSwitch.css';

const ToggleSwitch = () => {
  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = () => {
    setIsToggled(!isToggled);
  };

  return (
    <div className="toggle-container">
      <label className="switch">
        <input 
          type="checkbox" 
          checked={isToggled} 
          onChange={handleToggle}
        />
        <span className="slider"></span>
      </label>
      <p>{isToggled ? 'On' : 'Off'}</p>
    </div>
  );
};

export default ToggleSwitch;
