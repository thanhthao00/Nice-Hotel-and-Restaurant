import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import onebed from './1_bed.jpg';
import twobed from './2_bed.jpg';
import fourbed from './4_bed.jpg';
import adjoining from './ad.jpg';
import suite from './suite.jpg';
import presidential from './president.jpg';
import './Rooms.css'


const RoomLists = ({ onSelectRooms }) => {
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://nice-handr-server1.onrender.com/api/room/all_rooms_public');
                const { success, rooms } = response.data;

                setRooms(rooms);
            } catch (error) {
                console.error('Lỗi khi lấy danh sách phòng:', error);
            }
        };

        fetchData();
    }, []);

    const getRoomImage = (room_type) => {
      switch (room_type) {
        case 'One-bed room':
          return onebed;
        case 'Two-bed room':
          return twobed;
        case 'Four-bed room':
          return fourbed;
        case 'Adjoining Rooms':
          return adjoining;
        case 'Suite':
          return suite;
        // 
        default:
          return presidential;
      }
    };


    return (
        <div className="roomList">
            {rooms.map((room) => (
              <div className="room-info">
                <div className="overlap">
                  <div className="overlap-group">
                    <div className="type"> {room.room_type}</div>
                    <img className="room-img" alt="room-img" src={getRoomImage(room.room_type)}/>
                  </div>
                  <p className="description">
                    {room.description} 
                    <br />
                    <br />
                    Number of people: {room.capacity}
                    <br />
                    Price: {room.price}
                    <br />
                    Discount: {room.discount}%
                  </p>
                  
                </div>
              </div>
            ))}
        </div>
    );
};

export default RoomLists;
