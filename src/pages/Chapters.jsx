import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const Chapters = () => {
  const { id } = useParams();
  const [data, setData] = useState('');
  const [Chapter, setChapter] = useState([]);

  useEffect(() => {
    const getnovels = async () => {
      try {
        const response = await axios.get('https://novels1.pythonanywhere.com/api/novels/');
        const novel = response.data.find((novel) => novel.id === parseInt(id));
        
        if (novel) {
          setData(novel.name);
          setChapter(novel.chapters);
        } else {
          setData('Novel not found');
        }
      } catch (error) {
        console.error('Error fetching novels:', error);
        setData('Error loading novel');
      }
    };

    getnovels();
  }, [id]);

  return (
    <>
      <nav className="navbar navbar-light bg-light">
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
      </nav>
      <div>
        <h1 className="display-4 m-2">{data}</h1>
        <div className="list-group mt-3">
          {Chapter.length > 0 ? (
            Chapter.map((chapter, index) => (
                <Link to={`/novels/${id}/chapter/${chapter.id}`} key={index} className="list-group-item mb-2 list-group-item-action">
               {index+1}. {chapter.title}
              </Link>
              
            ))
          ) : (
            <p>No chapters available.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Chapters;
