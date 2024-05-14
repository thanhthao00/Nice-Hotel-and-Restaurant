import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom'
import './aboutAndContact.css'
import Navbar from '../../components/navbar/Navbar'

const AboutAndContact = () => {
  const history = useNavigate()
  const [Contact, setContact] = useState({
    description: '',
    rate: 0
  })
  const [error, setError] = useState({})

  const { description, rate } = Contact
  const onChangeContact = event => setContact(prev => ({ ...prev, [event.target.name]: event.target.value }))
  async function submit(e) {
    e.preventDefault();
    console.log(description, rate)
    const accessToken = localStorage.getItem('Saved Token');
    if(!accessToken) {
      alert('Người dùng chưa đăng nhập')
      return;
    }
    try {
      const res = await axios.post("https://nice-handr-server1.onrender.com/api/feedback", {
        description, rate
      }, { headers: { Authorization: accessToken } });
      console.log(res.data)
      if (res.data.message === 'Create post successfully!') {
        alert('Create post successfully!')
      } else {
        alert(res.data.message);
      }
    } catch (e) {
      alert('Wrong details');
    }
  }

  const handleStars = (rating) => {
    setContact((prev) => ({ ...prev, rate: rating}));
  };
  
  return (
    <div className="about">
      <Navbar />
      <div className="contact-container">
        <section id="contact-info">
          <h1 className='contact_h1'>Our Information</h1>
          <address>
            <h2 className='contact_h2'><strong>Nice Hotel and Restaurant</strong></h2>
            <p className='contact_p'>1 Nguyen Van Cu Street</p>
            <p className='contact_p'>District 1, Ho Chi Minh city</p>
            <p className='contact_p'>Phone: (94) 123-456-789</p>
            <p className='contact_p'>Email: nicehotelandrestaurant@gmail.com</p>
          </address>
        </section>
        <section id="contact-form">
          <h3 className='contact_h3'>Get in Touch</h3>
          <form className='contact_form' onSubmit={submit} method="post">
            <label htmlFor="rating">Rate Your Experience</label>
            <div className="rating">
              {[5, 4, 3, 2, 1].map((rating) => (
                <React.Fragment key={rating}>
                  <input
                    className={`star star-${rating}`}
                    id={`star-${rating}`}
                    type="radio"
                    name="rating"
                    value={rating}
                    checked={Contact.rate === rating}
                    onChange={() => handleStars(rating)}
                  />
                  <label className={`star star-${rating}`} htmlFor={`star-${rating}`}></label>
                </React.Fragment>
              ))}
            </div>

            <label htmlFor="message">Message:</label>
            <textarea
              id="message"
              name="description"
              rows="3"
              value={description}
              onChange={onChangeContact}
              required
              className="textarea-style"
            ></textarea>


            <input type="submit" value="Send" />
          </form>
        </section>
      </div>
    </div>
  )
}

export default AboutAndContact