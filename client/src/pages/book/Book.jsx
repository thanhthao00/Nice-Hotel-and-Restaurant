import React from 'react'
import { Link } from "react-router-dom";
import './Book.css'

const Book = () => {
  return (
    <div className="log">
        <p className="text">BOOKING</p>
        <div className="container">
            <Link className="button" to="/book-rooms">ROOM</Link>
            <Link className="button" to="/book-tables">TABLE</Link>
        </div>
    </div>
  )
}

export default Book