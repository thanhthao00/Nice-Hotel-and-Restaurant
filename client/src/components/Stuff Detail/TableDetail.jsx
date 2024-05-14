import React, { useState } from 'react';
import axios from 'axios';
import './table.css'

const TableDetail = ({ table, onEditClick, onDeleteClick }) => {
    let state = 'available';
    if (table.state === 'false') {
        state = 'unavailable';
    }

    const [isEditing, setIsEditing] = useState(false);
    const [editedTable, setEditedTable] = useState({ ...table });

    const handleEditClick = () => {
        setIsEditing(true);
        onEditClick(table);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
    };

    const handleSaveEdit = async () => {
        try {
            const response = await axios.put(
                `https://nice-handr-server1.onrender.com/api/table/update_table`,
                editedTable,
                {
                    headers: {
                        Authorization: localStorage.getItem('Saved Token'),
                    },
                }
            );

            console.log(response.data);
            setEditedTable(editedTable);
        } catch (error) {
            console.error('Error updating table:', error.response?.status, error.response?.data);
        }

        setIsEditing(false);
    };

    const handleDeleteClick = () => {
        onDeleteClick(table.table_number);
    };

    const handleInputChange = (event) =>
        setEditedTable((prev) => ({ ...prev, [event.target.name]: event.target.value }));

    return (
        <div className='TableDetail'>
            <h3>{table.table_type}</h3>
            <p>Table number: {table.table_number}</p>
            <p>State: {state}</p>
            <p>Price: {table.price}</p>

            {isEditing ? (
                <>
                    <label>
                        State:
                        <input
                            type="text"
                            name="state"
                            value={editedTable.state}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Price:
                        <input
                            type="text"
                            name="price"
                            value={editedTable.price}
                            onChange={handleInputChange}
                        />
                    </label>
                    <div className='btn'>
                        <button className='edit' onClick={handleSaveEdit}>Save</button>
                        <button className='danger' onClick={handleCancelEdit}>Cancel</button>
                    </div>
                </>
            ) : (
                <>
                    <div className='btn'>
                        <button className='edit' onClick={handleEditClick}>Edit</button>
                        <button className='danger' onClick={handleDeleteClick}>Delete</button>
                    </div>
                </>
            )}
        </div>
    );
};

export default TableDetail;
