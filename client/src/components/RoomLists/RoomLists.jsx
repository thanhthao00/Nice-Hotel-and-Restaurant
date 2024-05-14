import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import './roomList.css';

const RoomLists = ({ onSelectRooms }) => {
    const [rooms, setRooms] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const roomsPerPage = 2;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://nice-handr-server1.onrender.com/api/room/available_rooms', { headers: { Authorization: localStorage.getItem('Saved Token') } });
                const { success, rooms } = response.data;
                const roomsWithIsChosen = rooms.map(room => ({
                    ...room,
                    isChosen: false,
                }));
                setRooms(roomsWithIsChosen);
            } catch (error) {
                console.error('Lỗi khi lấy danh sách phòng:', error);
            }
        };

        fetchData();
    }, []);

    const handleCheckboxChange = (roomId) => {
        console.log('Checkbox changed for room:', roomId);

        const updatedRooms = rooms.map((room) => ({
            ...room,
            isChosen: room.room_number === roomId,
        }));

        setRooms(updatedRooms);

        const selectedRoom = updatedRooms.find((room) => room.isChosen);

        onSelectRooms(selectedRoom);
    };

    const pageCount = Math.ceil(rooms.length / roomsPerPage);
    const currentPageRooms = rooms.slice(pageNumber * roomsPerPage, (pageNumber + 1) * roomsPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

    return (
        <div>
            <div className="roomList">
                <div className='roomMap'>
                    {currentPageRooms.map((room) => (
                        <div key={room.room_number} className='roomDisplay'>
                            <img src={require('./img/1_bed.jpg')} alt="user_image" />
                            <div className="room_info">
                                <h2>Loại phòng: {room.room_type}</h2>
                                <p>Số phòng: {room.room_number}</p>
                                <p>Capacity: {room.capacity}</p>
                                <p>Giá phòng: {room.price}</p>
                                <p>Discount: {room.discount}</p>
                                <input
                                    type="checkbox"
                                    checked={room.isChosen}
                                    onChange={() => handleCheckboxChange(room.room_number)}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <ReactPaginate
                previousLabel={'Previous'}
                nextLabel={'Next'}
                pageCount={pageCount}
                onPageChange={changePage}
                containerClassName={'pagination'}
                previousLinkClassName={'pagination__link'}
                nextLinkClassName={'pagination__link'}
                disabledClassName={'pagination__link--disabled'}
                activeClassName={'pagination__link--active'}
                pageClassName={'pagination__page'} 
            />


        </div>
    );
};

export default RoomLists;
