import React, { useState, useEffect } from 'react';
import Navbar from '../../../components/navbar/Navbar'
import TableForm from '../../../components/TableForm/TableForm';
import TableList from '../../../components/tableList/TableList';

import './BookTable.css'

const BookTable = () => {
  const [selectedTables, setSelectedTables] = useState([]);

  const handleSelectTables = (selectedItems) => {
    setSelectedTables(selectedItems);
  };
  return (
    <div className='tableBookingContainer'>
      <Navbar/>
      <div className='blank'></div>
      <h1 id='bookingTableHeader'>Đặt bàn ăn tại khách sạn</h1>
      <div className='bookTableDisplay'>
        <div className='tl'>
          <TableList onSelectTables={handleSelectTables} /></div>
        <div className='tf'><TableForm selectedTables={selectedTables} /></div>
      </div>
    </div>
  );
};

export default BookTable;
