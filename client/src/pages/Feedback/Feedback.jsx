import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Feedback.css';
import ReactPaginate from 'react-paginate';
import Navbar from '../../components/navbar/Navbar';

const Feedback = () => {
  const [pageNumber, setPageNumber] = useState(0);
  const [objsPerPage] = useState(2);
  const [feedbackList, setFeedbackList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://nice-handr-server1.onrender.com/api/feedback/all");
        console.log(response.data);

        const { success, posts } = response.data;

        if (success && posts && posts.length > 0) {
          setFeedbackList(posts);
        }
      } catch (error) {
        console.error("Error fetching data from the server", error);
      }
    };

    fetchData();
  }, []);

  const indexOfLastItem = (pageNumber + 1) * objsPerPage;
  const indexOfFirstItem = pageNumber * objsPerPage;
  const feedback = feedbackList.slice(indexOfFirstItem, indexOfLastItem);


  const pageCount = Math.ceil(feedbackList.length / objsPerPage);
  const changePage = ({ selected }) => {
      setPageNumber(selected);
  };

  const renderStars = (rate) => {
    const fullStars = '★'.repeat(rate);
    const emptyStars = '☆'.repeat(5 - rate);
    return fullStars + emptyStars;
  };

  return (
    <div>
      <Navbar/>
      <section id="feedback-list">
        <h2 className='feedback_h2'>What Our Customers Say</h2>
        {feedback.map((feedback, index) => {
          const { full_name, address, birthday, user_id, phone_number, role } = feedback.user || {};
          return (
            <div key={index} className="feedback-item">
              <img className="user-img" src={`https://robohash.org/${user_id}`} alt='photo'/>
              <div className="user-name">{full_name}</div>
              <div className="user-star">{renderStars(feedback.rate)}</div>
              <div className="user-cmt">"{feedback.description}"</div>
            </div>
          );
        })}
      </section>
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

export default Feedback;
