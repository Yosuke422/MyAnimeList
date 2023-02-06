import React from 'react';

import YearDropdown from './YearDropdown';
import AgeDropdown from './AgeDropdown';


const Header = () => {
  return (
    <div style={{display:"flex", float:"right", marginRight:"320px"}}>
      <YearDropdown />
      <AgeDropdown />
    </div>
  );
};

export default Header;
