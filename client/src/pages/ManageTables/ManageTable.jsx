import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import TableDetail from '../../components/Stuff Detail/TableDetail';
import ReactPaginate from 'react-paginate';
import './table.css'; // Đảm bảo import stylesheet cho table
import Navbar from '../../components/navbar/Navbar';

const ManageTable = () => {
    const history = useNavigate();
    const [pageNumber, setPageNumber] = useState(0);
    const [objsPerPage] = useState(2);
    const [tables, setTables] = useState([]);
    const [newTable, setNewTable] = useState({
        table_type: '',
        table_number: '',
        state: '',
        price: '',
    });
    const [editTable, setEditTable] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://nice-handr-server1.onrender.com/api/table/all_tables', {
                    headers: { Authorization: localStorage.getItem('Saved Token') },
                });
                const { success, tables } = response.data;
                console.log(tables)
                setTables(tables);
            } catch (error) {
                console.error('Error fetching tables:', error.response?.status, error.response?.data);
            }
        };

        fetchData();
    }, []);

    const indexOfLastItem = (pageNumber + 1) * objsPerPage;
    const indexOfFirstItem = pageNumber * objsPerPage;
    const currentTables = tables.slice(indexOfFirstItem, indexOfLastItem);

    const pageCount = Math.ceil(tables.length / objsPerPage);
    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

    const handleDeleteTable = async (tableId) => {
        try {
            const res = await axios.delete(`https://nice-handr-server1.onrender.com/api/table/${tableId}`, {
                headers: {
                    Authorization: localStorage.getItem('Saved Token'),
                },
            });

            console.log(res.data);

            if(res.data.message === 'Room deleted successfully') {
                alert ('Delete successfully, please reload the page')
            }
            setTables(prevTables => prevTables.filter(table => table.table_number !== tableId));
        } catch (e) {
            console.error('Error deleting table:', e);
        }
    };

    const handleEditClick = (table) => {
        setEditTable({ ...table });
    };

    const handleAddClick = () => {
        setShowAddForm(true);
    };

    const handleAddTableSubmit = async () => {
        try {
            const response = await axios.post('https://nice-handr-server1.onrender.com/api/table/add_table', newTable, {
                headers: {
                    Authorization: localStorage.getItem('Saved Token'),
                },
            });
            const { success, table } = response.data;
            setTables(prevTables => [...prevTables, table]);
            setShowAddForm(false);
        } catch (error) {
            console.error('Error adding table:', error.response?.status, error.response?.data);
        }
    };

    const handleCancelAddTable = () => {
        setShowAddForm(false);
    };

    return (
        <div className='ManageTable'>
            <Navbar/>
            <div className='blank'></div>
            <h2>Manage tables</h2>
            <div className='tablesDetail'>
                <ul>
                    {currentTables.map((table) => (
                        <li key={table.table_number}>
                            <TableDetail
                                table={table}
                                onEditClick={handleEditClick}
                                onDeleteClick={handleDeleteTable}
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
                        <h3>Add new table</h3>
                        <form onSubmit={handleAddTableSubmit}>
                            <label>Table Type:
                                <input
                                    type="text"
                                    value={newTable.table_type}
                                    onChange={(e) => setNewTable({ ...newTable, table_type: e.target.value })}
                                    required
                                />
                            </label>
                            <br />
                            <label>Table number:
                                <input
                                    type="text"
                                    value={newTable.table_number}
                                    onChange={(e) => setNewTable({ ...newTable, table_number: e.target.value })}
                                    required
                                />
                            </label>
                            <br />
                            <label>State:
                                <input
                                    type="text"
                                    value={newTable.state}
                                    onChange={(e) => setNewTable({ ...newTable, state: e.target.value })}
                                    required
                                />
                            </label>
                            <br />
                            <label>Price:
                                <input
                                    type="text"
                                    inputMode="numeric"
                                    pattern="[0-9]*"
                                    name="price"
                                    value={newTable.price}
                                    onChange={(e) => setNewTable({ ...newTable, price: e.target.value })}
                                    required
                                />
                            </label>
                            <br />
                            <div className='btn'>
                                <button type="submit">Gửi</button>
                                <button type="button" onClick={handleCancelAddTable}>Huỷ bỏ</button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
            <div className='addForm'>
                <button onClick={handleAddClick}>Thêm bàn mới</button>
            </div>
        </div>
    );
};

export default ManageTable;
