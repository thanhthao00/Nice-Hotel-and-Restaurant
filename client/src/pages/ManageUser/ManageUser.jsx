// ManageUser.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GuestDetails from '../../components/guest detail/GuestDetails';
import ReactPaginate from 'react-paginate';
import Navbar from '../../components/navbar/Navbar';
import './user.css';

const ManageUser = () => {
  const [guests, setGuests] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [usersPerPage] = useState(2);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://nice-handr-server1.onrender.com/api/user/get_guest_list', {
          headers: { Authorization: localStorage.getItem('Saved Token') },
        });
        const { success, guestList } = response.data;
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

  const handleDeleteGuest = async (guestId) => {
    try {
      console.log(guestId);
      const res = await axios.delete(`https://nice-handr-server1.onrender.com/api/user/${guestId}`, {
        headers: {
          Authorization: localStorage.getItem('Saved Token'),
        },
      });

      console.log(localStorage.getItem('Saved Token'));
      console.log(res.data);
    } catch (e) {
      console.log('Wrong details');
    }
  };

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <div className='ManageUser'>
      <Navbar/>
      <div className="blank"></div>
      <h2>Manage Guests</h2>
      <ul>
        {currentGuests.map((guest) => (
          <li key={guest.email}>
            <GuestDetails guest={guest} onDeleteClick={handleDeleteGuest} />
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
  );
};

export default ManageUser;
