import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom'
import Navbar from '../../components/navbar/Navbar';
import './System_Admin.css'

const System_Admin = () => {
    const history = useNavigate()
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    console.log({ headers: { Authorization: localStorage.getItem('Saved Token') } })
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://nice-handr-server1.onrender.com/api/user/info', { headers: { Authorization: localStorage.getItem('Saved Token') } });

                console.log(response.data)
                setUserData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error.response?.status, error.response?.data);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!userData) {
        return <div>Error loading data</div>;
    }
    const {
        success,
        email,
        full_name,
        address,
        birthday,
        user_id,
        role,
        createAt,
    } = userData;
    let bd = new Date(birthday)
    bd = bd.toLocaleDateString();
    let create = new Date(createAt)
    create = create.toLocaleDateString();
    const handleLogout = () => {
        localStorage.removeItem('Saved Token');
        history('/');
    };
    return (
        <div className='admin'>
            <Navbar/>
            <div className='blank'></div>
            <h1 id='adminInfo'>User Information</h1>
            <div className='adminDisplay'>
                <div className='admin-card'>
                    <img src={`https://robohash.org/${user_id}`} alt='photo' />
                    <div className='admin-details'>
                        <h2 id='admin-name'>Name: {full_name}</h2>
                        <p id='admin-position'>ID: {user_id}</p>
                        <p className="email">Email: {email}</p>
                        <p className="birthday">Date of birth: {bd}</p>
                        <p className="address">Address: {address}</p>
                        <p className="role">Role: {role}</p>
                        <p className="create">Start at: {create}</p>
                    </div>
                </div>
                <button className='logout' onClick={handleLogout}>Log out</button>
            </div>
            <div className='adminButton'>
                <button><Link to='/manage_user'>Guest</Link></button>
                <button><Link to='/manage_staff'>Staff</Link></button>
                <button><Link to='/manage_room'>Rooms</Link></button>
                <button><Link to='/manage_table'>Tables</Link></button>
                <button><Link to='/manage_dish'>Dishes</Link></button>
            </div>
        </div>
    )
}

export default System_Admin