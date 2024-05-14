import React from 'react';
import { Link } from "react-router-dom";

function GuestBtn() {
  return (
    <Link to="/login_user" className='button'>GUEST</Link>
  );
}

export default GuestBtn;
