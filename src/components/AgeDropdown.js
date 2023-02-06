import React, { useState } from "react";

const AgeDropdown = () => {
  const [selectedAge, setSelectedAge] = useState(null);

  const handleAgeChange = event => {
    setSelectedAge(event.target.value);
  };

  return (
    <div className="age">
      <select id="dropdown2" onChange={handleAgeChange} value={selectedAge || ""}>
        <option value=""  className="color" disabled>
          Age Recommandés
        </option>
        <option className="color" value="G">G</option>
        <option className="color" value="PG">PG</option>
        <option className="color" value="R">R</option>
        <option className="color" value="R+">R+</option>
      </select>
    </div>
  );
};

export default AgeDropdown;