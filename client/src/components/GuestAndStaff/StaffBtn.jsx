import React from 'react';
import { Link } from "react-router-dom";

function StaffBtn() {
  return (
    <Link to="/login" className='button'>STAFF</Link>
  );
}

export default StaffBtn;
