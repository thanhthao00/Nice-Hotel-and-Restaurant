import React, { useState } from 'react';
import axios from 'axios';
import './task.css'

const Task = ({ user_id }) => {
  const [tasks, setTasks] = useState([
    { id: 1, name: 'Task 1', completed: false },
    { id: 2, name: 'Task 2', completed: false },
    { id: 3, name: 'Task 3', completed: false },
    // Thêm các công việc khác nếu cần
  ]);

  const handleCheckboxChange = (id) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });

    setTasks(updatedTasks);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      // Gửi danh sách công việc đã chọn lên server
      const selectedTasks = tasks.filter(task => task.completed);
      const response = await axios.post('url_of_your_server_endpoint', {
        user_id: user_id,
        tasks: selectedTasks,
      });

      // Xử lý dữ liệu từ server nếu cần
      console.log('Server response:', response.data);
    } catch (error) {
      // Bắt lỗi nếu có
      console.error('Error sending data to server:', error);
    }
  };

  return (
    <div className='task'>
      <form onSubmit={handleFormSubmit} className='task-form'>
        {tasks.map(task => (
          <div key={task.id} className='task-item'>
            <div className='item'>
              <label>{task.name}</label>
              <input
                type='checkbox'
                checked={task.completed}
                onChange={() => handleCheckboxChange(task.id)}
              />
            </div>
          </div>
        ))}
        <button type="submit" id='taskBtn'>Submit</button>
      </form>
    </div>
  );
};

export default Task;
