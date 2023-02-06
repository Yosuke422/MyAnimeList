import React, { useState, useEffect } from "react";

const YearDropdown = () => {
  const [selectedYear, setSelectedYear] = useState(null);
  const [years, setYears] = useState([]);

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 30 }, (_, i) => currentYear - i);
    setYears(years);
  }, []);

  const handleYearChange = event => {
    setSelectedYear(event.target.value);
  };

  return (
    <div className="gap">
      <select id="dropdown" onChange={handleYearChange} value={selectedYear || ""}>
        <option  className="color" value="" disabled>
          Année
        </option>
        {years.map(year => (
          <option className="color" key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
      
    </div>
  );
};

export default YearDropdown;