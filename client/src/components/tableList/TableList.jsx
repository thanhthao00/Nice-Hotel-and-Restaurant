import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import './tableList.css';

const TableList = ({ onSelectTables }) => {
    const [tables, setTables] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const tablesPerPage = 2;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://nice-handr-server1.onrender.com/api/table/available_tables', {
                    headers: { Authorization: localStorage.getItem('Saved Token') },
                });

                console.log('API Response:', response.data);
                const { success, tables } = response.data;
                const tablesWithIsChosen = tables.map((table) => ({
                    ...table,
                    isChosen: false,
                }));
                setTables(tablesWithIsChosen);
            } catch (error) {
                console.error('Lỗi khi lấy danh sách bàn:', error);
            }
        };

        fetchData();
    }, []);

    const handleCheckboxChange = (tableNumber) => {
        const updatedTables = tables.map((table) => ({
            ...table,
            isChosen: table.table_number === tableNumber ? !table.isChosen : false,
        }));

        setTables(updatedTables);

        const selectedTable = updatedTables.find((table) => table.isChosen);

        onSelectTables(selectedTable);
    };

    const pageCount = Math.ceil(tables.length / tablesPerPage);
    const currentPageTables = tables.slice(pageNumber * tablesPerPage, (pageNumber + 1) * tablesPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

    return (
        <div className="bookTable">
            <div className="tableList">
                {currentPageTables.map((table) => (
                    <div key={table.table_number} className='tableDisplay'>
                        <img src={require('./img/suite.jpg')} alt="user_image" />
                        <div className="table_info">
                            <h2>Loại bàn: {table.table_type}</h2>
                            <p>Số bàn: {table.table_number}</p>
                            <p>Trạng thái: {table.states}</p>
                            <p>Giá bàn: {table.price}</p>
                            <input
                                type="checkbox"
                                checked={table.isChosen}
                                onChange={() => handleCheckboxChange(table.table_number)}
                            />
                        </div>
                    </div>
                ))}
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

export default TableList;
