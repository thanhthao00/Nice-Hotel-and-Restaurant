// GuestDetails.js
import React, { useState } from 'react'
import './guest.css'

const GuestDetails = ({ guest, onDeleteClick }) => {
  console.log({ guest })



  const handleDeleteClick = () => {
    onDeleteClick(guest.email);
  };


  return (
    <div className='GuestDetails'>
      <img src={`https://robohash.org/${guest.full_name}`} alt='photo' />
      <h3>{guest.full_name}</h3>
      <p>Email: {guest.email}</p>
      <p>Birthday: {guest.birthday}</p>
      <p>Address: {guest.address}</p>
      <p>Phone Number: {guest.phone_number}</p>


      <button onClick={handleDeleteClick}>Delete</button>
    </div>
  );
};

export default GuestDetails;
