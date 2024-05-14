import React from 'react'

const Tables = () => {
    const tableData = {
        table_type: 1,
        table_number: 13630,
        state: 'true',
        price: 300000
      }
      let states = ''
      if (tableData.state === 'true') {
        states = 'available'
      }
      return (
        <div className='tableContainer'>
          <img src={require(`./img/${tableData.table_type}.jpg`)} alt="" />
          <div className="table_info">
            <h2>Loại phòng: {tableData.table_type}</h2>
            <p>Số phòng: {tableData.table_number}</p>
            <p>Trạng thái: {states}</p>
            <p>Giá phòng: {tableData.price}</p>
          </div>
        </div>
      );
}

export default Tables