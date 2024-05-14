// ManageDish.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DishDetail from '../../components/Stuff Detail/DishDetail';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import ReactPaginate from 'react-paginate';
import './dish.css'; // Assuming you have a CSS file for styling

const ManageDish = () => {
    const history = useNavigate();
    const [pageNumber, setPageNumber] = useState(0);
    const [objsPerPage] = useState(2);
    const [dishes, setDishes] = useState([]);
    const [newDish, setNewDish] = useState({
        dish_name: '',
        description: '',
        dish_type: '',
        state: ''
    });
    const [editDish, setEditDish] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://nice-handr-server1.onrender.com/api/dish/get_all_dish', {
                    headers: { Authorization: localStorage.getItem('Saved Token') },
                });
                const { success, dishes } = response.data;
                console.log(dishes)
                setDishes(dishes);
            } catch (error) {
                console.error('Error fetching dishes:', error.response?.status, error.response?.data);
            }
        };

        fetchData();
    }, []);

    const indexOfLastItem = (pageNumber + 1) * objsPerPage;
    const indexOfFirstItem = pageNumber * objsPerPage;
    const currentDishes = dishes.slice(indexOfFirstItem, indexOfLastItem);

    const pageCount = Math.ceil(dishes.length / objsPerPage);
    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

    const handleDeleteDish = async (dish_name) => {
        try {
            const res = await axios.delete(`https://nice-handr-server1.onrender.com/api/dish/${dish_name}`, {
                headers: {
                    Authorization: localStorage.getItem('Saved Token'),
                },
            });
            console.log(res.data)
            if(res.data.message === 'Dish deleted successfully') {
                alert('Delete successfully, please reload the page')
            }
            setDishes((prevDishes) => prevDishes.filter((dish) => dish.dish_name !== dish_name));
        } catch (e) {
            console.error('Error deleting dish:', e.response?.status, e.response?.data);
        }
    };

    const handleEditClick = async (dish) => {
        setEditDish({ ...dish });
    };

    const handleAddClick = () => {
        setShowAddForm(true);
    };

    const handleAddDishSubmit = async () => {
        try {
            const response = await axios.post('https://nice-handr-server1.onrender.com/api/dish/add_dish', newDish, {
                headers: {
                    Authorization: localStorage.getItem('Saved Token'),
                },
            });

            const { success, dish } = response.data;

            setDishes((prevDishes) => [...prevDishes, dish]);
            setShowAddForm(false);
        } catch (error) {
            console.error('Error adding dish:', error.response?.status, error.response?.data);
        }
    };

    const handleCancelAddDish = () => {
        setShowAddForm(false);
    };

    return (
        <div className='ManageDish'>
            <Navbar />
            <div className="blank"></div>
            <h2>Manage dishes</h2>
            <ul>
                {currentDishes.map((dish) => (
                    <li key={dish.dish_name}>
                        <DishDetail dish={dish} onEditClick={handleEditClick} onDeleteClick={handleDeleteDish} />
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
            <div className='showForm'>
                {showAddForm && (
                    <div>
                        <h3>Add new dish</h3>
                        <form>
                            <label>
                                Name:
                                <input
                                    type="text"
                                    value={newDish.dish_name}
                                    onChange={(e) => setNewDish({ ...newDish, dish_name: e.target.value })}
                                    required
                                />
                            </label>
                            <br />
                            <label>
                                Description:
                                <input
                                    type="text"
                                    value={newDish.description}
                                    onChange={(e) => setNewDish({ ...newDish, description: e.target.value })}
                                    required
                                />
                            </label>
                            <br />
                            <label>
                                Dish Type:
                                <input
                                    type="text"
                                    value={newDish.dish_type}
                                    onChange={(e) => setNewDish({ ...newDish, dish_type: e.target.value })}
                                    required
                                />
                            </label>
                            <br />
                            <label>State:
                                <input
                                    type="text"
                                    value={newDish.state}
                                    onChange={(e) => setNewDish({ ...newDish, state: e.target.value })}
                                    required
                                />
                            </label>
                            <br />
                            <div className='btn'>
                                <button type="submit" onClick={handleAddDishSubmit}>
                                    Submit
                                </button>
                                <button type="button" onClick={handleCancelAddDish}>
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
            <div className='addForm'>
                <button type='submit' onClick={handleAddClick}>Add new dish</button>
            </div>
        </div>
    );
};

export default ManageDish;
