import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useDarkMode } from '../Context';

const ReadContent = () => {
  const { id, chapter_id } = useParams();
  const [data, setData] = useState(null); // Null for initial state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { darkMode, toggleDarkMode } = useDarkMode(); // Dark mode state
  const [fontSize, setFontSize] = useState(16); // Default font size

  useEffect(() => {
    const getnovels = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://novels1.pythonanywhere.com/api/novels/');
        const novel = response.data.find((novel) => novel.id === parseInt(id));

        if (novel) {
          const chapter = novel.chapters.find(
            (chapter) => chapter.id === parseInt(chapter_id)
          );

          if (chapter) {
            setData(chapter);
          } else {
            setError('Chapter not found.');
          }
        } else {
          setError('Novel not found.');
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load content.');
      } finally {
        setLoading(false);
      }
    };

    getnovels();
  }, [id, chapter_id]);

  const handleIncreaseFontSize = () => {
    setFontSize((prev) => prev + 2); // Increase font size by 2px
  };

  const handleDecreaseFontSize = () => {
    setFontSize((prev) => (prev > 10 ? prev - 2 : prev)); // Decrease font size by 2px, minimum 10px
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-danger">{error}</p>;
  }

  return (
    <div
      data-bs-theme={darkMode ? 'dark' : 'light'}
      className={`h-screen ${darkMode ? 'bg-dark' : 'bg-light'} w-screen`}
    >
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
        <div>
          <button
            className="btn btn-outline-primary mr-2"
            onClick={toggleDarkMode}
          >
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
          <button
            className="btn btn-outline-secondary mr-2"
            onClick={handleDecreaseFontSize}
          >
            A-
          </button>
          <button
            className="btn btn-outline-secondary"
            onClick={handleIncreaseFontSize}
          >
            A+
          </button>
        </div>
      </nav>

      <div className={`m-2 ${darkMode ? 'bg-dark text-light' : 'bg-light text-dark'}`}>
        <div
          className={`ml-1 badge text-bg-${darkMode ? 'secondary' : 'primary'} text-xl`}
          style={{ width: 'auto', height: 'auto' }}
        >
          {data?.title}
        </div>
        <p
          className={`mt-6`}
          style={{
            fontSize: `${fontSize}px`,
            lineHeight: 1.6,
          }}
        >
          {data?.content}
        </p>
      </div>
    </div>
  );
};

export default ReadContent;
