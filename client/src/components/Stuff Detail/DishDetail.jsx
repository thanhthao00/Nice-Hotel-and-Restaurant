import React, { useState } from 'react';
import axios from 'axios';
import './dish.css'

const DishDetail = ({ dish, onEditClick, onDeleteClick }) => {


    const [isEditing, setIsEditing] = useState(false);
    const [editedDish, setEditedDish] = useState({ ...dish });
    const [dishDisplay, setDishDisplay] = useState({ ...dish });
    const handleEditClick = () => {
        setIsEditing(true);
        onEditClick(dish);
    };

    let state = 'available'; 
    if (dishDisplay.state === 'false') {
        state = 'unavailable';
    }

    const handleCancelEdit = () => {
        setIsEditing(false);
        setEditedDish({ ...dish });
    };

    const handleSaveEdit = async () => {
        try {
            const response = await axios.put(
                `https://nice-handr-server1.onrender.com/api/dish/update_dish`,
                editedDish,
                {
                    headers: {
                        Authorization: localStorage.getItem('Saved Token'),
                    },
                }
            );

            console.log(response.data);
            setDishDisplay(response.data.updatedDish)
        } catch (error) {
            console.error('Error updating dish:', error.response?.status, error.response?.data);
        }

        setIsEditing(false);
    };

    const handleDeleteClick = () => {
        onDeleteClick(dish.dish_name);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setEditedDish((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div className='DishDetail'>
            <img src={require ('./img/dessert1.jpg')} alt="dish photo" />
            <h3>{dishDisplay.dish_name}</h3>
            <p>Type: {dishDisplay.dish_type}</p>
            <p>Description: {dishDisplay.description}</p>
            <p>State: {state}</p>

            {isEditing ? (
                <>
                    <label>
                        State:
                        <input
                            type="text"
                            name="state"
                            value={editedDish.state}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Description:
                        <input
                            type="text"
                            name="description"
                            value={editedDish.description}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Type:
                        <input
                            type="text"
                            name="description"
                            value={editedDish.dish_type}
                            onChange={handleInputChange}
                        />
                    </label>
                    <button className='edit' onClick={handleSaveEdit}>Save</button>
                    <button className='danger' onClick={handleCancelEdit}>Cancel</button>
                </>
            ) : (
                <>
                    <button className='edit' onClick={handleEditClick}>Edit</button>
                    <button className='danger' onClick={handleDeleteClick}>Delete</button>
                </>
            )}
        </div>
    );
};

export default DishDetail;
