import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StaffDetail from '../../components/guest detail/StaffDetail';
import { useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import './staff.css'
const ManageStaff = () => {
    const history = useNavigate();
    const [pageNumber, setPageNumber] = useState(0);
    const [usersPerPage] = useState(2);
    const [guests, setGuests] = useState([]);
    const [newGuest, setNewGuest] = useState({
        email: '',
        full_name: '',
        birthday: new Date(),
        money: 0,
        address: '',
        phone_number: '',
    });
    const [editGuest, setEditGuest] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://nice-handr-server1.onrender.com/api/user/get_staff_list', {
                    headers: { Authorization: localStorage.getItem('Saved Token') },
                });
                const { success, guestList } = response.data;
                console.log(guestList)
                setGuests(guestList);
            } catch (error) {
                console.error('Error fetching guests:', error.response?.status, error.response?.data);
            }
        };

        fetchData();
    }, []);

    const indexOfLastItem = (pageNumber + 1) * usersPerPage;
    const indexOfFirstItem = indexOfLastItem - usersPerPage;
    const currentGuests = guests.slice(indexOfFirstItem, indexOfLastItem);

    const pageCount = Math.ceil(guests.length / usersPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

    const handleDeleteGuest = async (guestId) => {
        try {
            const res = await axios.delete(`https://nice-handr-server1.onrender.com/api/user/${guestId}`, {
                headers: {
                    Authorization: localStorage.getItem('Saved Token')
                }
            });

            console.log(res.data);
            if(res.data.success === 'true') {
                alert('Delete successfully, please reload the page')
            }

        } catch (e) {
            console.error('Error deleting guest:', e.response?.status, e.response?.data);
        }
    };

    const handleEditClick = async (guest) => {
        setEditGuest({ ...guest });
    };

    const handleAddClick = () => {
        history('/register_staff');
    };

    return (
        <div className='ManageStaff'>
            <h2>Manage Staff</h2>
            <ul>
                {currentGuests.map((guest) => (
                    <li key={guest.email}>
                        <StaffDetail
                            guest={guest}
                            onEditClick={handleEditClick}
                            onDeleteClick={handleDeleteGuest}
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
            <button onClick={handleAddClick}>Add new staff</button>
        </div>
    );
};

export default ManageStaff;