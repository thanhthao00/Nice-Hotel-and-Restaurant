// ManageUser.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RoomDetail from '../../components/Stuff Detail/RoomDetail';
import { useNavigate } from 'react-router-dom';
import './room.css'
import ReactPaginate from 'react-paginate';
import Navbar from '../../components/navbar/Navbar';

const ManageRooms = () => {
    const history = useNavigate()
    const [pageNumber, setPageNumber] = useState(0);
    const [objsPerPage] = useState(2);
    const [rooms, setRooms] = useState([]);
    const [newRoom, setNewRoom] = useState({
        room_type: '',
        room_number: '',
        description: '',
        capacity: 0,
        state: '',
        discount: 0,
        price: 0
    });
    const [editroom, setEditroom] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://nice-handr-server1.onrender.com/api/room/all_rooms', {
                    headers: { Authorization: localStorage.getItem('Saved Token') },
                });
                const { success, rooms } = response.data;
                console.log(rooms)
                setRooms(rooms);
            } catch (error) {
                console.error('Error fetching rooms:', error.response?.status, error.response?.data);
            }
        };

        fetchData();
    }, []);

    const indexOfLastItem = (pageNumber + 1) * objsPerPage;
    const indexOfFirstItem = pageNumber * objsPerPage;
    const currentRooms = rooms.slice(indexOfFirstItem, indexOfLastItem);


    const pageCount = Math.ceil(rooms.length / objsPerPage);
    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

    const handleDeleteroom = async (roomId) => {
        try {
            console.log(roomId)
            await axios.delete(`https://nice-handr-server1.onrender.com/api/room/${roomId}`, {
                headers: {
                    Authorization: localStorage.getItem('Saved Token')
                }
            });
            setRooms((prevRooms) => prevRooms.filter(room => room.room_number !== roomId));

        } catch (e) {
            console.error('Error deleting room:', e.response?.status, e.response?.data);
        }
    };

    const handleEditClick = async (room) => {
        setEditroom({ ...room });
    };

    const handleAddClick = () => {
        setShowAddForm(true);
    };

    const handleAddRoomSubmit = async (e) => {
        e.preventDefault();
    
        try {
            console.log('newRoom: ' + newRoom);
            const response = await axios.post('https://nice-handr-server1.onrender.com/api/room/add_room', newRoom, {
                headers: {
                    Authorization: localStorage.getItem('Saved Token')
                }
            });
    
            const { success, room } = response.data;
            console.log(response.data);
    
            if (response.data.message === 'New room created successfully') {
                setRooms(prevRooms => [...prevRooms, room]);
                setShowAddForm(false);
                alert('tạo được nè');
            } else if (response.data.message === 'Room number has already taken!') {
                alert('Số phòng này đã có');
            }
            else {
                alert(response.data.message)
            }
    
        } catch (error) {
            console.error('Error adding room:', error.response?.status, error.response?.data);
        }
    };
    
    const handleCancelAddRoom = () => {

        setShowAddForm(false);
    };

    return (
        <div className='ManageRoom'>
            <Navbar/>
            <div className='blank'></div>
            <h2>Manage rooms</h2>
            <div className='roomsDetail'>
                <ul>
                    {currentRooms.map((room) => (
                        <li key={room.room_number}>
                            <RoomDetail
                                room={room}
                                onEditClick={handleEditClick}
                                onDeleteClick={handleDeleteroom}
                            />
                        </li>
                    ))}
                </ul>
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
            <div className='showForm'>
                {showAddForm && (
                    <div>
                        <h3>Add new room</h3>
                        <form onSubmit={handleAddRoomSubmit}>
                            <label>Room Type:
                                <input
                                    type="text"
                                    value={newRoom.room_type}
                                    onChange={(e) => setNewRoom({ ...newRoom, room_type: e.target.value })}
                                    required
                                />
                            </label>
                            <br />
                            <label>Room number:
                                <input
                                    type="text"
                                    value={newRoom.room_number}
                                    onChange={(e) => setNewRoom({ ...newRoom, room_number: e.target.value })}
                                    required
                                />
                            </label>
                            <br />
                            <label>Description:
                                <input
                                    type="text"
                                    value={newRoom.description}
                                    onChange={(e) => setNewRoom({ ...newRoom, description: e.target.value })}
                                    required
                                />
                            </label>
                            <br />
                            <label>Capacity:
                                <input
                                    type="text"  // Chuyển type về text để có thể tự do nhập số
                                    inputMode="numeric"  // Chỉ cho phép nhập số
                                    pattern="[0-9]*"  // Bảo đảm chỉ nhập ký tự số
                                    name="price"
                                    value={newRoom.capacity}
                                    onChange={(e) => setNewRoom({ ...newRoom, capacity: e.target.value })}
                                    required
                                />
                            </label>
                            <br />
                            <label>State:
                                <input
                                    type="text"
                                    value={newRoom.state}
                                    onChange={(e) => setNewRoom({ ...newRoom, state: e.target.value })}
                                    required
                                />
                            </label>
                            <br />
                            <label>Price:
                                <input
                                    type="text"  // Chuyển type về text để có thể tự do nhập số
                                    inputMode="numeric"  // Chỉ cho phép nhập số
                                    pattern="[0-9]*"  // Bảo đảm chỉ nhập ký tự số
                                    name="price"
                                    value={newRoom.price}
                                    onChange={(e) => setNewRoom({ ...newRoom, price: e.target.value })}
                                    required
                                />
                            </label>
                            <br />
                            <label>Discount:
                                <input
                                    type="text"  // Chuyển type về text để có thể tự do nhập số
                                    inputMode="numeric"  // Chỉ cho phép nhập số
                                    pattern="[0-9]*"  // Bảo đảm chỉ nhập ký tự số
                                    name="discount"
                                    value={newRoom.discount}
                                    onChange={(e) => setNewRoom({ ...newRoom, discount: e.target.value })}
                                    required
                                />
                            </label>
                            <br />
                            <div className='btn'>
                                <button type="submit">Gửi</button>
                                <button type="button" onClick={handleCancelAddRoom}>Huỷ bỏ</button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
            <div className='addForm'>
                <button onClick={handleAddClick}>Thêm phòng mới</button>
            </div>
        </div>
    );
};

export default ManageRooms;