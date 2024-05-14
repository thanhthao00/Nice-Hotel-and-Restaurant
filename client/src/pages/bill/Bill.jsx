
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Bill.css';
import Navbar from '../../components/navbar/Navbar';

const Bill = () => {

  const [bills, setBills] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://nice-handr-server1.onrender.com/api/booking/', {
          headers: { Authorization: localStorage.getItem('Saved Token') },
        });

        console.log(response.data);
        const { success, user, detailedRooms, detailedTables, totalRoomPrice, totalTablePrice } = response.data;

        const roomBills = detailedRooms.map((room) => ({
          type: 'room',
          roomType: room.roomType,
          roomNumber: room.roomNumber,
          description: room.description,
          price: room.price,
        }));
        const tableBills = detailedTables.map((table) => ({
          type: 'table',
          tableType: table.tableType,
          tableNumber: table.tableNumber,
          price: table.price,
        }));
        setBills([...roomBills, ...tableBills]);
        setTotalAmount(totalRoomPrice + totalTablePrice);
      } catch (error) {
        alert('Error fetching data:', error.response?.status, error.response?.data)
        console.error('Error fetching data:', error.response?.status, error.response?.data);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Navbar/>
      <div className="blank"></div>
      <div className="bill-container">
        <h1>Hoá Đơn của bạn</h1>
        {bills.length === 0 ? (
          <p>Hiện tại không có hoá đơn nào.</p>
        ) : (
          <div>
            <ul>
              {bills.map((bill, index) => (
                <li key={index}>
                  <div>
                    {bill.type === 'room' && (
                      <>
                        <p>Room Type: {bill.roomType}</p>
                        <p>Room Number: {bill.roomNumber}</p>
                        <p>Description: {bill.description}</p>
                        <p>Price: {bill.price}</p>
                      </>
                    )}
                    {bill.type === 'table' && (
                      <>
                        <p>Table Type: {bill.tableType}</p>
                        <p>Table Number: {bill.tableNumber}</p>
                        <p>Price: {bill.price}</p>
                      </>
                    )}
                    <hr />
                  </div>
                </li>
              ))}
            </ul>
            <p className="total-amount">Total Amount: {totalAmount}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Bill;
