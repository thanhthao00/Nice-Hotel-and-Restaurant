import React, { useState, useEffect } from 'react';
import Navbar from '../../../components/navbar/Navbar'
import RoomLists from '../../../components/RoomLists/RoomLists';
import RoomsForm from '../../../components/RoomsForm/RoomsForm'
import './BookRooms.css';

const BookRooms = () => {
  const [selectedRooms, setSelectedRooms] = useState([]);

  const handleSelectRooms = (selectedItems) => {
    setSelectedRooms(selectedItems);
  };
  return (
    <div className='bookRoomContainer'>
      <Navbar/>
      <div className='blank'></div>
      <h2>Đặt phòng tại đây</h2>
      <div className='bookRoomDisplay'>
        <div className='rl'>
          <RoomLists onSelectRooms={handleSelectRooms} /></div>
        <div className='rf'><RoomsForm selectedRooms={selectedRooms} /></div>
      </div>
    </div>
  );
};

export default BookRooms;
