import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useDarkMode } from '../Context';

const Home = () => {
  const [data, setData] = useState([]);
  const { darkMode, toggleDarkMode } = useDarkMode();
   

  useEffect(() => {
    const getNovels = async () => {
      try {
        const values = await axios.get('https://novels1.pythonanywhere.com/api/novels/');
        setData(values.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    getNovels();
  }, []);

  const toggleDarkmode = () => {
    toggleDarkMode(!darkMode);
  };

  return (
    <>
      {/* Dark Mode Toggle */}
      <div data-bs-theme={darkMode ? 'dark' : 'light'} className={` h-screen  ${darkMode ? 'bg-dark' : 'bg-light'}   w-screen`}>
        <nav className={`navbar ${darkMode ? 'navbar-dark bg-dark' : 'navbar-light bg-light'}`}>
          <a className="navbar-brand" href="#">
            <img
              src="https://cdn.vectorstock.com/i/750p/23/77/book-icon-logo-vector-2982377.avif"
              width={30}
              height={30}
              className="d-inline-block align-top"
              alt=""
            />
            Novels
          </a>
          <button className=" mr-4  btn btn-outline-primary" onClick={toggleDarkmode}>
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </nav>

        {/* Novels List */}
        <div className="list-group mt-3">
          {data.map((item, index) => (
            <Link
              to={`/novals/${item.id}`}
              key={index}
              className={`list-group-item ${darkMode ? 'list-group-item-dark' : 'list-group-item-light'} mb-2 list-group-item-action`}
            >
              {index + 1}. {item.name}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
