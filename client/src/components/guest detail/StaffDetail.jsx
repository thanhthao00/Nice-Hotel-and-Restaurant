// GuestDetails.js
import React, { useState } from 'react';
import axios from 'axios';
import RegisterForm from '../../pages/login/RegisterForm';
import { useNavigate } from 'react-router-dom';
import './staff.css'

const StaffDetail = ({ guest, onEditClick, onDeleteClick }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedGuest, setEditedGuest] = useState({ ...guest });
    const [guestDisplay, setGuestDisplay] = useState({ ...guest });

    const handleEditClick = () => {
        setIsEditing(true);
        onEditClick(guest);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
    };

    const handleSaveEdit = async () => {
        try {
            console.log('editted guest', editedGuest)
            
            const res = await axios.put(`https://nice-handr-server1.onrender.com/user/user_info/${editedGuest.email}`, editedGuest,

                {
                    headers: {
                        Authorization: localStorage.getItem('Saved Token'),
                    },
                }
            );

            console.log(localStorage.getItem('Saved Token'))
            console.log(res.data);
            if(res.data.message === 'Excellent progress!') {
                alert('Edit successfully, please reload the page')
            }
            setGuestDisplay(res.data.user);
        } catch (e) {
            console.log('Wrong details');
        }
        setIsEditing(false);
    };


    const handleDeleteClick = () => {
        onDeleteClick(guest.email);
    };



    const { full_name, email, birthday, address, phone_number } = editedGuest
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setEditedGuest((prev) => ({ ...prev, [name]: value }));
      };
      

    return (
        <div className='StaffDetail'>
            <img src={`https://robohash.org/${guestDisplay.full_name}`} alt='photo' />
            <div className='staffInfo'>
                <h3>{guestDisplay.full_name}</h3>
                <p>Email: {guestDisplay.email}</p>
                <p>Birthday: {guestDisplay.birthday}</p>
                <p>Salary: {guestDisplay.money}</p>
                <p>Address: {guestDisplay.address}</p>
                <p>Phone Number: {guestDisplay.phone_number}</p>
            </div>
            {isEditing ? (
                <>
                    <div className='editForm'>
                        <label>
                            Full Name:
                            <input
                                type="text"
                                name="full_name"
                                value={editedGuest.full_name}
                                onChange={handleInputChange}
                            />
                        </label>
                        <label>
                            Address:
                            <input
                                type="text"
                                name="address"
                                value={editedGuest.address}
                                onChange={handleInputChange}
                            />
                        </label>
                        <label>
                            Salary:
                            <input
                                type="number"
                                name="money"
                                value={editedGuest.money}
                                onChange={handleInputChange}
                            />
                        </label>
                        <label>
                            Phone Number:
                            <input
                                type="text"
                                name="phone_number"
                                value={editedGuest.phone_number}
                                onChange={handleInputChange}
                            />
                        </label>
                        <label>
                            Date of birth:
                            <input
                                type="date"
                                name="birthday"
                                value={editedGuest.birthday}
                                onChange={handleInputChange}
                            />
                        </label>
                    </div>

                    <div className='handleBtn'>
                        <button className="edit" onClick={handleSaveEdit}>Save</button>
                        <button className="delete" onClick={handleCancelEdit}>Cancel</button>
                    </div>
                </>
            ) : (
                <>
                    <div className='handleBtn'>
                        <button className="edit" onClick={handleEditClick}>Edit</button>
                        <button className="delete" onClick={handleDeleteClick}>Delete</button>
                    </div>
                </>
            )}
        </div>
    );
};

export default StaffDetail;
