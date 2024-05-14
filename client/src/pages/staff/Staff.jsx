import React from 'react'
import { useState } from 'react'
import User from '../../components/User/User';
import Task from '../../components/task/Task';
import Navbar from '../../components/navbar/Navbar';
import './staff.css'

const Staff = () => {
  return (
    <div className='Staff'>
      <Navbar/>
      <div className='blank'></div>
      <User/>
    </div>
  )
}

export default Staff