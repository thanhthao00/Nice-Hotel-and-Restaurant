import React from 'react'
import GuestBtn from '../GuestAndStaff/GuestBtn'
import StaffBtn from '../GuestAndStaff/StaffBtn'
import './Log.css'

const Log = () => {
    return (
        <div className="log">
            <p className="text">Choose your role</p>
            <div className="container">
                <GuestBtn />
                <StaffBtn />
            </div>
        </div>
    )
}

export default Log;