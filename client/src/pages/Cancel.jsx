import React from 'react';
import { useLocation } from 'react-router-dom';

const Cancel   = () => {

    const location = useLocation();
    console.log(location);
  return <div>
      Cancel
  </div>;
};

export default Cancel;
